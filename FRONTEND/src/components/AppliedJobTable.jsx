import React from "react";
import './style.css';

const AppliedJobTable = () => {
    return (
        <div style={{marginLeft:"200px", maxWidth:"50rem"}}>
            <table className="custom-table">
                <caption className="table-caption">A list of your applied jobs</caption>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Job Role</th>
                        <th>Company</th>
                        <th className="text-right">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [1,2].map((item, index) => (
                            <tr key={index}>
                                <td>21-11-2005</td>
                                <td>Fullstack Developer</td>
                                <td>Google</td>
                                <td className="text-right">
                                    <button className="status-btn">Selected</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AppliedJobTable;

