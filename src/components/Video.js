// import { ReactComponent as Timg } from "../assets/icons/T.svg"
// import video from '../assets/Video/Optics-vid.mp4'
import video from '../assets/Video/output.mp4'
const Video=()=>{
    return(
        <div>
           
            <div className= "video-container">
            <video width="100%" height = "100%"  controls>
                <source src = {video} type = "video/mp4" />
                Your browser does not support the video tag.
            </video>
            </div>  
        
        </div>
    )
}

export default Video