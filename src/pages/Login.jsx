import { useAuth } from "../Contexts/FakeAuthContext";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
//import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate()
  const{login , isAuthenticated} = useAuth()
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  //const[error , setError] = useState(false)

function handleSubmit(e){
 e.preventDefault();
 if(email && password)
 console.log(email ,password)
login(email , password)
}
useEffect(function(){
  if(isAuthenticated)
   navigate('/App',{replace:true})
  },[isAuthenticated,navigate])

// if(!isAuthenticated && setError(true))
// if(error) return <Message message='Your Credentails are Wrong🥺...Try again😉'/>
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
