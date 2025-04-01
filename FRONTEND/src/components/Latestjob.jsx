import react from "react";
import Jobcards from "./jobcards";
import './style.css';
const randomjobs=[1,2,3,4,5,6,7,8];
const Latestjob = () => {
return(
    <div className="latestjob home-img">
        <h1><span style={{color:"purple"}}>Latest & Top</span> Job openings</h1>
            <div className="jobcards-content" >
                {
            randomjobs.slice(0,6).map((job,index)=><Jobcards  key={job._id} job={job}/>
            )
        }
            </div>
            
    </div>


)
}

export default Latestjob;