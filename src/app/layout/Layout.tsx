"use client";
import SignInButton from "@/app/components/SignInButton";
import {Footer} from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import {useState} from "react";



const Layout: React.FC = () => {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  return (
    <div>
      <Header></Header>
      <Sidebar  setExpand={setSideMenuIsExpand}></Sidebar>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-5xl font-semibold">AWESOME-BRO</h1>


      </main>

      <Footer></Footer>
    </div>
  )
}

export default Layout;