import React, { useEffect, useState } from "react";
import '../style.css';

import logo3 from '../img/logo3.jpg';
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {

    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate=useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div className="table-wrapper">
            <p className="table-caption" style={{ textAlign: "center" }}>A list of your recent registered companies</p>
            <table className="company-table">
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th className="text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterCompany?.map((company) => (
                            <tr>
                                <td>
                                    <img src={company.logo} alt="Logo" className="company-logo" />
                                </td>
                                <td>{company.name}</td>
                                <td>{company.createdAt.split("T")[0]}</td>
                                <td className="text-right">
                                    <button onClick={()=> navigate(`/admin/companies/${company._id}`)} 
                                        className="edit-btn"
                                    >
                                        Edit <i className="fas fa-pen"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>

        </div>
    )
}

export default CompaniesTable;