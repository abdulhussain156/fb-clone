
import './header.css';
import React, { useState as Use, useEffect } from 'react';
import { UseStateValue } from './StateProvider';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Avatar, Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { auth, provider } from "./firebase";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { useHistory as UseHistory } from "react-router-dom";
import { actionType, actionTypes } from './reducer';


function header() {
    const history = UseHistory();
    const [{ image,username, user }, dispatch] = UseStateValue('');
    const [open, setOpen] = Use(false);

    function Drowpdown() {
        return (
            <div className="dropdown">
                <div className="dropwdown__option">
                    <Avatar src={user.photoURL||image} className="avatar"/>
                    <h2>{user.displayName}</h2>
                </div>
                <div className="line2"></div>
                <div className="dropwdown__option">
                    <MeetingRoomIcon />
                    <h3 onClick={handleAuthenticaton}>Log out</h3>
                    
                    </div>
                </div>
        );
    }

    const handleAuthenticaton = () => {
        if (user) {
            auth.signOut();
            dispatch({
                type: actionType.SET_USER,
                user: null
            });
            
        }
      }
    return (
        <div className="header">
            <div className="header__left">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                    alt="" />
                <div className="header__input">
                    <SearchIcon />
                    <input placeholder="Search Facebook" type="text"/>
                </div>
            </div>
            
            
                 <div className="header__option">
                    <div className="header__option__active">
                    <HomeIcon fontSize="large"/> 
                    </div>
                    <div className="header__option">
                        <FlagIcon fontSize="large"/>
                    </div>
                    <div className="header__option">
                        <SubscriptionsIcon fontSize="large"/>
                    </div>
                
                    <div className="header__option">
                        <StorefrontIcon fontSize="large"/>
                    </div>
                    <div className="header__option">
                        <SupervisedUserCircleIcon fontSize="large"/>
                    </div>
                </div>
            

            <div className="header__right">
                <div className="header__info">
                    <Avatar src={user.photoURL||image} />
                    <h4>{user.displayName || username}</h4>
                </div>
                <IconButton>
                    <AddIcon/>
                </IconButton>
                <IconButton>
                    <ForumIcon/>
                </IconButton>
                <IconButton>
                    <NotificationsActiveIcon/>
                </IconButton>
                <IconButton onClick={()=>setOpen(!open)}>
                    <ExpandMoreIcon />
                </IconButton>
                {open ? <Drowpdown /> :
                    ""}
            </div>
        </div>
    )
}



export default header;
