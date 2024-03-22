import React from 'react'
import '../App.css'
import SaveModalLogo from '../assets/icons/SaveModalLogo.png'
const SaveModal =({open})=>{
    if(!open) return null
    return (
        <div className='flex flex-row overlay'>
            <div classname = "SaveModalContainer">
                <img src ={SaveModalLogo} alt =""/>
                <div className='content'>
                    <h2>Graph Data Download started</h2>
                     </div>
            </div>
        </div>
    )
}

export default SaveModal