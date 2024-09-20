import clsx from "clsx";
import React from "react";
import { motion } from "framer-motion";

interface IconButtonProps {
  icon: JSX.Element; // Icon component (can use something like Heroicons or FontAwesome)
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Function to handle the click event
  className?: string; // Optional className for additional styling
  disabled?: boolean; // Optional disabled prop
  title?: string; // Optional title for accessibility
  active?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
  disabled,
  title,
  active,
}) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      type="button"
      onClick={onClick}
      className={clsx(
        className,
        `inline-flex items-center justify-center p-2 rounded-full  transition duration-150 ease-in-out ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 hover:bg-zinc-600"
        }`,
        active && "bg-slate-600 scale-110"
      )}
      disabled={disabled}
      title={title}
    >
      {icon}
    </motion.button>
  );
};

export default IconButton;
