import {
  ArrowDownIcon,
  ArrowUpIcon,
  HomeIcon,
} from "@heroicons/react/16/solid";
import React from "react";

interface TransactionItemProps {
  type: "INCOME" | "EXPENSE";
  amount: number;
  category: string;
  source: string;
}

const TransactionItem = ({
  type,
  amount,
  category,
  source,
}: TransactionItemProps) => {
  return (
    <div className="flex items-center space-x-4 my-3">
      <div className="bg-red-400 rounded-full p-3 ">
        <HomeIcon className="size-8" />
      </div>
      <div className="flex-1">
        <div className="text-lg">{category}</div>
        <div className="text-sm text-zinc-400 bg-yellow-500 bg-opacity-30 inline-block px-2 rounded">
          {source}
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        {type === "EXPENSE" ? (
          <>
            <ArrowDownIcon className="size-3 text-red-400" />
            <div className="text-lg text-red-400">Rs.{amount}</div>
          </>
        ) : (
          <>
            <ArrowUpIcon className="size-3 text-green-400" />
            <div className="text-lg text-green-400">Rs.{amount}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
