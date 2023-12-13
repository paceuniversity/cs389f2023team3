import React, {useState} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserOrUpdateProfile } from "../../firebase";


export const Register = (props) => { 


    const [email, setEmail] = useState(''); 
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const signUp = (e) => { 
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            createUserOrUpdateProfile(userCredential.user.uid, {name: name, location: '', bio: '', friends: []})
            .then(() => {
                window.location.href = '/home';
            });
        })
        .catch((error) => {
            console.log(error);
        });

    }
  
    return ( 
        <>
        <div className="auth-form-container">
            <h2> Register </h2>
        <form className= "register-form" onSubmit={signUp}> 
            <label htmlFor="name"> Full name </label>
            <input value={name}
             name="name" 
             id= "name" 
             placeholder="full name:" 
             onChange= {(e) => setName(e.target.value)}/>
            <label htmlFor="email"> email</label>
            <input value= {email} 
            type= "email" 
            placeholder="myemail123@email.com" 
            onChange= {(e) => setEmail(e.target.value)}/>
            <label htmlFor="password"> password</label>
            <input value = {pass} 
            type= "password" 
            placeholder="******" 
            id="password" 
            name="password"
            onChange= {(e) => setPass(e.target.value)}
            ></input>
                <button type="submit"> Sign Up!</button>
            
       </form>
       <button className ="link-btn" onClick={() => props.onFormSwitch('login')}> If you have an account click here </button>
    
        </div>
        </>
    )
}
