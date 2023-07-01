"use client"
import React, {useState} from "react";
import Link from "next/link";

export default function Navbar() {
    const [mostrar, setMostrar] = useState<boolean>()
    return (
        <div>
            <nav className="h-16 font-serif flex flex-row bg-gray-950 justify-center items-center">
                <Link className="text-2xl text-white" href="/">Lista de Contatos</Link>
            </nav>
        </div>
    )
}