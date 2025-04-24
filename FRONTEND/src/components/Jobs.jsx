import react from "react";
import './style.css';
import Navbar from './Navbar';
import FilterCard from './Filtercard';
import Job from './job'
import { useSelector } from "react-redux";
import store from "@/redux/store";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {

    const {allJobs}= useSelector(store=>store.job);
    return (

        <div className="main-content">
            <Navbar />
            <div>
                <div className="jobs" style={{ display: "flex" }}>
                    <div>
                        <FilterCard />
                    </div>
                    {
                        allJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className="innerjobs">
                                <div className="realjob">
                                {
                                allJobs.map((job) =>  <Job key={job._id} job={job} />
                                    )
                                }
                                </div>

                            </div>
                        )
                    }




                </div>
            </div>


        </div>
    );

}

export default Jobs;