import react from 'react';
import './style.css';
import {Badge } from './ui/badge';

const jobcards = () => {
return(

    <div className='jobcards-container'>
        <div>
        <span  className='jobcards cname' >Company Name</span>
        <p  className='jobcards conname'>India</p>
        </div>
        <div>
            <span  className='jobcards jobtitle'>Job Title</span>
            <p  className='jobcards jobdes'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>

        <div className='badge-container'>
           <span className="badge" style={{color:"purple", background:"rgba(248, 236, 236, 0.73)"}} > 12 Positions</span>
           <span className="badge" style={{color:"red", background:"rgba(248, 236, 236, 0.73)"}}> Part time</span>
           <span className="badge" style={{color:"purple", background:"rgba(248, 236, 236, 0.73)"}}> 24 LPA</span>
        </div>
    </div>
   
)
}

export default jobcards;