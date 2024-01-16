import {
  AnimationPlaybackControls,
  animate,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import IframeItem from '~/components/IframeItem';
import style from './style.module.css';
import { useEffect, useRef, useState } from 'react';

type PrevButtonProps = {
  onClick: () => void;
};

function PrevButton({ onClick }: PrevButtonProps) {
  return (
    <button
      type="button"
      aria-label="前へ"
      onClick={onClick}
      className={style.PrevButton}
    >
      ＜
    </button>
  );
}

type NextButtonProps = {
  onClick: () => void;
};

function NextButton({ onClick }: NextButtonProps) {
  return (
    <button
      type="button"
      aria-label="次へ"
      onClick={onClick}
      className={style.NextButton}
    >
      ＞
    </button>
  );
}

type Props = {
  list: {
    url: string;
    memo: string;
  }[];
  defaultIndex?: number;
};

function IframeList({ list, defaultIndex }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex ?? 0);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  const { scrollXProgress } = useScroll({ container: containerRef });

  const getCurrentIndex = (x: number): number => {
    // xは横スクロール全体の幅を1とした時の現在の位置(0〜1.0)
    // scroll-snapでスナップされる位置と同じように、1枚目の半分を超えたら1、2枚目の半分を超えたら2、といった値を返す
    return Math.round(x / (1 / (list.length - 1)));
  };

  const scroll = (nextIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    animationRef.current?.stop();
    animationRef.current = animate(
      container.scrollLeft,
      container.scrollWidth * (nextIndex / list.length),
      {
        duration: 0.3,
        onUpdate: (v) => {
          console.log('onUpdate', v);
          container.scrollLeft = v;
        },
        onPlay: () => {
          console.log('onPlay');
          // アニメーション中はスナップを無効ししないとカクついてしまう
          container.style.scrollSnapType = 'none';
        },
        onComplete: () => {
          console.log('onComplete');
          container.style.scrollSnapType = '';
          animationRef.current = null;
        },
      },
    );
  };

  const onClickPrev = () => {
    setSelectedIndex(selectedIndex - 1);
    scroll(selectedIndex - 1);
  };

  const onClickNext = () => {
    setSelectedIndex(selectedIndex + 1);
    scroll(selectedIndex + 1);
  };

  useMotionValueEvent(scrollXProgress, 'change', (x) => {
    if (animationRef.current) return;
    // スクロールで切り替えた時にindexの同期をとる
    setSelectedIndex(getCurrentIndex(x));
  });

  useEffect(() => {
    if (containerRef.current && defaultIndex) {
      containerRef.current.scrollLeft =
        containerRef.current.scrollWidth * (defaultIndex / list.length);
    }
  }, [defaultIndex]);

  return (
    <section className={style.IframeList}>
      <p>index: {selectedIndex}</p>
      <div>
        {selectedIndex > 0 && <PrevButton onClick={onClickPrev} />}
        {selectedIndex < list.length - 1 && (
          <NextButton onClick={onClickNext} />
        )}
        <div ref={containerRef} className={style.IframeList__container}>
          {list.map(({ url, memo }, index) => (
            <IframeItem key={index} url={url} memo={memo} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default IframeList;
