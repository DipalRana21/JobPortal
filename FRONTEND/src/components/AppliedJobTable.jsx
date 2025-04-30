import React from "react";
import './style.css';
import { useSelector } from "react-redux";
import store from "@/redux/store";

const AppliedJobTable = () => {

    const { allAppliedJobs } = useSelector(store => store.job);
    return (
        <div style={{ marginLeft: "200px", maxWidth: "50rem" }}>
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
                        !allAppliedJobs ? (
                            <tr>
                                <td>Loading...</td> 
                            </tr>
                            
                        ) : allAppliedJobs.length === 0 ? (
                            <tr>
                                 <td colSpan={5}>
                            <div className="table-info">You haven't applied to any job yet.</div>
                          </td>
                            </tr>
                           
                            
                        ) : allAppliedJobs.map((appliedJob) => (
                            <tr key={appliedJob._id}>
                                <td>{appliedJob?.createdAt?.split("T")[0]}</td>
                                <td>{appliedJob.job?.title}</td>
                                <td>{appliedJob.job?.company?.name}</td>
                                <td className="text-right">
                                    <button  className="status-box"
  style={{
    backgroundColor: appliedJob?.status === 'rejected'
      ? '#f8d7da'      // light red
      : appliedJob?.status === 'pending'
      ? '#d6d8db'      // light gray
      : '#d4edda',     // light green
  }}
>
  {appliedJob?.status?.toUpperCase()}</button>
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

