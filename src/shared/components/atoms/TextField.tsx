import clsx from "clsx";
import React from "react";

interface TextFieldProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  placeholder = "Paste your message here",
  value,
  onChange,
  className,
}) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        className,
        "w-full bg-transparent border-0 focus:outline-none focus:ring-0"
      )}
    />
  );
};

export default TextField;
