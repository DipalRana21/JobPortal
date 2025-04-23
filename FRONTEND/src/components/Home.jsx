
import React from "react";
import Navbar from "./Navbar";
import './style.css';
import useGetAllJobs from "../hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();
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
          <input className="job-inp" type="text" placeholder="find your job" />
          <button className="btn-search text-red-600"><i class="fa-solid fa-magnifying-glass"></i></button>
          
        </div>
      </header>
    </>
  );
};

export default Home;
