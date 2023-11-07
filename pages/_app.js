// import "../styles/global.css"
import "tailwindcss/tailwind.css";
import { Comfortaa} from "next/font/google";
import "../styles/homeStyle.css"


const comfotaa = Comfortaa({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${comfotaa.className}`}>
      <Component {...pageProps} />
    </div>
  );
}
