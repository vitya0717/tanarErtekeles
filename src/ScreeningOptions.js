import axios from 'axios'
import React, { useEffect } from 'react'

const ScreeningOptions = ({tanarok, setTanarok, fetchPending, setFetchPending}) => {

    const fetchData = async () => {
        const response = await axios.get('https://localhost:7253/api/Screening');
        await setTanarok(response.data);
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
       (tanarok.map((tanar) => <option key={tanar.id} value={tanar.nev}>{tanar.nev}</option>))
  )
}

export default ScreeningOptions