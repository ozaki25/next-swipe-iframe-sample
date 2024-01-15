import style from './style.module.css';

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
  return (
    <section className={style.IframeList}>
      {list.map(({ url, memo }) => (
        <article className={style.IframeList__article}>
          <iframe
            width="100%"
            height="315"
            src={url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <p className={style.IframeList__memo}>{memo}</p>
        </article>
      ))}
    </section>
  );
}

export default IframeList;
