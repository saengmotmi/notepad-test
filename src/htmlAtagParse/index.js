import React, { useState, useRef } from "react";

const useGetKey = () => {
  const keyIdx = useRef(0);

  return () => {
    keyIdx.current += 1;
    return keyIdx.current;
  };
};

export default function LinkParse() {
  const [focus, setFocus] = useState(false);
  const getKey = useGetKey();

  const renderTag = line => {
    let result = line.value;

    if (line.isBlank || (!line.isURL && line.value)) result += " ";
    if (line.isURL)
      result = (
        <>
          <a
            href={line.value}
            key={getKey()}
            onClick={e => (window.location.href = e.target.href)}
            rel="noopener noreferrer"
            target="_blank"
          >
            {result}
          </a>
          &nbsp;
        </>
      );
    if (line.isNewLine) result = <p key={getKey()}>{result}</p>;
    if (line.isNewLine && !line.value)
      result = <div key={getKey()}>&nbsp;</div>;

    return result;
  };

  const renderText = txt => {
    const blankOrNewLineArr = [...txt.matchAll(/[\s\n]/g)].map(e => {
      if (e[0] === " ") return "blank";
      if (e[0] === "\n") return "newLine";
    });
    const lineStatusArr = txt.split(/[\s\n]/g).map((part, idx) => {
      return {
        isURL: !!URL_REGEX.test(part),
        isBlank: blankOrNewLineArr[idx - 1] === "blank",
        isNewLine: blankOrNewLineArr[idx - 1] === "newLine",
        value: part,
      };
    });

    return lineStatusArr;
  };

  return (
    <>
      <div
        onClick={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        contentEditable={focus}
        suppressContentEditableWarning
      >
        {renderText(test).map(renderTag)}
      </div>
    </>
  );
}

const test = `asdfjaskdjf;alskdjf; https://www.naver.com https://www.naver.com

https://www.naver.com
https://www.naver.com
https://www.asdfasdfasdf.com

https://www.naver.com

ㅁ아너로미ㅏㄴ얼;미ㅏㄴ어`;
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
