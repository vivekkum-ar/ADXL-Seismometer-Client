import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
interface ChartsProps {
  // Add your prop types here
  data: any[];
}

const Charts: React.FC<ChartsProps> = ({data}) => {
    // const data01 = [
    //     { "x": 2, "y": 4 },
    //     { "x": 5, "y": 0 },
    //     { "x": 7, "y": 2 },
    //     { "x": 3, "y": 1 },
    //     { "x": 6, "y": 5 },
    //     { "x": 1, "y": 3 }
    //   ];
  return (
    <ResponsiveContainer className={"px-20"} height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="uv" name="X-axis" unit={"ms^-2"} />
          <YAxis type="number" dataKey="pv" name="Y-axis" unit="ms^-2" />
          <ZAxis type="number" range={[100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Seismograph" data={data} fill="#8884d8" shape="circle" />
          {/* <Scatter name="B school" data={data02} fill="#82ca9d" line shape="diamond" /> */}
        </ScatterChart>
      </ResponsiveContainer>
  )
}

export default Charts