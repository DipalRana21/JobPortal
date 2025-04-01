import react from "react";
import './style.css';
import Navbar from './Navbar';
import FilterCard from './Filtercard';
import Job from './job'

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {
    return (

        <div className="main-content">
            <Navbar />
            <div>
                <div className="jobs" style={{ display: "flex" }}>
                    <div>
                        <FilterCard />
                    </div>
                    {
                        jobsArray.length <= 0 ? <span>Job not found</span> : (
                            <div className="innerjobs">
                                <div className="realjob">
                                {
                                jobsArray.map((item, index) => <Job />)
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