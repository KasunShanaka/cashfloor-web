import clsx from "clsx";
import React from "react";

interface TextAreaProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number; // Optional, to control number of visible rows
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  placeholder = "Paste your message here",
  value,
  onChange,
  className,
  rows = 3, // Default to 3 rows
}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        className,
        "resize-none w-full bg-transparent border border-1 border-zinc-600 p-2 rounded-lg focus:outline-none focus:ring-0"
      )}
      rows={rows} // Controls the height of the textArea
    />
  );
};

export default TextArea;
