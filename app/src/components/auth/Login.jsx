import React, {useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import firebase from "firebase/app"
export const Login = (props) => { 


    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');


    const signIn = (e) => { 
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
        });

    }

 
    return ( 
    <>
    <div className="auth-form-container">
        <h2> Login Here </h2>
        <form className= "login-form" onSubmit={signIn}> 
            <label htmlFor="email"> email</label>
            
            <input 
                value= {email} 
                type= "email" 
                placeholder="myemail123@email.com" 
                onChange= {(e) => setEmail(e.target.value)}/>
            <label htmlFor="password"> password</label>
            <input
                value = {password} 
                type= "password"
                placeholder="******"
                id="password" 
                name="password"
                onChange= {(e) => setPassword(e.target.value)}/>
            <button type="submit"> Log In</button>
       </form>
       <button className="link-btn" onClick={() => props.onFormSwitch('register')}> If you don't have an account register here! </button>
    
    </div>
    </>

    )
}

export default Login;