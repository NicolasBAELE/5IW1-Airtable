"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "./Footer";
export const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};
