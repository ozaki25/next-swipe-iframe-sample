import IframeItem from '~/components/IframeItem';
import style from './style.module.css';
import useSwiper from '~/hooks/useSwiper';

type Props = {
  list: {
    url: string;
    memo: string;
  }[];
  defaultIndex?: number;
};

function IframeList({ list, defaultIndex }: Props) {
  const { toPrev, toNext, containerRef, isFirst, isLast, selectedIndex } =
    useSwiper({
      index: defaultIndex,
      listSize: list.length,
    });
  return (
    <section
      className={style.IframeList}
      aria-roledescription="carousel"
      aria-label="マーカッポ動画一覧"
    >
      <p>
        {list.length}枚中の{selectedIndex + 1}枚目
      </p>
      <div className={style.IframeList__main}>
        {!isFirst && <PrevButton onClick={toPrev} />}
        {!isLast && <NextButton onClick={toNext} />}
        <div
          ref={containerRef}
          className={style.IframeList__container}
          aria-live="polite" // 動画が切り替わった時に支援技術に伝える
        >
          {list.map(({ url, memo }, index) => (
            <IframeItem
              key={index}
              url={url}
              memo={memo}
              current={index + 1}
              total={list.length}
              hidden={selectedIndex !== index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

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

export default IframeList;
