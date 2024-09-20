import React from "react";
import { DateTime } from "luxon";
import clsx from "clsx";
import { motion } from "framer-motion";
import WidgetBackground from "../../../templates/WidgetBackground";

interface BudgetCardProps {
  title?: string;
  budgetLimit?: number;
  budgetSpent?: number;
  budgetStartDate?: number;
  budgetEndDate?: number;
}

const BudgetCard = ({
  title = "Food/ Groceries",
  budgetLimit = 40000,
  budgetSpent = 20000,
  budgetStartDate = 1725137972000,
  budgetEndDate = 1727643572000,
}: BudgetCardProps) => {
  // Function to calculate remaining days based on the start and end date
  const calculateRemainingDate = () => {
    const days = DateTime.fromMillis(budgetEndDate)
      .diff(DateTime.now(), "days")
      .toObject().days;
    return days && days > 0 ? days : 1;
  };

  // Percentage of budget spent
  const spentPercentage = (budgetSpent / budgetLimit) * 100;
  // Current progress in terms of time elapsed
  const timeProgress =
    ((DateTime.now().toMillis() - budgetStartDate) /
      (budgetEndDate - budgetStartDate)) *
    100;

  return (
    <WidgetBackground>
      {/* Header Section */}
      <div className="bg-green-800">
        <div className="p-4">
          <div className="text-xl">{title}</div>
          <span className="">Rs.{budgetSpent.toLocaleString()}</span>
          <span className="text-xs font-thin">
            {" "}
            left of Rs.{budgetLimit.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress and Date Information */}
      <div className="text-xs pt-8 p-4">
        <div className="flex justify-between gap-2 items-center">
          {/* Budget Start Date */}
          <div>{DateTime.fromMillis(budgetStartDate).toFormat("LLL dd")}</div>

          {/* Progress Bar */}
          <div className="flex-1 bg-zinc-600 relative rounded-full h-3">
            {/* Budget Spent Indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${spentPercentage}%` }}
              transition={{ type: "spring" }}
              style={{ width: `${spentPercentage}%` }}
              className="bg-green-200 rounded-full absolute inset-0"
            ></motion.div>

            {/* Percentage Text */}
            <div
              className={clsx(
                spentPercentage < 40 || spentPercentage > 60
                  ? "left-1/2"
                  : "left-1/4",
                "text-black text-[8px] absolute -translate-x-1/2 -top-0.5"
              )}
            >
              {spentPercentage.toFixed(1)}%
            </div>

            {/* Current Day Marker */}
            <div
              style={{ left: `${timeProgress}%` }}
              className="text-black text-[8px] absolute -top-5 -translate-x-1/2 bg-white opacity-80 px-1 rounded"
            >
              Today
            </div>

            {/* Vertical Line for Today */}
            <div
              style={{ left: `${timeProgress}%` }}
              className="text-[8px] absolute bg-white w-0.5 opacity-80 h-4 bottom-0"
            ></div>
          </div>

          {/* Budget End Date */}
          <div>{DateTime.fromMillis(budgetEndDate).toFormat("LLL dd")}</div>
        </div>

        {/* Remaining Budget and Days */}
        <div className="pt-4 text-center text-zinc-500">
          You can spend Rs.
          {((budgetLimit - budgetSpent) / calculateRemainingDate()).toFixed(
            2
          )}{" "}
          for {calculateRemainingDate().toFixed(0)} days
        </div>
      </div>
    </WidgetBackground>
  );
};

export default BudgetCard;
