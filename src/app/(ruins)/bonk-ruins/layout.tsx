"use client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuickSelectModal } from "@/components/QuickSelectModal";
import { RecoilRoot } from "recoil";
export default function InRuinsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <RecoilRoot>
      <div
        className="bg-cover text-white items-center flex flex-col min-h-screen bg-center"
        style={{
          backgroundImage: 'url(/maps/bonk-ruinsBg.png)'
        }}>
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
      <QuickSelectModal />
    </RecoilRoot>
  );
}
