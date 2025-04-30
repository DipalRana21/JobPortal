import react, { useEffect } from "react";
import './style.css';
import Job from './job';
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const randomJobs = [1, 2, 3]
const Browse = () => {

    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch=useDispatch();

    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])

    return (
        <div className="main-content">
            <div className="browse-content">
                <h3 className="browse-title">Search Results {allJobs.length} </h3>

                <div className="browse-card">
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>


            </div>
        </div>

    )
}

export default Browse;