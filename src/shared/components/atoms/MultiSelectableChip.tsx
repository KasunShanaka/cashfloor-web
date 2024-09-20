import React, { FC, ReactNode } from "react";
import clsx from "clsx";

interface MultiSelectableChipProps {
  item: {
    id: string;
    icon?: ReactNode;
    name: string;
  };
  selectedItems: string[];
  handleSelectItem: (id: string) => void;
  className?: string;
}

const MultiSelectableChip: FC<MultiSelectableChipProps> = ({
  item,
  selectedItems,
  handleSelectItem,
  className,
}) => {
  const isSelected = selectedItems.includes(item.id);

  return (
    <div
      onClick={() => handleSelectItem(item.id)}
      className={clsx(
        isSelected
          ? "border-green-600 bg-green-900/5 hover:border-green-500"
          : "hover:border-slate-500 border-zinc-600",
        className // allowing custom className to be passed
      )}
    >
      <div className="text-2xl">{item.icon}</div>
      <div>{item.name}</div>
    </div>
  );
};

export default MultiSelectableChip;
