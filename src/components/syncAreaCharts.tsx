import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SyncChartsProps {
  // Add your prop types here
  data: { name: string; uv: number; pv: number; amt: number; }[];
}

const SyncCharts: React.FC<SyncChartsProps> = ({data}) => {
    return (
    <>
    <div className="md:px-20 px-0 flex md:flex-row flex-col justify-center items-center">
<div className="w-full">
<p className="text-center">Maybe some other content</p>
    <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" name='X acceleration' dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
        </div>
<div className="w-full">
        <p className="text-center">Maybe some other content</p>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" name='Y acceleration' dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
        </div>
    </div>
    </>
  )
}

export default SyncCharts