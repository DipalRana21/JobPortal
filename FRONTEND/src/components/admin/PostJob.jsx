import store from "@/redux/store";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JOB_API_END_POINT } from "../utils/constant";

const companyArray = [];

const PostJob= ()=>{

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const { companies } = useSelector(store => store.company);
    const [loading, setLoading]= useState(false);
    const navigate=useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        const value = e.target.value;
        const selectedCompany = companies.find(
            (company) => company.name.toLowerCase() === value
        );
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };
    


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log(input);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="postjob-div">
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '2rem 0' }}>
  <form onSubmit={submitHandler} style={{ padding: '2rem', maxWidth: '800px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      
      <div>
        <label className="label-class">Title</label>
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={changeEventHandler}
          className="inputStyle"
        />
      </div>

      <div>
        <label className="label-class">Description</label>
        <input
          type="text"
          name="description"
          value={input.description}
          onChange={changeEventHandler}
           className="inputStyle"
        />
      </div>

      <div>
        <label className="label-class">Requirements</label>
        <input
          type="text"
          name="requirements"
          value={input.requirements}
          onChange={changeEventHandler}
           className="inputStyle"
        />
      </div>

      <div>
        <label className="label-class">Salary</label>
        <input
          type="text"
          name="salary"
          value={input.salary}
          onChange={changeEventHandler}
           className="inputStyle"
        />
      </div>

      <div>
        <label className="label-class">Location</label>
        <input
          type="text"
          name="location"
          value={input.location}
          onChange={changeEventHandler}
           className="inputStyle"
        />
      </div>

      <div>
        <label className="label-class">Job Type</label>
        <input
          type="text"
          name="jobType"
          value={input.jobType}
          onChange={changeEventHandler}
          className="inputStyle"
        />
      </div>

      <div>
        <label className="label-class">Experience Level</label>
        <input
          type="text"
          name="experience"
          value={input.experience}
          onChange={changeEventHandler}
           className="inputStyle"
        />
      </div>

      <div>
        <label className="label-class">No of Position</label>
        <input
          type="number"
          name="position"
          value={input.position}
          onChange={changeEventHandler}
           className="inputStyle"
        />
      </div>

      {companies.length > 0 && (
        <div style={{ gridColumn: 'span 2' }}>
    
          <select  onChange={selectChangeHandler} style={{display:"flex",  padding:"9px", borderRadius:"8px"}} defaultValue="">
            <option value="" disabled>Select a Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company?.name?.toLowerCase()}>{company.name}</option>
            ))}
          </select>
        </div>
      )}

    </div>

    <div style={{ marginTop: '1.5rem' }}>
      
        {
                        loading?  (
                            <button className="btn loading-btn" disabled>
                              <span className="spinner"></span> Please wait
                            </button>
                          ) : ( <button className="signup-btn" type="submit" >Post New Job</button>
                          )
                    }
    </div>

    {companies.length === 0 && (
      <p style={{ fontSize: '0.8rem', color: 'red', fontWeight: 'bold', textAlign: 'center', marginTop: '1rem' }}>
        *Please register a company first, before posting a job
      </p>
    )}
  </form>
</div>

        </div>
    )
}

export default PostJob;