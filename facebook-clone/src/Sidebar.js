import React, { useState, useEffect } from 'react';
import './sidebar.css';
import SidebarRow from './SidebarRow';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { UseStateValue } from './StateProvider';
import { actionType, actionTypes } from './reducer';
import { auth, provider } from "./firebase";


function Sidebar() {
    
    const [{ image, username, user }, dispatch] = UseStateValue('');
    
    return (
        <div className='sidebar'> 
            <SidebarRow src={user.photoURL||image}
                title={user.displayName }/>
            <SidebarRow
                Icon={LocalHospitalIcon}
                title="Covid-19 Info Center"
            />
            <SidebarRow
                Icon={EmojiFlagsIcon}
                title="Pages"
            />
            <SidebarRow
                Icon={PeopleIcon}
                title="Friends"
            />
             <SidebarRow
                Icon={ChatIcon}
                title="Messanger"
            />
             <SidebarRow
                Icon={StorefrontIcon}
                title="MarketPlace"
            />
            <SidebarRow
                Icon={VideoLibraryIcon}
                title="Videos"
            />
            <SidebarRow
                Icon={ExpandMoreOutlinedIcon}
                title="MarketPlace"
            />
        </div>
    )
}

export default Sidebar
