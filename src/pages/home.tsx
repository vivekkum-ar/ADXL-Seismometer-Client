import Charts from '@/components/charts'
import SyncCharts from '@/components/syncAreaCharts';
import { toast } from "sonner"
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/userContext';
import { getDatabase, ref, onValue } from "firebase/database";
import MainTable from '@/components/tabulation';
import { messaging } from '@/firebase';
import { getToken, onMessage } from 'firebase/messaging';
interface HomeProps {
  // Add your prop types here
}


const Home: React.FC<HomeProps> = ({ }) => {
  const { fcmToken, setFcmToken } = useContext(UserContext);

  async function requestPermission() {
    if (fcmToken !== null || fcmToken !== undefined || fcmToken !== "") {
      //requesting permission using Notification API
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: "BMTOuRz0HCcBtlJXpn4J_eUobB3w7SQlkdwIxSkG7-Z04TsTWfSUd7rUlhn_NRNeIpJX2NU6mRaarGcN84iYyS8",
        });

        //We can send token to server
        console.log("Token generated : ", token);
        setFcmToken(token);
      } else if (permission === "denied") {
        //notifications are blocked
        alert("You denied for the notification");
        setFcmToken("");
      }
    }
  }
  useEffect(() => {
    requestPermission();
    }, []);
      onMessage(messaging, (payload) => {
        toast(`${payload.notification?.title}`, { description: `${payload.notification?.body}`, classNames: { toast: "group-[.toaster]:border-green-500 group-[.toaster]:border-2" }, duration: 5000 });
      });
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
      <div className='md:max-w-screen-xl max-w-screen-md mx-auto flex flex-col items-center justify-center font-pregular '>
        <h1 className="md:text-5xl text-2xl font-pbold text-left w-full md:px-20 px-4">Hello, {user.displayName}</h1>
        {/* <Button onClick={() => toast("Sign up failed due to wrong credentials", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: <Icon icon="maki:cross" />,
            onClick: () => console.log("Undo"),
          },
        })}>Show toast{"user.email"}</Button> */}
        <p className="md:text-xl text-md font-pregular text-start w-full md:px-20 px-4 text-gray-400 md:mt-4 mt-1 md:mb-12 mb-4">
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