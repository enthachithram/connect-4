"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({


  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const [signupmodal, setSignupmodal] = useState<boolean>(false)

  const signupclose = (() => {
    setSignupmodal(!signupmodal)
  })
  return (



    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar></Navbar>
        <div onClick={() => setSignupmodal(true)}>sign up</div>
        {signupmodal && <Signup closemodal={signupclose} />}
        {children}
      </body>
    </html>
  );
}
