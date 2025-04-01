import react from "react";
import './style.css';
import logo3 from './img/logo3.jpg';
import AppliedJobTable from "./AppliedJobTable";


const skills = ["Html", "Css", "Javascript", "Reactjs"]
const Profile = () => {

    const isResume = true
    return (
        <div>
            <div className="Profilediv main-content">
                <div className="profile-left">
                  

                <div style={{display:"flex", flexDirection:"row",alignItems:"center", gap:"21px"}}>
                <img src={logo3} alt="User" className="popup-avatar" />
                <div className="profiledes">
                
                    <h4>Full Name</h4>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat libero tempore vel esse distinctio soluta.</p>
                    </div>
                </div>
                    

                    
                    <div className="contact-wrapper">
                        <div className="contact-item">
                            <i className="fas fa-envelope" style={{fontSize: "21px"}}></i>
                            <span style={{fontSize: "15px"}}>dipal@gmail.com</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone" style={{fontSize: "21px"}}></i>
                            <span style={{fontSize: "15px"}}>2314546638</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="profile-left" style={{ marginTop: "14px" }}>Skills</h4>
                        {
                            skills.length !== 0 ? skills.map((item, index) => <button style={{
                                background: "black",
                                borderRadius: "5px",
                                color: "white",
                                margin: " 3px 3px",
                                padding: " 5px 5px"
                            }} >{item}</button>) : <span>NA</span>
                        }
                    </div>

                    <div className="resume">
                        <h4 style={{ fontSize: "bold", marginTop: "5px" }}>Resume</h4>
                        <div className="skills-container">
                        {
                            isResume ? (<a target="_blank" href="https://www.bmw.com/en/index.html" className="resume-link">  BMW</a>)
                                : (<span className="resume-na">NA</span>)
                        }
                        </div>
                    </div>



                </div>

                
               

                <button className="edit-button">
                    <i className="fas fa-pen"></i>
                </button>





            </div>
            <div className=" appliedJobTable">
                <h3 style={{ marginTop: "14px", marginBottom: "7px", display:"flex" ,marginLeft:"200px"}}>Applied Jobs</h3>

                <AppliedJobTable />

            </div>

        </div>
    )

}

export default Profile