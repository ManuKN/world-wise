import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import {CitiesProvider} from "./Contexts/CitiesProvider"
import { AuthProvider } from "./Contexts/FakeAuthContext"
import { Suspense, lazy } from "react"
import SpinnerFullPage from "./components/SpinnerFullPage"
// import Product from "./pages/Product"
// import Pricing from "./pages/pricing"
// import Homepage from "./pages/Homepage"
// import PageNotFound from "./pages/PageNotFound"
// import AppLayout from "./pages/AppLayout"
// import Login from "./pages/Login"
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"))
const Pricing = lazy(() => import("./pages/pricing"))
const Login = lazy(()=> import("./pages/Login"))
const AppLayout = lazy(()=>import("./pages/AppLayout"))
const PageNotFound = lazy(()=> import("./pages/PageNotFound"))


function App() {

  return (
    <CitiesProvider>
      <AuthProvider>
   <BrowserRouter>
   <Suspense fallback={<SpinnerFullPage />}>
   <Routes>
    <Route index element={<Homepage />}/>
    <Route path="Product" element={<Product />}/>
    <Route path="Pricing" element={<Pricing />}/>
    <Route path="Login" element={<Login />}/>
    <Route path="App" element={<AppLayout /> }>
      <Route index element={<Navigate replace to='cities' />}/>
      <Route path="cities" element={<CityList />}/>
      <Route path="cities/:id" element={<City />}/>
      <Route path="countries" element={<CountryList />}/>
      <Route path="form" element={<Form />}/>
    </Route>
    <Route path="*" element={<PageNotFound />}/>
   </Routes>
   </Suspense>
   </BrowserRouter>
   </AuthProvider>
   </CitiesProvider>)
}

export default App