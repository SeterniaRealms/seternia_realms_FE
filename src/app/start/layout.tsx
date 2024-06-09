"use client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuickSelectModal } from "@/components/QuickSelectModal";
import { usePathname } from "next/navigation";
import { RecoilRoot } from "recoil";

export default function InGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const shouldChangeBackground = pathname.includes("/start/training");
  const runeBg = pathname.includes("/start/mint-rune");
  const altar = pathname.includes("/start/altar");

  return (
    <RecoilRoot>
      <div className="flex bg-[#161128] from-black flex-col min-h-screen items-center w-full">
        <Header />
        <div className="flex-grow w-full max-w-screen-xl border-gradient flex items-center justify-center overflow-hidden">
          {children}
        </div>
        <Footer />
      </div>
      <QuickSelectModal />
    </RecoilRoot>
  );
}
