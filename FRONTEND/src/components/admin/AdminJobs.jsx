import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style.css'
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs= ()=>{
    
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate= useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(setSearchJobByText(input));
    },[input]);

    return (
        <div className="main-content com-container" style={{marginBottom:"15px"}}>
        <div className="top-bar">
            <input
                className="filter-input"
                placeholder="Filter by name, role"
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={()=> navigate("/admin/jobs/create")} className="new-company-btn" >
                New Jobs
            </button>
        </div>
        <div>
            <AdminJobsTable />
        </div>
    </div>
    )
}

export default AdminJobs;