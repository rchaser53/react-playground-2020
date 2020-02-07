import css from "../style.scss"
import React, { useState, useCallback } from 'react';

class ChildComponent extends React.PureComponent {
  render() {
    const {
      clickEvent, emitMessage, label
    } = this.props;
    console.log(emitMessage);
    return <div
      className={css.child}
      onClick={clickEvent}>
        {label}
    </div>
  }
}

// 一度しか関数は生成されないがpropsやstateが使えない
const callback = () => {
  console.log("clicked!")
}

function HomePage() {
  const [count, setCount] = useState(0);

  // 同じ関数が渡されるため再レンダリングが発生しない
  const callback = useCallback(() => {
    console.log("clicked componentB!")
  }, []);

  return <div className={css.outline}>
      <div className={css.parentArea}>
        <button onClick={() => {
          setCount(count + 1)
        }}>increment</button>
        parent component count: {count}
      </div>
      <div className={css.childrenArea}>
        <ChildComponent
          clickEvent={
            // インラインハンドラ
            // 毎回関数が生成されるため再レンダリングが発生する
            () => {
              console.log("clicked componentA!")
            }
          }
          emitMessage={"componentA rendered"}
          label={"child componentA"}
        />
        <ChildComponent
          clickEvent={callback}
          emitMessage={"componentB rendered"}
          label={"child componentB"}
        />
      </div>
  </div>
}

export default HomePage
