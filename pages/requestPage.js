import Logo from "@/public/images/logoColor"
import Script from "next/script"
import LogoCSS from "@/public/images/logo"
import {Ubuntu} from "next/font/google"


const ubuntu = Ubuntu({
    subsets:["latin"],
    weight:["400"]
})

export default function RequestPage(){

    return<div className={`h-screen w-screen p-8 ${ubuntu.className}`}>
       <LogoCSS/>
    </div>
}