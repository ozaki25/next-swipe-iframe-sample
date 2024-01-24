import style from './style.module.css';

type Props = {
  url: string;
  memo: string;
  current: number;
  total: number;
  hidden: boolean; // 表示されてないitemは支援技術に伝えたくないしタブ移動させたくないのでその判別に使う
};

function IframeItem({ url, memo, current, total, hidden }: Props) {
  return (
    <article
      className={style.IframeItem}
      role="group"
      aria-roledescription="slide"
      aria-label={`${total}枚中の${current}枚目`}
      aria-hidden={hidden}
    >
      <iframe
        tabIndex={hidden ? -1 : 0}
        width="100%"
        height="315"
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <p className={style.IframeItem__memo}>{memo}</p>
    </article>
  );
}

export default IframeItem;
