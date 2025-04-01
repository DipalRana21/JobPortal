import react from "react";
import './style.css';
import Job from './job';

const randomJobs = [1, 2, 3]
const Browse = () => {
    return (
        <div className="main-content">
            <div className="browse-content">
                <h3 className="browse-title">Search Results {randomJobs.length} </h3>

                <div className="browse-card">
                    {
                        randomJobs.map((item, index) => {
                            return (
                                <Job />
                            )
                        })
                    }
                </div>


            </div>
        </div>

    )
}

export default Browse;