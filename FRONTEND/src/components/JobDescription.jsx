import axios from "axios";
import react, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "./utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import store from "@/redux/store";
import { toast } from "react-toastify";

const JobDescription = () => {


    const params = useParams();
    const jobId = params.id;
    const { user } = useSelector(store => store.auth);
    const { singleJob } = useSelector(store => store.job);
    const dispatch = useDispatch();

    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            console.log(res.data);
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="main-content jobdesbase">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <h3 className="jobdestit">{singleJob?.title}</h3>
                    <div className='badge-container-jobpage'>
                        <span className="badge" style={{ color: "purple", background: "rgba(248, 236, 236, 0.73)" }} > {singleJob?.position} Positions</span>
                        <span className="badge" style={{ color: "red", background: "rgba(248, 236, 236, 0.73)" }}> {singleJob?.jobType}</span>
                        <span className="badge" style={{ color: "purple", background: "rgba(248, 236, 236, 0.73)" }}> {singleJob?.salary} LPA</span>
                    </div>
                </div>


                <button onClick={isApplied ? null : applyJobHandler} className="apply-btn"
                    style={{ display: "flex", marginRight: "60px" }}
                    disabled={isApplied}>
                    {isApplied ? 'Already Applied' : 'Apply Now'} </button>
            </div>

            <h4 style={{ display: "flex", borderBottom: "2px solid #d1d5db", fontWeight: "500", paddingTop: "16px", paddingBottom: "16px" }}>Job Description</h4>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "16px", marginBottom: "16px" }}>
                <h4 className="role-heading">
                    Role: <span className="role-text">{singleJob?.title}</span>
                </h4>
                <h4 className="role-heading">
                    Location: <span className="role-text">{singleJob?.location}</span>
                </h4>
                <h4 className="role-heading">
                    Description: <span className="role-text">{singleJob?.description}</span>
                </h4>
                <h4 className="role-heading">
                    Experience: <span className="role-text">{singleJob?.experienceLevel} years</span>
                </h4>
                <h4 className="role-heading">
                    Salary: <span className="role-text">{singleJob?.salary}LPA</span>
                </h4>
                <h4 className="role-heading">
                    Total Applications: <span className="role-text">{singleJob?.applications?.length}</span>
                </h4>
                {singleJob?.createdAt && (
  <h4 className="role-heading">
    Posted Date: <span className="role-text">{singleJob?.createdAt.split('T')[0]}</span>
  </h4>
)}



            </div>



        </div>
    )
}

export default JobDescription