import store from "@/redux/store";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { toast } from "react-toastify";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable=()=>{

    const { applicants } = useSelector(store => store.application);
    const [openId, setOpenId] = useState(null); 

    const toggleDropdown = (id) => {             // Fix 2
      setOpenId(prevId => (prevId === id ? null : id));
    };
  

    const statusHandler = async (status, id) => {
      console.log('called');
      try {
          axios.defaults.withCredentials = true;
          const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
          console.log(res);
          if (res.data.success) {
              toast.success(res.data.message);
          }
      } catch (error) {
          toast.error(error.response.data.message);
      }
  }


    return (
        <div className="applicants-div">
            <table className="custom-table">
  <caption style={{marginBottom:"9px"}}>A list of your recent applied user</caption>
  <thead>
    <tr>
      <th>FullName</th>
      <th>Email</th>
      <th>Contact</th>
      <th>Resume</th>
      <th>Date</th>
      <th className="text-right">Action</th>
    </tr>
  </thead>
  <tbody>
    {applicants?.applications?.map((item) => (
      <tr key={item._id}>
        <td>{item?.applicant?.fullname}</td>
        <td>{item?.applicant?.email}</td>
        <td>{item?.applicant?.phoneNumber}</td>
        <td>
          {item.applicant?.profile?.resume ? (
            <a
              className="resume-link"
              href={item?.applicant?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item?.applicant?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </td>
        <td>{item?.applicant?.createdAt.split("T")[0]}</td>
        <td className="action-cell">
              <div className="menu-wrapper">
                <i
                  className="fas fa-ellipsis-v" style={{cursor:"pointer"}}
                  onClick={() => toggleDropdown(item._id)}
                ></i>
                {openId === item._id && (
                  <div className="dropdown-options" >
                    {shortlistingStatus.map((status, index) => (
                      <div
                      key={index}
                      className={`dropdown-item ${status === "Accepted" ? "bg-accepted" : status === "Rejected" ? "bg-rejected" : ""}`}
                      onClick={() => statusHandler(status, item._id)}
                    >
                      {status}
                    </div>
                    
                    ))}
                  </div>
                )}
              </div>
            </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
    )
}

export  default ApplicantsTable;