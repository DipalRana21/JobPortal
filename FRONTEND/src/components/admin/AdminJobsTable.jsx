import React, { useEffect, useState } from "react";
import '../style.css';

import logo3 from '../img/logo3.jpg';
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {

    const [openId, setOpenId] = useState(null);

    const toggleMenu = (id) => {
        if (openId === id) {
            setOpenId(null);
        } else {
            setOpenId(id);
        }
    };

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div className="table-wrapper">
            <p className="table-caption" style={{ textAlign: "center" }}>A list of your recent posted jobs</p>
            <table className="company-table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Role</th>
                        <th>Date</th>
                        <th className="text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterJobs?.map((job) => (
                            <tr>

                                <td>{job?.company?.name}</td>
                                <td>{job?.title}</td>
                                <td>{job?.createdAt ? job?.createdAt.split("T")[0] : "N/A"}</td>

                                <td style={{ position: 'relative' }}>
                                    <div className="menu-container">
                                        <i
                                            className="fas fa-ellipsis-v menu-icon"
                                            onClick={() => toggleMenu(job._id)}
                                        ></i>

                                        {openId === job._id && (
                                            <div className="dropdown-menu">
                                                <button
                                                    onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                    className="dropdown-item"
                                                >
                                                    Edit <i className="fas fa-pen"></i>
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    className="dropdown-item"
                                                >
                                                    Applicants <i className="fas fa-eye"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>

        </div>
    )
}

export default AdminJobsTable;