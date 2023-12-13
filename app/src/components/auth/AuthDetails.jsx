
import "./Login.css";
import React, {useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../../firebase";

const AuthDetails = () => { 
    const [authUser, setAuthUser] = useState(null);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => { 
            if (user) { 
                setAuthUser(user);
            } else { 
                setAuthUser(null);
            }
        })
    }, [])


    const userSignOut = () => {
        signOut(auth).then(() => { 
            console.log('User signed out')
        }).catch(error => console.log(error))
    }
    return ( 
        <div>
        {
          authUser ? (
            <>
              <p>Signed In As {authUser.email}</p>
              <button type='submit' onClick = {userSignOut}>Sign Out</button>
            </>
          ) : (
            <p>Signed out</p>
          )
        }
      </div>
    )
}

export default AuthDetails;