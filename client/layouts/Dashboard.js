"use client"
import React from "react"
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";

const Dashboard = ({children}) => {
    return <>
    <Header />
    {children}
     <Footer />
    </>
};

export default Dashboard;