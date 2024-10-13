import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WalletProvider } from "@/components/walletContext";
import Header from "@/components/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <WalletProvider>
        <Header />
        <Component {...pageProps} />
      </WalletProvider>
    
  );
}
