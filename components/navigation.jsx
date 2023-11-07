import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Router, useRouter } from "next/router";

let navigations = [
  {
    text: "summarize text",
    link: "",
    
  },
  {
    text: "summarize web page",
    link: "",
  },
  {
    text: "view history",
    link: "./history",
  },
];
export default function Navbar({ current, setCurrent }) {
  const router = useRouter();
  function NavItem({ text, link }) {
    const [colorState, setColorState] = useState(false);
    return (
      <Link href={link}>
        <button
          className="relative h-[5rem] bg-white"
          onMouseOver={() => {
            setColorState(true);
          }}
          onMouseLeave={() => setColorState(false)}
          onClick={() => {
            setCurrent(text);
          }}
        >
          <div className="font-bold text-gray-500">{text}</div>
          <motion.div
            initial={{ x: 15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute bottom-0 left-0 right-0 h-[1px] ease-in-out ${
              text === current ? "bg-[#28282B]" : ""
            } `}
          ></motion.div>
        </button>
      </Link>
    );
  }

  let list = navigations.map(({ text, link }) => {
    return <NavItem text={text} link={link} key={text} />;
  });

  return (
    <div className="flex flex-col w-full h-full justify-start z-20 px-4">
      {...list}
    </div>
  );
}
