import {createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const BASE_URL = 'http://localhost:9000'

const CitiesContext = createContext()

function CitiesProvider({children}) {

    CitiesProvider.propTypes = {
        children: PropTypes.node.isRequired,
      };
      /* eslint-disable */
    const[cities , setCities] = useState([])
   
const[isLoading , setIsLoading] = useState(false);

const[currentCity , setCurrentCity] = useState({});

useEffect(function(){
  async function fetchCities(){
    try{
      setIsLoading(true)
    const res = await fetch(`${BASE_URL}/cities`)
    const data = await res.json();
    setCities(data)
    }
    catch{
      alert('There was a Problem with fetching Data...☹️')
    }
    finally{
      setIsLoading(false)
    }
  }
  fetchCities();
},[])

 
    async function getCity(id){
        try{
          setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json();
        setCurrentCity(data)
        }
        catch{
          alert('There was a Problem with fetching Data...☹️')
        }
        finally{
          setIsLoading(false)
        }
    }
  return (
   <CitiesContext.Provider value={{cities , isLoading ,currentCity , getCity}}>
    {children}
   </CitiesContext.Provider>
  )
}

function useCitiesPath(){
    const context = useContext(CitiesContext)
    if(context === undefined)
    throw new Error("Use the cities hook inside of the CitiesProvider")
    return context
}

export {CitiesProvider , useCitiesPath}
