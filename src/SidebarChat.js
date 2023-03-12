import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Demo from './Demo'
import db from './Firebase'
import"./SidebarChat.css"
function SidebarChat({id,name,addnewchat}) {
    let [seed ,setseed]= useState('')
    let [message ,setmessage]= useState('')
    useEffect(()=>{
      if(id){
        db.collection("rooms").doc(id).collection("messages").orderBy("timestamp","desc").onSnapshot(
          snapshot=>(
            setmessage(snapshot.docs.map((doc)=>doc.data()))

          )
        )
      }
    },[id])
      let createchate =()=>{
        let roomname =prompt("please enter name for chat")
        if(roomname){
          db.collection("rooms").add({
              name:roomname
            })
        }
      }
    useEffect(()=>{
         setseed(Math.floor(Math.random()*5000))
    },[])

  return !addnewchat ?(
    <Link to={`/rooms/${id}`} >
    <div className='sidebarchat'>
       <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`}/>
      <div className='sidechatbar_info'>
        <h2 className='sidechatbar_info_h2'>{name}</h2>
        <p  className='sidechatbar_info_p'>{message[0]?.message.substring(0,10)+"..."}</p>
      </div>
    </div>
    </Link>
  ):(
     <div className='sidebarchat' onClick={createchate}>
        <h2 className='headding_chat_sidebar' title='start new chat'>add new chat</h2>
     </div>
  )
}

export default SidebarChat
