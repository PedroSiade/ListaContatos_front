'use client'
import { useRouter, usePathname, useSearchParams, useParams} from "next/navigation";
import {useEffect} from "react";
export default function UserPage({ params }: { params: { id: string } }) {
    const router= useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const url = `${pathname}?${searchParams}`
        const id2= `?${searchParams}`
        console.log(id2)
        console.log(url)
        // You can now use the current URL
        // ...
    }, [pathname, searchParams])


    searchParams
    return(
        <div>
            <button onClick={()=>{
                const i=Number(params.id)
                console.log(i)
            }
            }>Usuario:</button>
        </div>

    )
}