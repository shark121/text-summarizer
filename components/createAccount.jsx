import { Comfortaa } from "next/font/google";
import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { app } from "@/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import googleLogo from  "../public/images/google.png"

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400"],
});

const auth = getAuth();

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



export default function CreateAccount({ setCurrent, current, CreateAccount }) {
  const router = useRouter();
  let emailVar = "";
  let passwordVar = "";
  let provider = new GoogleAuthProvider()

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
    console.log(email, password);
    createUserWithEmailAndPassword(auth, emailVar, passwordVar).then(() => {
      window.alert("account created successfully");
      router.push("/summaryPage");
    });
  }

  function FormElement({ field, placeholder, type, required }) {
    const [colorState, setColorState] = useState(false);
    const error = false;
    return (
      <div className="h-[4rem] relative w-full flex flex-col justify-end gap-2 ">
        <p className=" absolute top-0 left-0 text-[0.9rem] self-start justify-self-start flex top">
          {field}
        </p>
        <input
          className="w-full text-[1.1rem] outline-none bg-inherit"
          placeholder={placeholder}
          onClick={() => {
            setColorState(true);
            setCurrent(field);
          }}
          onChange={(e) => {
            e.preventDefault;
            field === "Email"
              ? (emailVar = e.target.value)
              : (passwordVar = e.target.value);
          }}
        />
        {/* <m.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: colorState ? 1 : 0 }}
          className={`w-full h-[0.07rem] rounded-2xl ${
            error ? "bg-red-300" : "bg-black"
          } `}
        ></m.div> */}
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
      <div className="text-[1.7rem] font-bold">Create Account</div>
      {...list}

      <button className="h-[2rem]" onClick={handleSubmit}>
        Submit
      </button>
      <button className="flex" onClick={useGoogleProvider}>
        <>continue with google</>  
        <div className="h-[1.5rem] w-[1.8rem] relative">
          <Image className="object-contain mx-2" fill src={googleLogo}/>
        </div>
      </button>
    </div>
  );
}
