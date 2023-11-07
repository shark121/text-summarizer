import { animate, motion as m } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function LogoCSS({ shouldAnimate }) {
  let [shouldRotate, setshouldRotate] = useState(0);


  function checkAnimate(){
    if (shouldAnimate) {
      setshouldRotate(8);
      console.log("should");
    } else {
      setshouldRotate(0);
      console.log("shouldnt");
    }
  }
  useEffect(() => {
    checkAnimate()
  },[]);

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
            duration: shouldRotate,
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
            duration: shouldRotate,
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
