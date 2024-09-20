import { BellIcon, PlusIcon } from "@heroicons/react/16/solid";
import React from "react";
import IconButton from "../../atoms/IconButton";

interface FAPProps {
  onClick: () => void;
}

const Fap = ({ onClick }: FAPProps) => {
  return (
    <IconButton
      icon={<PlusIcon className="size-6" />}
      onClick={onClick}
      className="fixed bottom-24 right-4 bg-zinc-600 p-5 rounded-2xl"
      title="Notifications"
    />
  );
};

export default Fap;
