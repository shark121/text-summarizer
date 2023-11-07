import { motion as m } from "framer-motion";
import logoNoBg from "../public/images/logo-no-background.png";
import Image from "next/image";
import RightArrow from "@/public/images/right";
import { Comfortaa } from "next/font/google";
import TypewriterComponent from "typewriter-effect";
import { useRouter } from "next/router";
const comfotaa = Comfortaa({
  subsets: ["latin"],
});

export default function HomePage() {

 const router = useRouter()

  return (
    <m.div
      className={`flex flex-col w-screen h-screen justify-center items-center ${comfotaa.className}`}
    >
      <div className="flex justify-between box-border w-[85%] h-[3.8rem]  rounded-2xl m-4 shadow-xl px-4">
        <div className="h-full w-[3rem] relative m-[3px]">
          <Image fill src={logoNoBg} className="object-contain" />
        </div>
        <div className="  flex justify-around items-center w-[40%] h-full ">
          <button 
          onClick={()=>router.push("./login")}
          className=" w-[7rem] h-[2.5rem] rounded-[2rem] border-[1.7px] border-purple-300 hover:scale-105 ease-in-out duration-200 delay-75 ">
            {" "}
            Login{" "}
          </button>
          <button 
          onClick={()=>router.push("./try")}
          className="relative w-[15rem] h-[2.5rem] rounded-[2rem] bg-purple-300 px-4 hover:scale-105 ease-in-out duration-200 delay-75">
            <div className="absolute left-2 inset-t-5 bottom-1 w-[30px] h-[30px] rounded-full bg-white p-2 ">
              <RightArrow />
            </div>
            <p className="">Try dhanny free</p>
          </button>
        </div>
      </div>
      <div className="h-[30rem] w-[45rem]  flex flex-col justify-around items-center p-4">
        <div className="h-[20rem] w-[full] flex justify-center items-center flex-col text-[3rem] font-extrabold">
          <div className="flex gap-4">
            Meet <div className="text-purple-500">Dhanny</div>
          </div>
          <div>
            <TypewriterComponent
              onInit={(typewriter) => {
                typewriter
                  .typeString("Summarize any content.")
                  .deleteAll()
                  .pauseFor(200)
                  .typeString("Anytime anywhere.").start()
              }}
            />
          </div>
          <div>Get creative</div>
          <button 
          onClick={()=>router.push('./createAccount')}
          className="text-[1rem] text-white bg-purple-400 px-4 py-2 rounded-lg hover:scale-105 ease-in-out duration-200 delay-75">
            Get Started
          </button>
        </div>
      </div>
    </m.div>
  );
}
