// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import Button from "./Button";
import Message from "./Message"
import styles from "./Form.module.css";
import ButtonBack from "./ButtonBack";
import useURLPosition from "../hooks/useURLPosition";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCitiesPath } from "../Contexts/CitiesProvider";
import {useNavigate } from "react-router-dom";

  /* eslint-disable */
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const[lat , lng] = useURLPosition();
  const[isLoadingGeocoading , setIsloadingGeocoading] = useState(false)
  const[emoji , setEmoji] = useState();
  const[geocodingError , setGeocodingError] = useState("")
  const{createCity , isLoading} = useCitiesPath()
  const naviagte = useNavigate()

const  BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
  useEffect(function(){
   async function fetchCityData(){
    try{
    if(!lat && !lng) return;
      setIsloadingGeocoading(true)
      setGeocodingError('')
      const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
      const data = await res.json()
      console.log(data)
      setCityName(data.city || data.locality || "")
      setCountry(data.countryName)
      setEmoji(convertToEmoji(data.countryCode))
      if(!data.countryCode) throw new Error("That Does't seems like a City... Please Click somewhere Else😉")
    }
    catch(err){
     setGeocodingError(err.message)
    }
    finally{
      setIsloadingGeocoading(false)
    }
   
   }
   fetchCityData()
  },[lat , lng])

  if(geocodingError) return <Message message={geocodingError}/>
 if(!lat && !lat) return <Message message='Please Select the Loaction on the Map To Write Ur Memories😀📝 '/>
if(isLoadingGeocoading) return <Spinner />

async function handleSubmit(e){
   e.preventDefault()
  if(!cityName && !date) return;
  const newCity = {
    cityName , country , emoji , date , notes , position : {lat , lng} 
  }
   await createCity(newCity)
   naviagte('/app/cities')
}


  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" value={date} onChange={(date) => setDate(date)} selected={date} dateFormat='dd/MM/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
