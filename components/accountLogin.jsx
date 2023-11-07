import { Comfortaa } from "next/font/google";
import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { app } from "@/pages/firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400"],
});
import Image from "next/image";
import googleLogo from "../public/images/google.png"

export default function AccountLogin({ setCurrent, current }) {
  const auth = getAuth();
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let emailVar;
  let passwordVar;

  async function useGoogleProvider() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const token = credential.accessToken;

        const user = result.user;

        // console.log(user, credential, token);

        router.push("/summaryPage");
        // ...
      })
      .catch((error) => {
        window.alert(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function handleSubmit() {
    setEmail(emailVar);
    setPassword(passwordVar);
    console.log(emailVar, passwordVar);
    signInWithEmailAndPassword(auth, emailVar, passwordVar)
      .then((e) => {
        console.log(e.user.uid);
        window.alert("signed in successfully");
        router.push("/summaryPage");
      })
      .catch((err) => {
        window.alert(err);
      });
  }

  const formElements = [
    {
      field: "Email",
      placeholder: "example@gmail.com",
      type: "email",
      required: true,
    },
    {
      field: "Password",
      placeholder: "********",
      type: "password",
      required: true,
    },
  ];
  const [colorState, setColorState] = useState(false);

  function FormElement({ field, placeholder, type, required }) {
    return (
      <div className="h-[4rem] relative w-full flex flex-col justify-end gap-2 ">
        <p className=" absolute top-0 left-0 text-[0.9rem] self-start justify-self-start flex top">
          {field}
        </p>
        <input
          className="w-full text-[1.1rem] outline-none "
          placeholder={placeholder}
          type={type}
          onClick={(e) => {
            setColorState(true);
          }}
          onChange={(e) => {
            e.preventDefault;
            emailVar = e.target.value;
            field == "Email"
              ? (emailVar = e.target.value)
              : (passwordVar = e.target.value);
          }}
        />
        <m.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: current === field ? 1 : 0 }}
          className={`w-full h-[0.07rem] rounded-2xl `}
        ></m.div>
      </div>
    );
  }

  const list = formElements.map(({ field, placeholder, type, required }) => {
    return (
      <FormElement
        field={field}
        placeholder={placeholder}
        type={type}
        required={required}
      />
    );
  });

  return (
    <div
      className={`h-full w-[90%] text-gray-600 flex flex-col items-center justify-between p-4 ${comfortaa.className} m-y-4`}
    >
      <div className="text-[1.7rem] font-bold"> Sign In</div>
      {...list}

      <button className="h-[2rem]" onClick={handleSubmit}>
        {" "}
        Login
      </button>
      <button className="flex" onClick={useGoogleProvider}>
     <>continue with google</>   
        <div className="h-[1.5rem] w-[1.8rem]  relative">
          <Image className="object-contain mx-2" fill src={googleLogo} />
        </div>
      </button>
    </div>
  );
}
