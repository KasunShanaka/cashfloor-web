import { Dispatch, SetStateAction } from "react";

export interface SelectionHandlerProps {
  item: string;
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
  isMultiSelect?: boolean;
}

// selectionHandler.ts
export const handleSelect = ({
  item,
  setSelectedItems,
  isMultiSelect = true,
}: SelectionHandlerProps) => {
  setSelectedItems((prevItems) => {
    if (prevItems.includes(item)) {
      return prevItems.filter((i) => i !== item); // Remove if already selected
    } else {
      // For single select, replace the selected item
      return isMultiSelect ? [...prevItems, item] : [item];
    }
  });
};
