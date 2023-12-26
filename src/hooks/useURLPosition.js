import { useSearchParams } from "react-router-dom"


function useURLPosition() {
    const[searchParams] = useSearchParams()

    const Lng = searchParams.get("lng")
    const Lat = searchParams.get("lat")
    return([Lat , Lng])
}
export default useURLPosition