import React from "react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import '../style.css'

const Companies= ()=>{

    const navigate= useNavigate();
    return (
        <div className="main-content com-container" style={{marginBottom:"15px"}}>
        <div className="top-bar">
            <input
                className="filter-input"
                placeholder="Filter by name"
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={()=> navigate("/admin/companies/create")} className="new-company-btn" >
                New Company
            </button>
        </div>
        <div>
            <CompaniesTable />
        </div>
    </div>
    )
}

export default Companies;