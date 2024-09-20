import {
  ChartPieIcon,
  EllipsisHorizontalIcon,
  HomeIcon,
  QueueListIcon,
} from "@heroicons/react/16/solid";
import React, { useEffect } from "react";
import { animate, motion } from "framer-motion";
import IconButton from "../../atoms/IconButton";

const Footer = () => {
  // useEffect(() => {
  //   animate("", 100, {
  //     onUpdate: (latest) => console.log(latest),
  //   });
  // }, []);

  const iconVariants = {
    hidden: { opacity: 0, y: "100%" }, // Initial state of each child (off-screen)
    visible: { opacity: 1, y: 0 }, // Final state of each child (on-screen)
  };

  const parentVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
      },
    },
  };

  return (
    <div className="fixed bottom-0 bg-stone-800 w-full px-10 py-4 text-white border-t-2 border-zinc-800">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={parentVariants}
        className="flex justify-between"
      >
        <motion.div variants={iconVariants}>
          <IconButton
            icon={<HomeIcon className="size-8" />}
            onClick={() => console.log("clicked")}
            title="Home"
          />
        </motion.div>
        <motion.div variants={iconVariants}>
          <IconButton
            icon={<QueueListIcon className="size-8" />}
            onClick={() => console.log("clicked")}
            title="Queue List"
            active
          />
        </motion.div>
        <motion.div variants={iconVariants}>
          <IconButton
            icon={<ChartPieIcon className="size-8" />}
            onClick={() => console.log("clicked")}
            title="Chart Pie"
          />
        </motion.div>
        <motion.div variants={iconVariants}>
          <IconButton
            icon={<EllipsisHorizontalIcon className="size-8" />}
            onClick={() => console.log("clicked")}
            title="More"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Footer;
