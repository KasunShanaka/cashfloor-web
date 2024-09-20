import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import React from "react";
import IconButton from "../../atoms/IconButton";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl py-4">Good night</div>
      <IconButton
        icon={<EllipsisVerticalIcon className="size-5" />}
        onClick={() => console.log("clicked")}
        title="Notifications"
      />
    </div>
  );
};

export default Navbar;
