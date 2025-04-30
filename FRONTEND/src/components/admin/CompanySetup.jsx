import React, { useEffect, useState } from "react";
import '../style.css'
import { COMPANY_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {

    const params=useParams();
    useGetCompanyById(params.id);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const {singleCompany} = useSelector(store=>store.company);
    const [loading,setLoading]= useState()
    
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } 
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div>

            <div className="form-container">
                <form onSubmit={submitHandler}>
                    <div className="form-header">
                        <button
                            type="button"
                            className="btn-outline back-btn"
                            onClick={() => navigate("/admin/companies")}
                        >
                            ← Back
                        </button>
                        <h1 className="form-title">Company Setup</h1>
                    </div>

                    <div className="form-grid">
                        <div>
                            <label style={{textAlign:"left"}} className="form-label">Company Name</label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="form-input"
                            />
                        </div>
                        <div>
                            <label style={{textAlign:"left"}} className="form-label">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="form-input"
                            />
                        </div>
                        <div>
                            <label style={{textAlign:"left"}} className="form-label">Website</label>
                            <input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="form-input"
                            />
                        </div>
                        <div>
                            <label style={{textAlign:"left"}} className="form-label">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="form-input"
                            />
                        </div>
                        <div>
                            <label style={{textAlign:"left"}} className="form-label">Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="form-input"
                            />
                        </div>
                    </div>

                    {
                        loading?  (
                            <button className="btn loading-btn" disabled>
                              <span className="spinner"></span> Please wait
                            </button>
                          ) : ( <button className="signup-btn" type="submit" >Update</button>
                          )
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup;