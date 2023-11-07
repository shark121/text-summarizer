import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

import { database } from "./firebaseConfig";
import { useEffect, useState } from "react";
import { app } from "./firebaseConfig";
import { useRouter } from "next/router";
import { Comfortaa } from "next/font/google";
import CreateAccount from "@/components/createAccount";
import LogoNoBg from "../public/images/logo-no-background.png";
import orangeBg from "../public/images/lexander.jpg";
import Image from "next/image";
import AccountLogin from "@/components/accountLogin";

const comfortaa = Comfortaa({
  subsets: ["latin"],
});

function HomePage() {
  const auth = getAuth();
  let router = useRouter();
  const [current, setCurrent] = useState("Email");

  const triggerLogin = ["try", "login"];
  const triggerCreateAccount = ["createAccount"];

  const query = router.query.signInOptions;

  return (
    <div className="w-screen h-screen flex justify-between ">
      <div className="relative h-full w-[40%]">
        <Image src={orangeBg} fill className="object-cover" />
      </div>
      <div className="h-full w-[50%] ">
        <div className=" h-[25%] w-full  flex justify-center items-center">
          <div className="relative w-[5rem] h-[5rem]">
            {/* <Image src={LogoNoBg} fill className="objecct-cover" /> */}
          </div>
        </div>
        <div className="h-[75%] w-full flex items-center justify-center">
          {triggerLogin.includes(query) ? (
            <AccountLogin setCurrent={setCurrent} current={current} />
          ) : (
            <CreateAccount setCurrent={setCurrent} current={current} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
