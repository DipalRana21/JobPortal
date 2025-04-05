import react from "react"

const JobDescription = () => {

    const isApplied = false;

    return (
        <div className="main-content jobdesbase">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <h3 className="jobdestit">Title</h3>
                    <div className='badge-container-jobpage'>
                        <span className="badge" style={{ color: "purple", background: "rgba(248, 236, 236, 0.73)" }} > 12 Positions</span>
                        <span className="badge" style={{ color: "red", background: "rgba(248, 236, 236, 0.73)" }}> Part time</span>
                        <span className="badge" style={{ color: "purple", background: "rgba(248, 236, 236, 0.73)" }}> 24 LPA</span>
                    </div>
                </div>


                <button className="apply-btn"
                    style={{ display: "flex", marginRight: "60px" }}
                    disabled={isApplied}>
                    {isApplied ? 'Already Applied' : 'Apply Now'} </button>
            </div>

            <h4 style={{ display: "flex", borderBottom: "2px solid #d1d5db", fontWeight: "500", paddingTop: "16px", paddingBottom: "16px" }}>Job Description</h4>

            <div style={{ display: "flex", flexDirection: "column",alignItems: "flex-start", marginTop: "16px", marginBottom: "16px" }}>
                <h4 className="role-heading">
                    Role: <span className="role-text">Frontend Developer</span>
                </h4>
                <h4 className="role-heading">
                    Location: <span className="role-text">Bharuch</span>
                </h4>
                <h4 className="role-heading">
                    Description: <span className="role-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident.</span>
                </h4>
                <h4 className="role-heading">
                    Experience: <span className="role-text">1 year</span>
                </h4>
                <h4 className="role-heading">
                    Salary: <span className="role-text">8 LPA</span>
                </h4>
                <h4 className="role-heading">
                    Total Applications: <span className="role-text">4</span>
                </h4>
                <h4 className="role-heading">
                    Posted Date: <span className="role-text">18/10/25</span>
                </h4>

            </div>


        </div>
    )
}

export default JobDescription