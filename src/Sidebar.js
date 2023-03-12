import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Sidebar.css"
import { Avatar, IconButton } from '@mui/material';
import { ChatBubble, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import db from './Firebase';
import { useStateValue } from './Stateprovider';
export default function Sidebar() {
  let [{ user }]=useStateValue();
  let [rooms ,setrooms]= useState([])
  useEffect(()=>{
   let unsubscribe =  db.collection("rooms").onSnapshot(snapshot =>{
      setrooms(snapshot.docs.map(doc=>(
        {
          id:doc.id,
          data:doc.data()
        }
      )))
     })
     return ()=>{
      unsubscribe();
     }
  },[])
  return (
    <div className='sidebar'>
            <div className="sidebar_header">    
          <Link to="/"><Avatar src={ user.photoURL}/> </Link>
            <div className='sidebar__headerRight'>
              <IconButton>
                <DonutLarge/>
                </IconButton>
                <IconButton>
                 <ChatBubble/>
                 </IconButton>
                 <IconButton>
                 <MoreVert/>
                 </IconButton>
             </div>
            </div>
              <div className='sidebar_search'>
                <div className='sidebar_searchcontainer'>
                <SearchOutlined/>
                <input type="text" placeholder='search or staert new chat'></input>
                </div>
              </div>

            <div className='sidebar_chat'>
              <SidebarChat addnewchat />
               {rooms.map(room=>(
                  <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
               ) )}
            </div>
    </div>
  )
}
