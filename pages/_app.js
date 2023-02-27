import { AuthContextProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </AuthContextProvider>
  );
}
