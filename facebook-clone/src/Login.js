import React, { useState, useEffect } from 'react';
import './login.css';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { auth, provider,storage } from "./firebase";
import { UseStateValue } from './StateProvider';
import { actionType, actionTypes } from './reducer';
import firebase from 'firebase';

function Login() {

    const [{}, dispatch] = UseStateValue('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [open, setOpen] = React.useState(false);
    const [profilepic, setprofilepic] = useState(null);

    const signUp = (event) => {
        event.preventDefault();
    
        auth
          .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                
            dispatch({
                type: actionType.SET_USER,
                user: result.user,
                username: username,
                image:profilepic
            });
            storage.ref('users/'+result.user.uid+ '/profile.jpg').put(profilepic).then(function () {
                console.log('successfully uploaded')
            })
            result.user.updateProfile({
                displayName: username,
                
            })
                result.user.updateProfile({
                photoURL:profilepic
              })

            console.log(result.user);
        })
          .catch((error) => alert(error.message))
        
    }

    auth.onAuthStateChanged(user => {
        if (user) {
            storage.ref('users/' + user.uid + '/profile.jpg').getDownloadURL().then(imgUrl => {
                dispatch({
                    type: actionType.SET_USER,
                    user: user,
                    username: user.displayName,
                    image:imgUrl
                });
            })
        }
    })

    const signIn = (event) => {
        event.preventDefault();
    
        auth
            .signInWithEmailAndPassword(email, password)
            .then(result => {

                dispatch({
                    type: actionType.SET_USER,
                    user: result.user,
                });

                console.log(result.user);
            })
          .catch((error) => alert(error.message))
        
        
      }

    const signInwithGoogle = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {

                dispatch({
                    type: actionType.SET_USER,
                    user: result.user,
                    username: result.displayName,
                    image:result.photoURL
                });

                console.log(result.user);
            })
            .catch(error => alert(error.message));
    };
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
    };
    
    
    const fileselect = (event) => {
        setprofilepic(event.target.files[0]);
    }
    return (
        
        <div className="login">
            <div className="login__box">
                <form className="login__form">
                <img className="logo1"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                        alt="" />
                    <img className="logo2"
                    src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                        alt="" />
                    <input
                        type="text"
                        placeholder="Email Address" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    <input
                        type="password"
                        placeholder="Password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                   
                    <Button
                        className="login__button"
                        type="submit"
                    onClick={signIn}>
                        Login
                        </Button>
                    <div className="line"></div>
                    <Button onClick={handleOpen} className="login__register">Create New Account</Button>
                    
                </form>
                
            </div>
                <div>
                        <Modal
                            open={open}
                            onClose={()=>setOpen(false)}  
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                           <div className="register__modal">
                                <form className="register__form">
                                    <h2>Sign Up Form</h2>
                                    <input
                                        type="text"
                                        placeholder="User Name" 
                                        value={username}
                                        onChange={(e)=>setUsername(e.target.value)}
                                        />
                                    <input
                                        type="text"
                                        placeholder="Email Address" 
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        />
                                    <input
                                        type="password"
                                        placeholder="Password" 
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        />
                                        
                                        <input
                                            type="file"
                                            name="file"
                                            onChange={fileselect}
                                        />
                                
                                    <div className="line"></div>
                                    <Button onClick={signUp} className="login__register">Create New Account</Button>
                                    <div className="line"></div>
                                    <Button onClick={signInwithGoogle} className="login__google">Sign Up with Google</Button>
                                </form>
                                
                            </div>
                        </Modal>
                
                 </div>
            
            
        </div>
        
    )
}

export default Login
