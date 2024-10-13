import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WalletProvider } from "@/components/walletContext";
import Header from "@/components/header";
import Button from "@/components/button";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <WalletProvider>
        <Header />
        <Button />
        <Component {...pageProps} />
      </WalletProvider>
    
  );
}
