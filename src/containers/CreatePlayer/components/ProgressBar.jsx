import { Progress } from "antd";
import React from "react";

const ProgressBar = () => {
  return (
    <div className="py-5">
      <Progress
        strokeColor={{
          "0%": "#25CCF7",
          "100%": "#1B9CFC",
        }}
        percent={60}
      />
    </div>
  );
};

export default ProgressBar;
