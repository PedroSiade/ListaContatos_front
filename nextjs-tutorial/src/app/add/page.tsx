"use client"


import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import {useState, ChangeEvent, FormEvent} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";





export default function Home() {
    const baseURL = "http://localhost:3333/";
    const [nome, setNome]=useState('');
    const [email, setEmail]=useState('');
    const [telefone, setTelefone]=useState(0);
    const router=useRouter()
    const novoTelefone =(event: ChangeEvent<HTMLInputElement>)=>{
        const x= (event.target.value)
        setTelefone(parseInt(x))
    }

    function createPost(event: FormEvent<HTMLFormElement>) {
        try {
            axios.post(baseURL, {
                nome:nome,
                email:email,
                telefone: telefone})
                .then((response) => {
                    console.log(response);
                });
        }
        catch (error){
            console.log(error)
        }
        event.preventDefault()
    }

    return (
        <main className="flex h-screen w-full flex-1 flex-col justify-center">
            <Navbar/>
            <div className="bg-gray-900 h-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-10 pb-10">
                <p className="my-20 text-center text-xl text-slate-200">Cadastre um novo contato:</p>
                <form className="space-y-6 mt-20 mb-40" onSubmit={(event)=>createPost(event)} method='post'>
                    <label htmlFor="nome" className="block text-sm font-medium leading-6">
                        Nome: <input className="block w-full bg-gray-900 rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" id="nome"  onChange={(event)=>setNome(event.target.value)
                    } required/>
                    </label>

                        <label htmlFor="email " className="block text-sm font-medium leading-6 text-black-900">
                            Email: <input className="block bg-gray-900 w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  type="text" id="email"  onChange={(event)=>setEmail(event.target.value)} required/>

                        </label>
                    <label htmlFor="telefone" className="block text-sm font-medium leading-6 text-black-900">
                        Telefone: <input className="block bg-gray-900 w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="tel" id="telefone"  onChange={(event)=>novoTelefone(event)} required/>

                    </label>
                    <div className=" flex justify-center">
                        <button type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={()=>{router.push('/')}}>Enviar</button>
                    </div>
                    </form>
            </div>
                    <div className="text-center  mt-10">
                        <Link href='/' className="text-sm text-white-500">
                            Já cadastrou?
                        </Link>
                    </div>
            </div>
            <Footer/>
        </main>
    )
}