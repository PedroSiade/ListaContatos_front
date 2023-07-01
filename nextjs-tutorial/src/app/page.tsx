"use client"


import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import axios from "axios";
import React from "react";
import Link from "next/link";
import { BeakerIcon } from '@heroicons/react/24/solid'


export default function Page() {
    const [valor, setValor] = useState(false);
    const[show, setShow] = useState(false);
    const [contatos, setContatos]=useState( [{
        id: 0,
        nome: '',
        email: '',
        telefone: 0}]
    )
    const [nome, setNome]=useState('');
    const [email, setEmail]=useState('');
    const [telefone, setTelefone]=useState(0);

    const baseURL = "http://localhost:3333/";

    const novoTelefone =(event: ChangeEvent<HTMLInputElement>)=>{
        const x= (event.target.value)
        setTelefone(parseInt(x))
    }
    const getContatos = async ()=>{
        try {
            const response= await  axios.get(baseURL);
            const data= response.data;
            setContatos(data)
        }

        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getContatos()
    }, [])

    const deleteContatos = async (id:number)=> {
        try {
            const response= await  axios.delete(baseURL+id);
            getContatos();
        }
        catch(error){
            console.log(error)
        }
    }

    const searchContatos = async(event: FormEvent<HTMLFormElement>, email:string)=>{
        event.preventDefault()
        try{
            const response= await  axios.get(baseURL+email);
            const data=response.data
            console.log(data)
        }
        catch (error){
            console.log(error)
        }
    }
    const pesquisar=()=>{
        if(valor===true)
            setValor(false)
        else
            setValor(true)
    }
    function click(){
        console.log("o botao foi clicado");
    }
    return (
        <main className=' h-screen'>
            <Navbar/>
            <div className="flex flex-col bg-gray-800 h-full">
                <div className=" bg-gray-800 ">
                    <div className='flex flex-row bg-gray-900'>
                        <Link href="add" className="pr-5 justify-start  hover:bg-slate-600 text-white font-bold py-2 px-4 rounded  ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                        </Link>
                        <button onClick={pesquisar} className="justify-start hover:bg-slate-600 text-white font-bold py-2 px-4 rounded  ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd"
                                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                    {valor ? (
                        <div className='flex justify-center'>
                            {/*precisa fazer a pesquisar por item*/}
                            <form onSubmit={(event)=>searchContatos(event, email)} className="w-1/5 my-2 rounded-md border-0 py-1.5 "
                                  method='search'>
                                <div className='md:flex flex-col  mb-6 justify-center'>
                                    <label htmlFor="email" className=" py-2 text-sm font-medium leading-6 text-black-900">
                                        Email: <input  className="my-1 bg-gray-800 w-full rounded-md border-0 py-1.5  text-center text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                      type="text" id="email"  onChange={(event)=>setEmail(event.target.value)
                                    } required/>
                                    </label>
                                    <button type="submit"
                                            className="my-1 rounded-md bg-indigo-800 w-full px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Pesquisar</button>
                                </div>
                            </form>
                        </div>
                    ): (
                        <p></p>
                    )
                    }
                </div>
                <h1 className="font-serif text-2xl mt-10 mb-3 px-4 rounded text-center ">Contatos:</h1>
                <div className=" flex flex-col justify-center content-center h-full pl-3  bg-gray-800">
                    <div className="w-3/4 px-10 py-10 mx-auto border border-white rounded-md space-y-1 border-radius">
                        {
                            contatos.length===0 ?
                                <p>Carregando...</p>:
                                contatos.map((contato)=>(
                                        <div>
                                            <ul>
                                                <li key={contato.id} className='flex flex-row justify-between '>
                                                    <div className='flex flex-start my-1'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="ml-2" onClick={event => {
                                                            if (show === true)
                                                                setShow(false)
                                                            else
                                                                setShow(true)
                                                        }
                                                        }>{contato.nome}</p>
                                                    </div>
                                                    {show ? (
                                                        <div>
                                                            <p>{contato.email}</p>
                                                            <p>{contato.telefone}</p>
                                                        </div>
                                                    ): (
                                                        <p></p>
                                                    )
                                                    }
                                                </li>
                                            </ul>
                                            <div className="flex justify-start">
                                                <button className="mr-2"  onClick={(event )=> deleteContatos(contato.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                                    </svg>
                                                </button>
                                                <Link  href='update'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                                                    </svg>
                                                </Link>
                                            </div>
                                            <hr className="border-dotted my-2"></hr>
                                        </div>
                                    )
                                )
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )
}
