
import styles from "@/ui/dashboard/chart/chart.module.css"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const data = [
    {
      name: 'Mon',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Tue',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Wed',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Thur',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Fri',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Sat',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Sun',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const Chart = () => {
    return (
        <div className={styles.container}>
            <h2>Weekly Report</h2>

            <div>
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <LineChart className={styles.chartContainer} width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{background: "#151c2c" , border: "none"}}/>
                </LineChart>
            {/* </ResponsiveContainer> */}
            </div>
        </div>
    )
}

export default Chart;