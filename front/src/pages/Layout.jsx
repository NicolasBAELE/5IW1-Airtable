"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "./Footer";
export const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-4 min-h-screen">{children}</div>
            <Footer />
        </>
    );
};
