<div
className={`h-full w-[90%] text-gray-600 flex flex-col items-center justify-between p-4 ${comfortaa.className} m-y-4`}
>
<div className="text-[1.7rem] font-bold">Create Account</div>
<div className="h-[4rem] relative w-full flex flex-col justify-end gap-2 ">
  <p className=" absolute top-0 left-0 text-[0.9rem] self-start justify-self-start flex top">
    Email
  </p>
  <input
    className="w-full text-[1.4rem] outline-none bg-inherit"
    onFocus={() => setColorState(true)}
    onClick={() => {
      setColorState(true);
      setCurrent("feild1");
    }}
  />
  <m.div
    initial={{ width: 0, opacity: 0 }}
    animate={{ width: "100%", opacity: 1 }}
    exit={{ y: -10, opacity: 0 }}
    transition={{ duration: 1 }}
    className={`w-full h-[0.07rem] rounded-2xl ${
      colorState ? "bg-red-300" : "bg-black"
    } `}
  ></m.div>
</div>
<div className="h-[4rem] relative w-full flex flex-col justify-end gap-2">
  <p className=" absolute top-0 left-0 text-[0.9rem] self-start justify-self-start flex top">
    Password
  </p>
  <input
    className="w-full text-[1.4rem] outline-none bg-inherit"
    onClick={() => setFocus("feild2")}
  />
  <div className="w-full h-[0.07rem] bg-black rounded-2xl"></div>
</div>
<div className="h-[4rem] relative w-full flex flex-col justify-end gap-2">
  <p className=" absolute top-0 left-0 text-[0.9rem] self-start justify-self-start flex top">
    Confirm Password
  </p>
  <input
    className="w-full text-[1.4rem] outline-none bg-inherit"
    onClick={() => setFocus("feild3")}
  />
  <div className="w-full h-[0.07rem] bg-black rounded-2xl"></div>