import IframeItem from '~/components/IframeItem';
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
      {list.map(({ url, memo }, i) => (
        <IframeItem url={url} memo={memo} key={i} />
      ))}
    </section>
  );
}

export default IframeList;
