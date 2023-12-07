import Charts from '@/components/charts'
import SyncCharts from '@/components/syncAreaCharts';
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import React, { useContext, useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { UserContext } from '@/userContext';
import { getDatabase, ref, onValue } from "firebase/database";
import MainTable from '@/components/tabulation';
interface HomeProps {
  // Add your prop types here
}


const Home: React.FC<HomeProps> = ({ }) => {
  const [data2, setData] = useState<{ name: string; uv: any; pv: any; amt: any; }[]>([]);

const { user } = useContext(UserContext);
const db = getDatabase();
const txt = ref(db, 'LED/' + "txt/");

useEffect(() => {
  const fetchData = () => {
    onValue(txt, (snapshot) => {
      const data3 = snapshot.val();
      const dataArray = data3.replace(/[{}]/g, '').split(',').map(Number);
      setData((prevData) => {
        const newData = {
          name: `${prevData.length}`, // Use prevData to get the latest state
          uv: dataArray[0],
          pv: dataArray[1],
          amt: dataArray[2],
        };
        return [...prevData, newData];
      });
    });
  };

  fetchData();
}, []);

  return (
    <>
      <div className='max-w-screen-xl mx-auto flex flex-col items-center justify-center font-pregular '>
        <h1 className="text-5xl font-pbold text-left w-full px-20">Hello, {user.displayName}</h1>
        {/* <Button onClick={() => toast("Sign up failed due to wrong credentials", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: <Icon icon="maki:cross" />,
            onClick: () => console.log("Undo"),
          },
        })}>Show toast{"user.email"}</Button> */}
        <p className="text-xl font-pregular text-start w-full px-20 text-gray-400 mt-4 mb-12">
          Here are some data visualizations for you
        </p>
      </div>

      <Charts data={data2}></Charts>
      <SyncCharts data={data2}></SyncCharts>
      <MainTable data={data2}></MainTable>
      {/* <div>{data2[data2.length - 1].name}</div> */}
    </>
  )
}

export default Home