import React from "react";
import "./index.css";

type CodeInputType = {
  fields: number;
  value: string;
  onChange: (value: string) => void;
  onSubmitEndCode?: (value: string) => void;
  classNameInput?: string;
  classNameInputsWrapper?: string;
  condition?: "numbers" | "letters" | "alphanumeric" | "any" | RegExp;
  typeLetterCase?: "upperCase" | "lowerCase" | "any";
  placeholder?: string;
  InputsProps?: React.InputHTMLAttributes<HTMLInputElement>;
  WrapperProps?: React.HTMLAttributes<HTMLDivElement>;
};

export function CodeInput({
  fields,
  value,
  onChange,
  onSubmitEndCode,
  classNameInput = "",
  classNameInputsWrapper = "",
  condition = "any",
  typeLetterCase = "any",
  placeholder = "",
  InputsProps = {},
  WrapperProps = {},
}: CodeInputType) {
  React.useEffect(() => {
    onChange(value.substring(0, fields));
  }, [fields]);

  if (fields < 1) {
    return null;
  }
  const inputs = value
    .split("")
    .concat(Array(fields - value.substring(0, fields).length).fill(" "));

  let regex: RegExp;

  switch (condition) {
    case "numbers":
      regex = /^\d+$/;
      break;
    case "letters":
      regex = /^[a-zA-Z]+$/;
      break;
    case "alphanumeric":
      regex = /^[a-zA-Z0-9]+$/;
      break;
    default:
      if (condition instanceof RegExp) {
        regex = condition;
      } else {
        regex = /^.*$/;
      }
  }

  const changeCase = (value: string) => {
    switch (typeLetterCase) {
      case "lowerCase":
        return value.toLowerCase();
      case "upperCase":
        return value.toUpperCase();
      default:
        return value;
    }
  };

  const handleChangeValue = (value: string, index: number) => {
    const updatedValue = [...inputs];
    updatedValue[index] = value;
    onChange(updatedValue.join(""));

    return updatedValue;
  };

  //get input from DOM
  const getInputById = (index: number) => {
    return document.getElementById(
      `code-input-${index}`
    ) as HTMLInputElement | null;
  };

  //logic of end code
  const handleOnSubmitEndCode = (
    value: string,
    input?: HTMLInputElement | null
  ) => {
    const lastInput = input ?? getInputById(fields - 1);
    lastInput?.blur();
    onSubmitEndCode && onSubmitEndCode(value);
  };

  //logic of changes
  const handleChange = (newCharacterValue: string, index: number) => {
    if (!regex.test(newCharacterValue) && newCharacterValue !== "") return;

    const updatedValue = handleChangeValue(
      changeCase(newCharacterValue) || " ",
      index
    );

    if (!newCharacterValue) return;

    if (index < fields - 1) {
      const nextInput = getInputById(index + 1);
      nextInput?.focus();
    } else if (index === fields - 1 && updatedValue.every((e) => e.trim())) {
      handleOnSubmitEndCode(updatedValue.join(""));
    }
  };

  //logic of keys
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key.length === 1) {
      handleChange(e.key, index);
    } else
      switch (e.key) {
        case "Backspace":
          if (inputs[index] && inputs[index] !== " ") {
            handleChangeValue(" ", index);
          } else {
            const prevInput = getInputById(index - 1);
            prevInput?.focus();
          }
          e.preventDefault();
          break;
        case "ArrowRight":
          const nextInput = getInputById(index + 1);
          nextInput?.select();
          e.preventDefault();
          break;
        case "ArrowLeft":
          const prevInput = getInputById(index - 1);
          prevInput?.select();
          e.preventDefault();
          break;
        default:
          break;
      }
  };

  //logic of paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text/plain");
    if (!regex.test(paste)) return;

    const currentPaste = changeCase(paste)
      .replace(/\s/g, "")
      .substring(0, fields);

    onChange(currentPaste);

    const lastPasteInput = getInputById(
      Math.min(currentPaste.length, fields - 1)
    );

    lastPasteInput?.focus();

    if (currentPaste.length === fields) {
      handleOnSubmitEndCode(currentPaste, lastPasteInput);
    }

    e.preventDefault();
  };

  return (
    <div
      className={`beautify-code-input-wrapper ${classNameInputsWrapper}`}
      onPaste={handlePaste}
      id={"code-input-wrapper"}
      {...WrapperProps}
    >
      {inputs.map((character, index) => (
        <input
          key={index}
          maxLength={1}
          placeholder={placeholder[index] ?? ""}
          value={character === " " ? "" : character}
          id={`code-input-${index}`}
          onKeyDown={(e) => {
            handleKeyDown(e, index);
          }}
          className={`beautify-input-cell ${classNameInput}`}
          {...InputsProps}
        />
      ))}
    </div>
  );
}
