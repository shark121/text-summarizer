import { database, app } from "../firebase.config";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { Comfortaa, Sumana } from "next/font/google";
import BackArrow from "@/public/images/backArrow";
import Link from "next/link";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["600"],
});

export default function History({ dataObject }) {
  const [collectedHistory, setCollectedHistory] = useState([]);
  const [collectedHistoryData, setCollectedHistoryData] = useState([]);
  const [user, setUser] = useState([]);
  const router = useRouter();

  let auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      setUser(uid);
    } else {
      // router.push("/");
    }
  });

  // console.log(dataObject)
  let list = dataObject.map(({ time, text, summary }, i) => {
    return <HistoryMap time={time} text={text} summary={summary} key={time} />;
  });

  list = list.reverse();

  function HistoryMap({ time, text, summary }) {
    console.log(text, summary);
    let timeInHistory =  new Date(time);
    console.log(time)

    return (
      <div className="w-full min-h-[13rem] bg-white my-[1px] flex justify-center items-start gap-4 rounded-lg p-4">
        <div className="flex flex-col">
          {" "}
          <div className="font-extrabold text-[1.4rem]">Time</div>{" "}
          <div>{timeInHistory.toUTCString()}</div>
        </div>
        {/* <div className="h-a rounded-lg bg-gray-700"></div> */}
        <div className="w-[32%]">
          <div className="font-extrabold text-[1.4rem] text-ellipsis">Text</div>{" "}
          <div>{String(text)}</div>
        </div>

        <div className="w-[32%]">
          <div className="font-extrabold text-[1.4rem]">Summary</div>{" "}
          <div>{String(summary)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-w-screen min-h-screen ${comfortaa.className} overflow-x-hidden`}>
      <div className=" flex justify-center gap-10 items-center text-[2rem] font-bold bg-[#28282b] text-white">
        <Link href={"./summaryPage"}>
          <div className="h-[3rem] w-[3rem] ">
            <BackArrow />
          </div>
        </Link>
        <div className="">HISTORY</div>
      </div>
      <div
        className={`min-w-screen min-h-screen flex flex-col bg-[#28282B] text-gray-600 font bold  p-4`}
      >
        {...list}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let array = [];

  await getDocs(
    collection(database, "history", "8yIvfM7PTDMHliReHbOZPHsozKY2", "summaries")
  ).then((data) => {
    data.docs.map((element) => {
      // console.log(element.data());
      array.push(element.data());
      // console.log(array);
    });
  });

  // console.log(array);

  return {
    props: {
      dataObject: array.map(({ summary, text, time }) => ({
        text: text || null,
        time: time || null,
        summary: summary || null,
      })),
    },
  };
}
