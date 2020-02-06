import css from "../style.scss"
import React, { useState, useCallback } from 'react';

class ChildComponent extends React.PureComponent {
  render() {
    const {
      clickEvent, emitMessage, label
    } = this.props;
    console.log(emitMessage);
    return <div onClick={clickEvent}>{label}</div>
  }
}

const wrapper = {
  display: "flex",
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

  return <div>
    <div className={css.example}>
      <ChildComponent
        clickEvent={
          // インラインハンドラ
          // 毎回関数が生成されるため再レンダリングが発生する
          () => {
            console.log("clicked componentA!")
          }
        }
        emitMessage={"componentA rendered"}
        label={"componentA"}
      />
      <ChildComponent
        clickEvent={callback}
        emitMessage={"componentB rendered"}
        label={"componentB"}
      />
    </div>

      <button onClick={() => {
        setCount(count + 1)
      }}>increment</button>
      {count}
  </div>
}

export default HomePage


// function areEqual(prevProps, nextProps) {
//   return false;
// }
// const MemoComponent = React.memo(ComponentA, areEqual);
