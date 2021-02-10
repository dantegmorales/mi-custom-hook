import {useEffect, useRef, useState} from "react";

export const useFetch = (url)=>{

    const isMounted = useRef(true);
    const [state,setState]= useState({
        data:null,
        loading:true,
        error:null
    })
    useEffect(()=>{

        return()=>{
            isMounted.current=false;
            console.log('Se desmonto el componente y no hace la petición');
        }
    },[])

    useEffect(()=>{
        setState({
            data:null,
            loading:true,
            error:null
        });
        fetch(url)
        .then(resp =>resp.json())
        .then(data =>{
            setTimeout(() => {
                if (isMounted.current) {
                    console.log('Verifica si el componete esta montado');
                    setState({
                        data,
                        loading:false,
                        error:null
                    })
                }else{
                    console.log('el setState no se llamo');
                }
                
            }, 0);
            
        })
    },[url])

    return state;
}