import React from "react";

const WidgetContainer = ({ children }: any) => {
  return (
    <div className="flex mt-4 space-x-4 overflow-x-auto scroll-smooth">
      {children}
    </div>
  );
};

export default WidgetContainer;
