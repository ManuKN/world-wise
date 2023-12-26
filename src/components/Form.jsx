// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import Button from "./Button";
import Message from "./Message"
import styles from "./Form.module.css";
import ButtonBack from "./ButtonBack";
import useURLPosition from "../hooks/useURLPosition";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
/* eslint-disable */
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const[Lat , Lng] = useURLPosition();
  const[isLoadingGeocoading , setIsloadingGeocoading] = useState(false)
  const[emoji , setEmoji] = useState();
  const[geocodingError , setGeocodingError] = useState("")

const  BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
  useEffect(function(){
   async function fetchCityData(){
    try{
    if(!Lat && !Lng) return;
      setIsloadingGeocoading(true)
      setGeocodingError('')
      const res = await fetch(`${BASE_URL}?latitude=${Lat}&longitude=${Lng}`)
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
  },[Lat , Lng])

  if(geocodingError) return <Message message={geocodingError}/>
 if(!Lat && !Lat) return <Message message='Please Select the Loaction on the Map To Write Ur Memories😀📝 '/>
if(isLoadingGeocoading) return <Spinner />


  return (
    <form className={styles.form}>
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
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
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
