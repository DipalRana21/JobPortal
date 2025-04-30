import react, { useState } from "react";
import './style.css';
import logo3 from './img/logo3.jpg';
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialogue from "./UpdateProfileDialogue";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true
const Profile = () => {

    useGetAppliedJobs();

    const [open,setOpen]=useState(false)

    const {user}=useSelector(store=>store.auth);
    
    return (
        <div>
            <div className="Profilediv main-content">
                <div className="profile-left">
                  

                <div style={{display:"flex", flexDirection:"row",alignItems:"center", gap:"21px"}}>
                <img src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}alt="User" className="popup-avatar" />
                <div className="profiledes">
                
                    <h4>{user?.fullname}</h4>
                    <p>{user?.profile?.bio}</p>
                    </div>
                </div>
                    

                    
                    <div className="contact-wrapper">
                        <div className="contact-item">
                            <i className="fas fa-envelope" style={{fontSize: "21px"}}></i>
                            <span style={{fontSize: "15px"}}>{user?.email}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone" style={{fontSize: "21px"}}></i>
                            <span style={{fontSize: "15px"}}>{user?.phoneNumber}</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="profile-left" style={{ marginTop: "14px" }}>Skills</h4>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <button style={{
                                background: "black",
                                borderRadius: "5px",
                                color: "white",
                                margin: " 3px 3px",
                                padding: " 5px 5px"
                            }} >{item}</button>) : <span>NA</span>
                        }
                    </div>

                    <div className="resume" >
                        <h4 style={{ fontSize: "bold", marginTop: "5px" , position:"relative"}}>Resume</h4>
                        <div className="skills-container">
                        {
                            isResume ? (<a target="_blank" href={user?.profile?.resume} className="resume-link">{user?.profile?.resumeOriginalName} </a>)
                                : (<span className="resume-na">NA</span>)
                        }
                        </div>
                    </div>



                </div>

                
               

                <button onClick={()=>setOpen(true)} className="edit-button">
                    <i className="fas fa-pen"></i>
                </button>





            </div>
            <div className=" appliedJobTable">
                <h3 style={{ marginTop: "14px", marginBottom: "7px", display:"flex" ,marginLeft:"200px"}}>Applied Jobs</h3>

                <AppliedJobTable />

            </div>

            <UpdateProfileDialogue open={open} setOpen={setOpen} />

        </div>
    )

}

export default Profile