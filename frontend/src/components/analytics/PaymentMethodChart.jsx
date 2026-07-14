import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useReports } from "../../context/ReportContext";

const COLORS = [
  "#0B6B57",
  "#4CAF50",
  "#FFC107",
  "#FF5722",
  "#3F51B5",
  "#9C27B0",
];

export default function PaymentMethodChart() {

  const { paymentReport } = useReports();

  const data = Object.entries(paymentReport).map(
    ([method, amount]) => ({
      name: method,
      value: amount,
    })
  );

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-bold mb-6">

        Spending by Payment Method

      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}