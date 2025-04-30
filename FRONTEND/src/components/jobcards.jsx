import react from 'react';
import './style.css';
import {Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const jobcards = ({job}) => {
    const navigate=useNavigate();
return(

    <div onClick={()=>navigate(`/description/${job._id}`)} className='jobcards-container'>
        <div>
        <span  className='jobcards cname' >{job?.company?.name}</span>
        <p  className='jobcards conname'>India</p>
        </div>
        <div>
            <span  className='jobcards jobtitle'>{job?.title}</span>
            <p  className='jobcards jobdes'>{job?.description}</p>
        </div>

        <div className='badge-container'>
           <span className="badge" style={{color:"purple", background:"rgba(248, 236, 236, 0.73)"}} > {job?.position} Positions</span>
           <span className="badge" style={{color:"red", background:"rgba(248, 236, 236, 0.73)"}}> {job?.jobType}</span>
           <span className="badge" style={{color:"purple", background:"rgba(248, 236, 236, 0.73)"}}>{job?.salary}LPA</span>
        </div>
    </div>
   
)
}

export default jobcards;