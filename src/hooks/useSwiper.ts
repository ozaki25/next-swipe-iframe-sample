import {
  AnimationPlaybackControls,
  animate,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  listSize: number;
  index?: number;
};

function useSwiper({ listSize, index }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>(index ?? 0);

  /**
   * scroll-snap-typeを付与する要素にセットする
   * その要素の子要素にはsnap対象のリストを配置する
   */
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  const { scrollXProgress } = useScroll({ container: containerRef });

  const isFirst = selectedIndex === 0;
  const isLast = selectedIndex === listSize - 1;

  /**
   * 現在のスクロール位置がどのindexに該当するかか返す
   * xは横スクロール全体の幅を1とした時の現在の位置(0〜1.0)
   * scroll-snapでスナップされる位置と同じように、1枚目の半分を超えたら1、2枚目の半分を超えたら2、といった値を返す
   */
  const getCurrentIndex = (x: number): number => {
    return Math.round(x / (1 / (listSize - 1)));
  };

  /**
   * 引数で渡したindexの位置までアニメーションつきでスクロールさせる
   */
  const scrollTo = useCallback(
    (nextIndex: number) => {
      const container = containerRef.current;
      if (!container) return;
      animationRef.current?.stop();
      animationRef.current = animate(
        container.scrollLeft,
        container.scrollWidth * (nextIndex / listSize),
        {
          duration: 0.3,
          onUpdate: (v) => {
            container.scrollLeft = v;
          },
          onPlay: () => {
            // アニメーション中はスナップを無効ししないとカクついてしまう
            container.style.scrollSnapType = 'none';
          },
          onComplete: () => {
            container.style.scrollSnapType = '';
            animationRef.current = null;
          },
        },
      );
    },
    [listSize],
  );

  /**
   * 前のindexにスクロールさせる
   */
  const toPrev = useCallback(() => {
    console.log('toPrev');
    if (isFirst) return;
    console.log({ selectedIndex });
    setSelectedIndex(selectedIndex - 1);
    scrollTo(selectedIndex - 1);
  }, [selectedIndex, isFirst, scrollTo]);

  /**
   * 次のindexにスクロールさせる
   */
  const toNext = useCallback(() => {
    console.log('toNext');
    if (isLast) return;
    console.log({ selectedIndex });
    setSelectedIndex(selectedIndex + 1);
    scrollTo(selectedIndex + 1);
  }, [selectedIndex, isLast, scrollTo]);

  /**
   * containerRefの要素のスクロール位置が変わる度に呼ばれてindeをさ最新化する
   */
  useMotionValueEvent(scrollXProgress, 'change', (x) => {
    if (animationRef.current) return;
    // スクロールで切り替えた時にindexの同期をとる
    setSelectedIndex(getCurrentIndex(x));
  });

  /**
   * 初期表示のindexが指定されていたらそこまでスクロール位置をずらす
   */
  useEffect(() => {
    const container = containerRef.current;
    if (container && index) {
      container.scrollLeft = container.scrollWidth * (index / listSize);
    }
  }, [index, listSize]);

  /**
   * このhooksを呼んでいるコンポーネンを表示してる間はキーボードの左右キーでスライドを切り替えられるようにする
   */
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        toPrev();
      } else if (e.key === 'ArrowRight') {
        toNext();
      }
    };
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [toPrev, toNext]);

  return {
    toPrev,
    toNext,
    containerRef,
    isFirst,
    isLast,
    selectedIndex,
  };
}

export default useSwiper;
