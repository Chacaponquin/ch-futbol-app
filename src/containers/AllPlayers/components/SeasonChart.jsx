import { useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";

const SeasonChart = ({ seasonRecords = [] }) => {
  const handleResizeChart = () => {
    const size = window.innerWidth;
    let returnObject = {};

    if (size < 400) returnObject = { width: 270, height: 200 };
    if (size > 400 && size < 640) returnObject = { width: 350, height: 240 };
    if (size >= 640) returnObject = { width: 530, height: 250 };
    if (size >= 768) returnObject = { width: 640, height: 300 };
    if (size >= 1024) returnObject = { width: 920, height: 330 };
    if (size > 1200) returnObject = { width: 1000, height: 330 };

    return returnObject;
  };

  const [chartSize, setChartSize] = useState(handleResizeChart());

  useEffect(() => {
    window.addEventListener("resize", () => {
      setChartSize(handleResizeChart());
    });
  }, []);

  return (
    <LineChart
      data={seasonRecords}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      width={chartSize.width}
      height={chartSize.height}
      className="flex justify-center !w-full esm:-translate-x-7"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={`yearFinish`} />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="goals"
        stroke="#1B9CFC"
        dot={false}
        strokeWidth={2}
      />
      <Line
        type="monotone"
        dataKey="assists"
        stroke="#26de81"
        dot={false}
        strokeWidth={2}
      />
    </LineChart>
  );
};

export default SeasonChart;
