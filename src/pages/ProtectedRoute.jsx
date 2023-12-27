import { useNavigate } from "react-router"
import { useAuth } from "../Contexts/FakeAuthContext";
import { useEffect } from "react";
import PropTypes from 'prop-types';


function ProtectedRoute({children}) {
    ProtectedRoute.propTypes = {
        children: PropTypes.node,
      };
    const navigate = useNavigate();
    const{isAuthentication} = useAuth();

    useEffect(
        function(){
        if(!isAuthentication)
        navigate("/")
    },[isAuthentication , navigate])

  return isAuthentication ? children : null;

}

export default ProtectedRoute