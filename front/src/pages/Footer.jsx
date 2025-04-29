"use client";

import Navbar from "@/components/Navbar";
import { Children } from "react";
export const Footer = () => {
    return (
        <footer className="w-full bg-gray-100 py-4 mt-8 border-t">
            <div className="container mx-auto text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} - ESGI - Tous droits réservés
            </div>
        </footer>
    );
};
