import style from './style.module.css';

type Props = {
  url: string;
  memo: string;
};

function IframeItem({ url, memo }: Props) {
  return (
    <article className={style.IframeItem}>
      <iframe
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
