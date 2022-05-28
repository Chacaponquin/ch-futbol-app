import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
} from "recharts";

const SeasonChart = ({ seasonRecords = [] }) => {
  return (
    <LineChart
      width={1000}
      height={250}
      data={seasonRecords}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={`yearFinish`} />
      <YAxis />
      <Tooltip />
      <Legend />
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
