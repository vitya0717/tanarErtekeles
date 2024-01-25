import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export const SzempontOptions = ({szempontok, setSzempontok, fetchPending, setFetchPending}) => {

    const fetchData = async () => {
        const response = await axios.get('https://localhost:7253/api/Szempont');
        await setSzempontok(response.data);
    }

    useEffect(() => {
        setFetchPending(true);
        try {
            fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setFetchPending(false);
        }
    }, [fetchPending])

    return (
       (szempontok.map((szempont) => (
       
       <option key={szempont.id} value={szempont.szempontNev}>{szempont.szempontNev+"("+szempont.szorzo+")"}</option>)))
  )
}
