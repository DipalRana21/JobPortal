import React, { useState } from "react";
import "../style.css";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { toast } from "react-toastify";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [companyName, setCompanyName] = useState("");

    const registerNewCompany = async () => {
        if (!companyName?.trim()) {
            return toast.error("Company name is required!");
        }

        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName }, // ✅ match backend expectation
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="main-content company-form-container">
            <div className="company-header">
                <h1 className="company-title">Your Company Name</h1>
                <p className="company-subtitle">
                    What would you like to give your company name? You can change this later.
                </p>
            </div>

            <label className="company-label">Company Name</label>
            <input
                type="text"
                className="company-input"
                value={companyName}
                placeholder="JobHunt, Microsoft etc."
                onChange={(e) => setCompanyName(e.target.value)}
            />

            <div className="company-actions">
                <button className="btn-outline" onClick={() => navigate("/admin/companies")}>
                    Cancel
                </button>
                <button className="btn-primary" onClick={registerNewCompany}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default CompanyCreate;
