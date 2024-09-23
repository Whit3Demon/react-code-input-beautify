# CodeInput Component

`CodeInput` is a flexible React component that provides a customizable input for entering multi-character codes (e.g., OTP, verification codes). You can control the number of input fields, allowed characters, and easily manage input through callbacks for change and submission.

## Installation

To install the package, use npm or yarn:

```bash
npm install react-code-input-beautify
# or
yarn add react-code-input-beautify
```

## Usage
```tsx
import React, { useState } from "react";
import { CodeInput } from "react-code-input-beautify";
import "./index.css";

const App = () => {
  const [code, setCode] = useState("");

  const handleChange = (value) => {
    setCode(value);
  };

  const handleSubmitEndCode = (value) => {
    console.log("Submitted Code:", value);
  };

  return (
    <CodeInput
      fields={6}
      value={code}
      onChange={handleChange}
      onSubmitEndCode={handleSubmitEndCode}
      condition="alphanumeric"
      classNameInput="example-classname-for-inputs"
      classNameInputsWrapper="example-classname-for-inputs-wrapper"
      typeLetterCase="upperCase"
      placeholder="______"
    />
  );
};

export default App;
```

## Props

| Prop                    | Type                                                       | Default       | Description                                                                                                           |
|-------------------------|------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------|
| `fields`                | `number`                                                   | Required      | Number of input fields (length of the code).                                                                          |
| `value`                 | `string`                                                   | Required      | The current value of the input.                                                                                       |
| `onChange`              | `(value: string) => void`                                  | Required      | Callback for when the input value changes.                                                                            |
| `onSubmitEndCode`       | `(value: string) => void`                                  | Optional      | Callback triggered when the last character is entered, provided that all fields are also entered                           |
| `classNameInput`        | `string`                                                   | `""`          | Custom class name for each input field.                                                                               |
| `classNameInputsWrapper`| `string`                                                   | `""`          | Custom class name for the input wrapper div.                                                                          |
| `condition`             | `"numbers"`, `"letters"`, `"alphanumeric"`, `"any"`, `RegExp` | `"any"`        | Condition that defines what type of characters are allowed.                                                           |
| `typeLetterCase`        | `"upperCase"`, `"lowerCase"`, `"any"`                      | `"any"`       | Specifies whether the input should be in uppercase or lowercase.                                                      |
| `placeholder`           | `string`                                                   | `""`          | Placeholder to show in the inputs.                                                                                    |
| `InputsProps`           | `React.InputHTMLAttributes<HTMLInputElement>`              | `{}`          | Additional props to pass to each input element.                                                                       |
| `WrapperProps`          | `React.HTMLAttributes<HTMLDivElement>`                     | `{}`          | Additional props to pass to the wrapper element.                                                                      |
