import {createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from 'prop-types';

const BASE_URL = 'http://localhost:9000'

const CitiesContext = createContext()
const initialState = {
  cities:[] , isLoading:[false] , currentCity:{} , error:'',
}
function reducer(state , action){
  switch(action.type){
     case "loading":
      return{
        ...state , isLoading:true
      }

     case "cities/fetchCities":
      return{
        ...state ,
         isLoading : false,
        cities:action.payload
      }
      case "Rejected":
      return{
        ...state , 
        isLoading:false ,
        error:action.payoad,
      }
     case "cities/GetCities":
    return{
      ...state , isLoading:false , currentCity:action.payload
    }
     case "cities/CreateCity":
      return{
        ...state , isLoading :false , cities:[...state.cities , action.payload]
      }

     case "cities/DeleteCity":
      return{
        ...state , isLoading :false , cities:state.cities.filter((city) => city.id !== action.payload )
      }
     default :
     throw new Error("Unknown Action")
  }

}

function CitiesProvider({children}) {
  const [{cities , isLoading , currentCity}, dispatch] = useReducer(reducer , initialState)

    CitiesProvider.propTypes = {
        children: PropTypes.node.isRequired,
      };
      
//     const[cities , setCities] = useState([]);
   
// const[isLoading , setIsLoading] = useState(false);

// const[currentCity , setCurrentCity] = useState({});

useEffect(function(){
  async function fetchCities(){
    try{
      dispatch({type:'loading'})
    const res = await fetch(`${BASE_URL}/cities`)
    const data = await res.json();
    dispatch({type:"cities/fetchCities" , payload:data})
    }
    catch{
      dispatch({type:"Rejected" , payload:'There was a Problem with fetching Data...☹️'})
    }
    // finally{
    //   setIsLoading(false)
    // }
  }
  fetchCities();
},[])

 
    async function getCity(id){
      if(Number(id)===currentCity.id) return;
        try{
          dispatch({type:"loading"})
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json();
       dispatch({type:"cities/GetCities" , payload:data})
        }
        catch{
          dispatch({type:'Rejected' , payload:'There was a Problem with fetching City Data...☹️'})
        }

    }

    async function createCity(newCity){
      try{
        dispatch({type:'loading'})
        const res = await fetch(`${BASE_URL}/cities`, {
          method: 'POST',
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json"
          }
        })
      const data = await res.json();
      dispatch({type:'cities/CreateCity', payload:data})
      }
      catch{
        dispatch({type:'Rejected' , payload:'There was a Problem with Creating City Data...☹️'})
      }
     
  }

  async function deleteCity(id){
    try{
      dispatch({type:'loading'})
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })
    dispatch({type:'cities/DeleteCity' , payload:id})
    }
    catch{
      dispatch({type:'Rejected' , payload:'There was a Problem with Deleting City Data...☹️'})
    }
}


  return (
   <CitiesContext.Provider value={{cities, isLoading ,currentCity , getCity ,createCity , deleteCity}}>
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
