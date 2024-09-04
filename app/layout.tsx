import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import NextUI from "@/providers/NextUIProvider";
import Navbar from "@/components/global/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

const lato = Lato({ subsets: ["latin"], weight: '700' });

export const metadata: Metadata = {
  title: "SAM Client App",
  description: "SAM Client Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // add this line for the font
        // className={lato.className}
      >
        <NextUI>
          <Navbar/>
          <div className="flex justify-center items-center">
            <div className="py-20 max-w-[1300px] m-auto w-full p-5 flex justify-center">
              <Toaster position="bottom-right" />
              {children}
            </div>
          </div>
        </NextUI>
      </body>
    </html>
  );
}
