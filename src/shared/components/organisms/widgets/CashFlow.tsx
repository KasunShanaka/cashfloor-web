import React from "react";
import clsx from "clsx";
import WidgetBackground from "../../../templates/WidgetBackground";
import { CashflowType } from "../../../types/commonEnums";

interface CashFlowProps {
  type: CashflowType.INCOME | CashflowType.EXPENSE;
  amount: number;
  transactionCount: number;
}

const CashFlow = ({ type, amount, transactionCount }: CashFlowProps) => {
  return (
    <WidgetBackground classNames="text-center py-4 min-w-[45%]">
      {" "}
      {/* Adjusted width */}
      <div>{type === CashflowType.EXPENSE ? "Expense" : "Income"}</div>
      <div
        className={clsx(
          type === CashflowType.EXPENSE ? "text-red-400" : "text-green-400",
          "py-1"
        )}
      >
        Rs. {amount.toLocaleString()}
      </div>
      <div className="text-zinc-500 text-xs">
        {transactionCount} transactions
      </div>
    </WidgetBackground>
  );
};

export default CashFlow;
