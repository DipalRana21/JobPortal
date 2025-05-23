import React, { useEffect, useState } from "react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import '../style.css'
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies= ()=>{

    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate= useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);

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