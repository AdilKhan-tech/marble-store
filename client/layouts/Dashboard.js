"use client"
import React from "react"
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";
import Sidebar from "@/components/dashboard/Sidebar"

const Dashboard = ({children}) => {
    return <>
    <div className="bg-light">
    <Header />
    {children}
     <Footer />
     </div>
    </>
};

export default Dashboard;