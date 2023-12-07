import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
interface ChartsProps {
  // Add your prop types here
  data: any[];
}

const Charts: React.FC<ChartsProps> = ({data}) => {
  return (
    <ResponsiveContainer className={"md:px-20 px-1 md:m-[20] md:max-h-96 max-h-72 md:min-h-96 min-h-72 mb-12"}>
        <ScatterChart className=''
          margin={{
            right: 20,
            left: 20,
          }}
        >
          <CartesianGrid className='outline-gray-900 px-10'/>
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