
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import './style.css';

import useGetAllJobs from "../hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const Home = () => {

  useGetAllJobs();
  const {user}= useSelector(store=>store.auth);
  const navigate =  useNavigate();
  const [query, setQuery] = useState("");
  const dispatch= useDispatch();

  useEffect(()=>{
    if(user?.role === 'recruiter'){
      navigate("/admin/companies");
    }
  },[]);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
}

  return (
    <>
      <header className="header home-img">
        <div className="main-content text-center header-content">
          <span className="home-title">Job Connect</span>
          <h1 className="home-content" style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.2' }}>
            Search,Apply &<br />Get Your <span className="text">Dream Job</span>
          </h1>
        </div>
        <div className="input-area">
          <input onChange={(e) => setQuery(e.target.value)} className="job-inp" type="text" placeholder="find your job" />
          <button onClick={searchJobHandler} className="btn-search text-red-600"><i class="fa-solid fa-magnifying-glass"></i></button>
          
        </div>
      </header>
    </>
  );
};

export default Home;
