import { useNavigate } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker , Popup, useMap, useMapEvent } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useCitiesPath } from '../Contexts/CitiesProvider'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import useURLPosition from '../hooks/useURLPosition'

function Map() {
  /* eslint-disable */
const[mapLat , mapLng] = useURLPosition();
/* eslint-disable */
const[mapPosition , setMapPosition] = useState([40,0])
const{cities} = useCitiesPath();
const{isLoading:isLoadingPosition , position:geoloactionPosition, getPosition} = useGeolocation();

useEffect(function(){
  if(mapLat && mapLng)
  setMapPosition([mapLat , mapLng])
} , [mapLat , mapLng])

useEffect(function(){
 if(geoloactionPosition)
 setMapPosition([geoloactionPosition.lat , geoloactionPosition.lng])
},[geoloactionPosition])
  return (
    <div className={styles.mapContainer}>
      {(!geoloactionPosition)&&
        <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Use your Location'}
      </Button>}
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city)=>( <Marker position={[city.position.lat , city.position.lng]} key={city.id}>
      <Popup>
       <span>{city.emoji}</span><h3>{city.cityName}</h3>
      </Popup>
    </Marker>))}
    <ChangeCenter position={mapPosition} />
    <DetectClick />
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position}){
  console.log("function is Working")
  const map = useMap();
  map.setView(position);
  return null
}

function DetectClick(){
  const navigate = useNavigate()
useMapEvent({
  click : e => {
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)}
})
}
export default Map


