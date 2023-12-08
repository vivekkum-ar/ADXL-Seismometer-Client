import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
interface MainTableProps {
  // Add your prop types here
  data: any[];
}

const MainTable: React.FC<MainTableProps> = ({data}) => {
    
  return (
    <>
        <Table className='max-w-screen-lg mx-auto '>
  <TableCaption>A list of all sensor data.</TableCaption>
  
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Sl. No. </TableHead>
      <TableHead className="text-center">X-axis</TableHead>
      <TableHead className="text-center">Y-axis</TableHead>
      <TableHead className="text-center">Z-axis</TableHead>
      <TableHead className="text-center">Timestamp</TableHead>
    </TableRow>
  </TableHeader>
{
data.map((item,index) => {
  return(
    <TableBody key={index}>
    <TableRow>
      <TableCell className="font-medium">{index}</TableCell>
      <TableCell  className="text-center">{item.uv}</TableCell>
      <TableCell  className="text-center">{item.pv}</TableCell>
      <TableCell className="text-center">{item.amt}</TableCell>
      <TableCell className="text-center">{item.timestamp}</TableCell>

    </TableRow>
  </TableBody>
  )
})}
  
</Table>

    </>
  )
}

export default MainTable