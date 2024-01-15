import {
  AnimationPlaybackControls,
  animate,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import IframeItem from '~/components/IframeItem';
import style from './style.module.css';
import { useEffect, useRef, useState } from 'react';

const list = [
  {
    url: 'https://www.youtube.com/embed/1Mi-_Plz5as?si=qUI-ZiHkK9PE0IEG',
    memo: 'アクセシビリティカンファレンス福岡の会場で放映されてたマーカッポの動画\n会場で大ウケだった\nマークアップに携わる人なら誰でも楽しめる内容',
  },
  {
    url: 'https://www.youtube.com/embed/qq9R7-1FptQ?si=Y3GBJHltOghp44fp',
    memo: 'マーカッポの1回目の動画\n面白い',
  },
  {
    url: 'https://www.youtube.com/embed/2H49N5e7hPw?si=JIFi6VrwUkMIqZFi',
    memo: 'マーカッポ#2の振り返り動画\nマーカッポが勉強になるとつぶやいたのを拾ってもらえて、まじめに受け取るなと言われてしまいました',
  },
];

function IframeList() {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [itemElements, setItemElements] = useState<HTMLElement[]>([]);
  const containerRef = useRef<HTMLSelectElement>(null);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  const getIndex = (x: number): number => {
    // xは横スクロール全体の幅を1とした時の現在の位置(0〜1)
    // 1枚目の半分を超えたら1、2枚目の半分を超えたら2、といった値を返す
    return Math.round(x / (1 / (list.length - 1)));
  };

  const { scrollXProgress } = useScroll({ container: containerRef });

  // const x = useTransform(scrollXProgress, (x) => {
  //   if (!itemElements.length) return 0;
  //   const index = getIndex(x);
  //   return itemElements[index].offsetLeft;
  // });
  // const width = useTransform(scrollXProgress, (x) => {
  //   if (!itemElements.length) return 0;
  //   const index = getIndex(x);
  //   return itemElements[index].offsetWidth;
  // });

  useMotionValueEvent(scrollXProgress, 'change', (x) => {
    if (animationRef.current) return;
    setSelectedId(getIndex(x));
  });

  useEffect(() => {
    if (itemElements.length === 0) {
      const items =
        containerRef.current?.querySelectorAll<HTMLElement>('article') || [];
      setItemElements(Array.from(items));
    }
  }, [itemElements]);

  useEffect(() => {
    const container = containerRef.current;
    const animation = animationRef.current;

    if (!container || animation) {
      return;
    }

    animationRef.current?.stop();
    animationRef.current = animate(
      container.scrollLeft,
      container.scrollWidth * (selectedId / list.length),
      {
        type: 'spring',
        bounce: 0.2,
        duration: 0.6,
        onUpdate: (v) => {
          console.log('onUpdate', v);
          container.scrollLeft = v;
        },
        onPlay: () => {
          console.log('onPlay');
          container.style.scrollSnapType = 'none';
        },
        onComplete: () => {
          console.log('onComplete');
          container.style.scrollSnapType = '';
          animationRef.current = null;
        },
      },
    );
  }, [selectedId]);

  return (
    <section ref={containerRef} className={style.IframeList}>
      <motion.div
        className={style.IframeList__container}
        // style={{ x, width }}
      >
        {list.map(({ url, memo }, index) => (
          <IframeItem key={index} url={url} memo={memo} />
        ))}
      </motion.div>
    </section>
  );
}

export default IframeList;
