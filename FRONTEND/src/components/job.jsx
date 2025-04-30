import react from "react";
import './style.css';
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {

    const navigate= useNavigate();
    // const jobId= "hsdkjiy34j32"

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return null;
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      };
      
      console.log("job:", job);
      
    return (
        <div>
            <div className="job-container ">
                <div className="bookmark-div">
                <p>
  {job?.company?.createdAt
    ? daysAgoFunction(job.company.createdAt) === 0
      ? "Today"
      : `${daysAgoFunction(job.company.createdAt)} days ago`
    : "Not available"}
</p>



                <button className="bookmark"><i className="fa-regular fa-bookmark"></i></button>
               
                </div>
               

                <div className="logo">
                    <button className="img-btn"><img src={job?.company?.logo}  /></button>
                    
                    <div className="comp-detail">
                        <h3>{job?.company?.name}</h3>
                        <p>India</p>
                    </div>
                </div>

                <div className="job-title">
                <h4>{job?.title}</h4>
                <p>{job?.description}</p>
                </div>

                <div className='badge-container-jobpage'>
           <span className="badge" style={{color:"purple", background:"rgba(248, 236, 236, 0.73)"}} > {job?.position} Positions</span>
           <span className="badge" style={{color:"red", background:"rgba(248, 236, 236, 0.73)"}}> {job?.jobType}</span>
           <span className="badge" style={{color:"purple", background:"rgba(248, 236, 236, 0.73)"}}> {job?.salary}LPA</span>
                </div>

                <div className="jobdetails-btn">
                    <button onClick={()=> navigate(`/description/${job?._id}`)}>Details</button>
                    <button style={{background:"purple"}}>Save For Later</button>
                </div>
            </div>

        </div>
    )
}

export default Job;