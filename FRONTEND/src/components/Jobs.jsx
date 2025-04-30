import react, { useEffect, useState } from "react";
import './style.css';
import Navbar from './Navbar';
import FilterCard from './Filtercard';
import Job from './job'
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {

    const {allJobs, searchedQuery}= useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    
    useEffect(() => {
        if (searchedQuery) {

       
            const filteredJobs = allJobs.filter((job) => {

                if (typeof searchedQuery !== "string") return true;

                const query = searchedQuery.toLowerCase();

                return (
                    job.title.toLowerCase().includes(query) ||
                    job.description.toLowerCase().includes(query) ||
                    job.location.toLowerCase().includes(query) 
                    // job.salary.toLowerCase().includes(query)) 
            )
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);


    return (

        <div className="main-content">
            <Navbar />
            <div>
                <div className="jobs" style={{ display: "flex" }}>
                    <div>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className="innerjobs">
                                <div className="realjob">
                                {
                                filterJobs.map((job) =>  
                                <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                >
                                    <Job key={job._id} job={job} />
                                </motion.div>
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