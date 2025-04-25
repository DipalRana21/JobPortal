import React from "react";
import '../style.css';

import logo3 from '../img/logo3.jpg';

const CompaniesTable = () => {
    return (
        <div className="table-wrapper">
            <p className="table-caption" style={{textAlign:"center"}}>A list of your recent registered companies</p>
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
                  <tr>
                            <td>
                                <img src={logo3} alt="Logo" className="company-logo" />
                            </td>
                            <td>company name</td>
                            <td>21-11-2024</td>
                            <td className="text-right">
                                <span
                                    className="edit-btn"
                                >
                                     Edit <i className="fas fa-pen"></i>
                                </span>
                            </td>
                        </tr>
                  
                </tbody>
            </table>

        </div>
    )
}

export default CompaniesTable;