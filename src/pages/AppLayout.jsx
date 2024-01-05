import Map from "../components/Map"
import Sidebar from "../components/Sidebar"
import styles from './AppLayout.module.css'
import User from "../components/User"
//import ProtectedRoute from "./ProtectedRoute"

function AppLayout() {
  return (
    <div className={styles.app}>
      {/* <ProtectedRoute>
      </ProtectedRoute> */}
      <Sidebar />
      <Map />
      <User />
    </div>
  )
}

export default AppLayout