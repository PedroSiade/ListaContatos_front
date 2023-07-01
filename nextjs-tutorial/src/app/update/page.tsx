"use client"


import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import {useState, ChangeEvent, FormEvent} from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/router';






export default function update() {
    const baseURL = "http://localhost:3333/";
    const [nome, setNome]=useState('');
    const [email, setEmail]=useState('');
    const [telefone, setTelefone]=useState(0);

    const novoTelefone =(event: ChangeEvent<HTMLInputElement>)=>{
        const x= (event.target.value)
        setTelefone(parseInt(x))
    }

    function updatePost(event: FormEvent<HTMLFormElement>) {
        try {
            const id=11
            //if(nome===''){
              //  nome=contato.nome
            //}
            axios.put(baseURL+id, {
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
                    <p className="mt-20 text-center text-xl text-slate-200">Atualize o contato:</p>
                    <p className="mt-1 mb-19 text-center text-slate-200">Preencha o campo que deseja atualizar</p>
                    <form className="space-y-6 mt-20 mb-40 h-full" onSubmit={(event)=>updatePost(event)} method='post'>
                        <label htmlFor="nome" className="block text-sm font-medium leading-6">
                            Nome: <input className="block w-full bg-gray-900 rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" id="nome"  onChange={(event)=>setNome(event.target.value)
                        }/>
                        </label>

                        <label htmlFor="email " className="block text-sm font-medium leading-6 text-black-900">
                            Email: <input className="block bg-gray-900 w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  type="text" id="email"  onChange={(event)=>setEmail(event.target.value)}/>

                        </label>
                        <label htmlFor="telefone" className="block text-sm font-medium leading-6 text-black-900">
                            Telefone: <input className="block bg-gray-900 w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="tel" id="telefone"  onChange={(event)=>novoTelefone(event)}/>

                        </label>
                        <div className=" flex justify-center">
                            <button type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Enviar</button>
                        </div>
                    </form>
                </div>
                <div className="text-center  mt-10">
                    <Link href='/' className="text-sm text-white-500">
                        Home
                    </Link>
                </div>
            </div>
            <Footer/>
        </main>
    )
}