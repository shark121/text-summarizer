import { Comfortaa } from "next/font/google";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, doc, collection, getDocs, getDoc } from "firebase/firestore";
import { database, auth } from "../firebase.config";
import { useRouter } from "next/router";
import Image from "next/image";
import logoImg from "../public/images/logo-no-background.png";
import Logo from "@/public/images/logoColor";
import LogoCSS from "@/public/images/logo";
import { motion as m } from "framer-motion";
import TypewriterComponent from "typewriter-effect";
import Navbar from "@/components/navigation";


const comfortaa = Comfortaa({
  subsets: ["latin"],
});

export default function SummaryPage() {
  const [currentState, setCurrentState] = useState("summarize text");
  const [currentPrompt, setCurrentPrompt] = useState("text")


  function LogoCSS({ shouldAnimate }) {
    const animated = shouldAnimate ? 3 : 0;

    return (
      <div className=" absolute top-2 h-[1rem] w-[1rem] scale-[0.4] self-center">
        <m.svg
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          enableBackground="new 0 0 100 100"
          viewBox="0 0 100 125"
          className="absolute  -z-30 rotate-[30deg] -left-2 "
          height={"10rem"}
          width={"10rem"}
          fill="url(#gradient)"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="80%" stopColor="#f32170" />
              <stop offset="100%" stopColor="#ff6b08" />
              <stop offset="100%" stopColor="#cf23cf" />
              <stop offset="100%" stopColor="#eedd44" />
            </linearGradient>
          </defs>
          <m.path
            initial={{ rotateZ: 0 }}
            animate={{ rotateZ: 360 }}
            transition={{
              duration: animated,
              repeat: Infinity,
              repeatType: "loop",
            }}
            d="M83 10H17c-3.86 0-7 3.14-7 7v66c0 3.86 3.14 7 7 7h66c3.86 0 7-3.14 7-7V17c0-3.86-3.14-7-7-7zm5 73c0 2.757-2.243 5-5 5H17c-2.757 0-5-2.243-5-5V17c0-2.757 2.243-5 5-5h66c2.757 0 5 2.243 5 5v66z"
          ></m.path>
        </m.svg>
        <m.svg
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          enableBackground="new 0 0 100 100"
          viewBox="0 0 100 125"
          className="absolute  -z-20 rotate-[60deg] -top-2 -left-3 "
          height={"10rem"}
          width={"10rem"}
          fill="url(#gradient)"
        >
          <m.path
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -360 }}
            transition={{
              duration: animated,
              repeat: Infinity,
              repeatType: "loop",
            }}
            d="M83 10H17c-3.86 0-7 3.14-7 7v66c0 3.86 3.14 7 7 7h66c3.86 0 7-3.14 7-7V17c0-3.86-3.14-7-7-7zm5 73c0 2.757-2.243 5-5 5H17c-2.757 0-5-2.243-5-5V17c0-2.757 2.243-5 5-5h66c2.757 0 5 2.243 5 5v66z"
          ></m.path>
        </m.svg>
        <m.svg
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          enableBackground="new 0 0 100 100"
          viewBox="0 0 100 125"
          className="absolute "
          height={"10rem"}
          width={"10rem"}
          fill="url(#gradient)"
        >
          <m.path d="M83 10H17c-3.86 0-7 3.14-7 7v66c0 3.86 3.14 7 7 7h66c3.86 0 7-3.14 7-7V17c0-3.86-3.14-7-7-7zm5 73c0 2.757-2.243 5-5 5H17c-2.757 0-5-2.243-5-5V17c0-2.757 2.243-5 5-5h66c2.757 0 5 2.243 5 5v66z"></m.path>
        </m.svg>
        {/* <div className=" absolute diverText font-bold text-[1.3rem] top-[2.9rem] left-[3.4rem]">
          diver
        </div> */}
      </div>
    );
  }

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [collectedHistory, setCollectedHistory] = useState([]);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setUser(uid);
      } else {
        router.push("/");
      }
    });
  }, []);

  const collectionRef = collection(database, "history");

  async function fetchDocuments() {
    await getDocs(collection(database, "history", user, "summaries")).then(
      (data) => {
        data.docs.map((element) => {
          console.log(element.data());
          console.log(element.id);
          collectedHistory.includes(element.id)
            ? null
            : setCollectedHistory([...collectedHistory, element.id]);
        });
      }
    );

    console.log(collectedHistory);
  }

  async function AddDocument(prompt, summary, time) {
    await addDoc(collection(database, "history", user, "summaries"), {
      text: prompt,
      summary: summary,
      time: time,
    });

    fetchDocuments();
  }

  const linkPrompt = "summarize the content on this page :"
  const textPrompt = "summarize the text "


 useEffect(()=>{
 if(currentState == "summarize wepage"){
  setCurrentPrompt(linkPrompt)

 }else if(currentState=="summarize text"){

   setCurrentPrompt(textPrompt)
  }

  console.log(currentPrompt)
  

 },[currentState])

  async function requestFunc() {
    setShouldAnimate(true);

    await fetch("./api/requestApi", {
      method: "POST",
      body: JSON.stringify(`summarize the text "${prompt}"`),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.text();

        let parsedResponse = JSON.parse(response);
        setResponse(parsedResponse);

        AddDocument(prompt, response, Date.now());
        setShouldAnimate(false);
      })
      .catch(() => setShouldAnimate(false));
  }

  return (
    <div
      className={`${comfortaa.className} flex  justify-between p-4 h-screen w-screen items-center gap-6 bg-[#28282B]`}
    >
      <div className="h-[90vh] w-[15rem] bg-white  rounded-xl">
        <Navbar setCurrent={setCurrentState} current={currentState}/>
      </div>
      <div className="h-[90vh] w-[70vw] flex flex-col justify-center items-center">
        <div
          className={`${comfortaa.className} min-h-[20rem] w-full  my-2 relative flex items-center justify-start`}
        >
          <div className="h-auto w-auto bg-white p-4 rounded-tr-xl rounded-br-xl rounded-bl-[3rem] font-bold text-gray-500">
           {response ? response : "let me help you summarize"}
          </div>
        </div>

        <div className="flex w-[48rem] h-[10rem] gap-4 items-center">
          <div className="w-[35rem] relative h-full   flex justify-center items-center rounded-2xl ">
            <div className=" bg-white  w-full relative h-full rounded-2xl opacity-[0.3] shadow-sky-200xl"></div>
            <textarea
              className="absolute z-20 rounded-2xl resize-none  outline-none my-8 w-[95%] p-2 h-[88%] text-gray-500 "
              placeholder="text to summarize"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <div></div>
          </div>
          <button
            onClick={requestFunc}
            className="h-[5rem] w-[5rem] rounded-full p-[1px] bg-white relative"
          >
            <LogoCSS shouldAnimate={shouldAnimate} />
          </button>
        </div>
        {/* <button onClick={AddDocument}>add</button>
        <button onClick={fetchDocuments}>fetch</button> */}
      </div>
    </div>
  );
}
