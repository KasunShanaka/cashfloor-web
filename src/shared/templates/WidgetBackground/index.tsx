import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface WidgetBackgroundProps {
  children: React.ReactNode;
  classNames?: string;
}

const WidgetBackground = ({
  classNames = "",
  children,
}: WidgetBackgroundProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={clsx(
        "bg-zinc-800 flex-1 rounded-xl overflow-hidden",
        classNames
      )}
    >
      {children}
    </motion.div>
  );
};

export default WidgetBackground;
