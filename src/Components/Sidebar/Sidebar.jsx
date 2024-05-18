import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets/assets'
import { Context } from '../../Contex/Context'

function Sidebar() {
    const [extanded,setExtended]=useState(false)

    const {onSent,prevPromts,setRecentPrompt,newChat} = useContext(Context)
    const loadPromt = async(prompt)=>{
        setRecentPrompt(prompt)
       await onSent(prompt)
    }
  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setExtended(!extanded)} className='menu' src={assets.menu_icon} alt="" />
            <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
               {extanded ?<p>New chat</p> : null} 
            </div>
            {extanded?    <div className="recent">
                <p className="recent-title">Recent</p>
                {
                    prevPromts.map((item,index)=>(
                        <div onClick={()=>loadPromt(item)} className="recent-entry">
                        <img src={assets.message_icon} alt="" />
                        <p>{item.slice(0,8)}...</p>
                    </div>

                    ))
                }
               
            </div> : null}
        
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
               {extanded?<p>help</p> : null} 
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
               {extanded ?<p>Activity</p> : null} 
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
              {extanded?<p>Setting</p>: null}  
            </div>

        </div>
    </div>
  )
}

export default Sidebar