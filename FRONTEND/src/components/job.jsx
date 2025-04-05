import react from "react";
import './style.css';
import { useNavigate } from "react-router-dom";

const Job = () => {

    const navigate= useNavigate();
    const jobId= "hsdkjiy34j32"
    return (
        <div>
            <div className="job-container ">
                <div className="bookmark-div">
                <p>2 days ago</p>
                <button className="bookmark"><i className="fa-regular fa-bookmark"></i></button>
               
                </div>
               

                <div className="logo">
                    <button className="img-btn"><img src="https://www.pngplay.com/wp-content/uploads/13/Google-Logo-PNG-Photo-Image.png" className="logo-img" /></button>
                    
                    <div className="comp-detail">
                        <h3>Company Name</h3>
                        <p>India</p>
                    </div>
                </div>

                <div className="job-title">
                <h4>Title</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente sed rem dicta maxime beatae, atque exercitationem doloremque. Iusto temporibus nostrum minus.</p>
                </div>

                <div className='badge-container-jobpage'>
           <span className="badge" style={{color:"purple", background:"rgba(248, 236, 236, 0.73)"}} > 12 Positions</span>
           <span className="badge" style={{color:"red", background:"rgba(248, 236, 236, 0.73)"}}> Part time</span>
           <span className="badge" style={{color:"purple", background:"rgba(248, 236, 236, 0.73)"}}> 24 LPA</span>
                </div>

                <div className="jobdetails-btn">
                    <button onClick={()=> navigate(`/description/${jobId}`)}>Details</button>
                    <button style={{background:"purple"}}>Save For Later</button>
                </div>
            </div>

        </div>
    )
}

export default Job;