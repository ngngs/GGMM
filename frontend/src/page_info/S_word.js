import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import useStore from "../for_game/store";

function S_words() {
  let [show, setShow] = useState([
    "제시어1",
    "제시어2",
    "제시어3",
    "제시어4",
    "제시어5",
    "제시어6",
    "제시어7",
    "제시어8",
    "제시어9",
    "제시어10",
  ]);

  const { cnt_answer, cnt_plus, cur_session } = useStore();
  //ZUSTAND

  let [show_name, setShow_name] = useState("게임을 시작하겠습니다.");
  const [answer, setAnswer] = useState("");
  let [correct, setCorrect] = useState(["정답입니다.", "틀렸습니다."]);
  let [number, setNumber] = useState(cnt_answer);

  const [inputVisible, setInputVisible] = useState(false);
  const [showIndex, setShowIndex] = useState(0);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setShow_name(show[0]);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setInputVisible(true);
    }, 2000);
  }, []);
  useEffect(() => {
    console.log("cnt_answer useeffect" + cnt_answer);
    setNumber(cnt_answer);

    console.log(number);
  }, [cnt_answer]);
  useEffect(() => {
    if (number !== 0) {
      sendScore();
      if (showIndex < show.length - 1) {
        nextShow();
      }
    }
  }, [number]);

  const nextShow = () => {
    setShowIndex(showIndex + 1);
    setShow_name(show[showIndex + 1]);
  };

  const sendScore = () => {
    const message = {
      score: number,
    };
    cur_session.signal({
      type: "score",
      data: JSON.stringify(message),
    });
  };

  const check_Score = () => {
    if (show_name === answer) {
      cnt_plus(cnt_answer + 1);
      setCorrect(0);
    } else {
      setCorrect(1);
    }
  };

  return (
    <>
      <div>{show_name}</div>
      {inputVisible && (
        <>
          <input
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          />
          <Button
            type="submit"
            onClick={() => {
              check_Score();
            }}
          >
            제출
          </Button>
        </>
      )}
      {correct == 0 ? (
        <div> 정답입니다. </div>
      ) : correct == 1 ? (
        <div> 틀렸습니다. </div>
      ) : null}
      <div>맞춘 정답 수 : {cnt_answer}</div>
    </>
  );
}

export default S_words;