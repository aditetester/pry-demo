import React, { useState, useRef, useEffect } from "react";

import "./App.css";
import { OPERATORS, SUGGESTIONS } from "./constants";
import { Operand } from "./types";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions] = useState(SUGGESTIONS);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Operand[]>([]);
  const [tags, setTags] = useState<Operand[]>([]);
  const [amount, setAmount] = useState<number | string>(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionStart = cursorPosition;
      inputRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(e.target.value);
    if (value === "") {
      setFilteredSuggestions([]);
    } else {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered.length > 0 ? filtered : []);
    }

    if (OPERATORS.includes(value)) {
      const newTagOperand = {
        title: value.trim(),
        subTitle: null,
        type: "operator",
        value: 0,
        rightHandle: null,
        rightInputWidth: 10
      };

      setTags([...tags, newTagOperand]);

      setInputValue("");
    }
  };

  const handleRightInputChange = (index: number, newValue: string) => {
    const updatedTags = [...tags];
    const newWidth = Math.max(5, newValue.length * 10);
    updatedTags[index].rightHandle = newValue;
    updatedTags[index].rightInputWidth = newWidth;
    setTags(updatedTags);
  };

  const handleSuggestionSelect = (suggestion: Operand) => {
    setTags([...tags, suggestion]);
    setInputValue("");
    setFilteredSuggestions([]);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let expression = "";
      let consecutiveNumeric = false;

      if (tags.length === 0 && inputValue.trim() === "") {
        setAmount(0);
        return;
      }

      for (const tag of tags) {
        if (tag.type === "operator" || OPERATORS.includes(tag.title)) {
          expression += tag.title;
          consecutiveNumeric = false;
        } else {
          expression += tag.value;
          if (consecutiveNumeric) {
            setAmount("#ERROR");
            return;
          }
          consecutiveNumeric = true;
        }
      }

      try {
        const math = require("mathjs");
        const total = math.evaluate(expression + inputValue);

        if (!isNaN(total)) {
          setAmount(total);
        }
      } catch (error) {
        console.error(error);
        setAmount("#ERROR");
      }
    }
  };

  const handleBackspace = () => {
    if (cursorPosition === 0 && tags.length > 0) {
      const updatedTags = [...tags];
      updatedTags.pop();
      setTags(updatedTags);
    } else if (cursorPosition > 0) {
      const tagIndex = tags.findIndex((tag, index) => {
        if (tag.type === "currency") {
          return (
            cursorPosition >= index * 0 && cursorPosition < (index + 1) * 2
          );
        }
        return cursorPosition === index;
      });
    }
  };

  const getCursorPosition = (e: React.MouseEvent<HTMLInputElement>) => {
    const inputRefCurrent = inputRef.current;
    if (inputRefCurrent) {
      const rect = inputRefCurrent.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const inputWidth = inputRefCurrent.clientWidth;
      const inputText = inputRefCurrent.value;
      return Math.floor((clickX / inputWidth) * inputText.length);
    }
    return 0;
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const cursorPosition = getCursorPosition(e);
    if (inputRef.current) {
      inputRef.current.selectionStart = cursorPosition;
      inputRef.current.selectionEnd = cursorPosition;
      setCursorPosition(cursorPosition);
    }
  };

  return (
    <>
    <div className="main">
      <h2>{amount}</h2>

      <div className="inputDiv">
        <div className="tags">
          {tags.map((tag, index) =>
            tag.type === "operator" ? (
              <span key={index}>{tag.title}</span>
            ) : tag.type === "currency" ? (
              <div
                key={index}
                className="currencyTag"
              >
                {tag.title}
                <h5>|</h5>
                [
                <input
                  value={tag.rightHandle as string}
                  className="rightInput"
                  style={{ width: tag.rightInputWidth + "px" }}
                  onChange={(e) =>
                    handleRightInputChange(index, e.target.value)
                  }
                />
                ]
              </div>
            ) : (
              <div key={index} className="tag">
                {tag.title}
              </div>
            )
          )}
          <input
            type="text"
            value={inputValue}
            ref={inputRef}
            onChange={handleInputChange}
            onClick={handleMouseClick} 
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputKeyPress(e);
              } else if (e.key === "Backspace") {
                handleBackspace();
              }
            }}
            className="input"
            autoFocus={true}
            onKeyUp={() => {
              if (inputRef.current) {
                setCursorPosition(inputRef.current.selectionStart ?? 0);
              }
            }}
          ></input>
        </div>
      </div>
    </div>
      <div className="suggestionList">
        {filteredSuggestions.map((suggestion, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleSuggestionSelect(suggestion);
              }}
              className="suggestion"
            >
              <div className="leftDiv">
                <label>{suggestion.title}</label>
                <p>{suggestion.subTitle}</p>
              </div>
              <label className="rightLabel">{suggestion.type}</label>
            </div>
          );
        })}
      </div>
      </>
  );
};

export default App;
