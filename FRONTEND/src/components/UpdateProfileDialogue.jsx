import store from "@/redux/store";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "./utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "react-toastify";


const UpdateProfileDialogue = ({ open, setOpen }) => {

    const {user}= useSelector(store=>store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email:user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill=>skill),
        file: user?.profile?.resume
    });

    const dispatch=useDispatch();

    const [loading, setLoading] = useState(false);

    // Prevent background scrolling
    useEffect(() => {
        if (open) {
          document.body.style.overflow = "hidden"; // Prevent background scrolling
        } else {
          document.body.style.overflow = "auto";
        }
    
        return () => {
            document.body.style.overflow = "auto"; // Reset on unmount
        };
      }, [open]);
    
    //   if user click outside update box then it is closed
      const handleClose = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
          setOpen(false);
        }
      };

 /*  This updates the form inputs when the user types.
It uses the name attribute to determine which field to update dynamically.
Spread operator (...prev) keeps existing input values and updates only the changed one.*/
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput( { ...input, [name]: value });
    };

    const fileChangeHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] });
    };

    const submitHandler = async (e) => {
        
        e.preventDefault();

        const formData=new FormData();
        formData.append("fullname",input.fullname);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("bio",input.bio);
        formData.append("skills",input.skills);
        
        if(input.file)
        {
            formData.append("file",input.file);
        }
        try {
            setLoading(true);
            const res= await axios.post(`${USER_API_END_POINT}/profile/update`,formData,
                {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    },
                    withCredentials: true
                }
            );
            if(res.data.success)
            {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
        finally{
            setLoading(false);
        }

        console.log(input);

            setOpen(false); // Close modal after update

    };

    return (
        open && ( // Show only if 'open' is true
            <div className="modal-overlay" onClick={handleClose}>
                {/* //Prevents clicks inside the modal from triggering the close function. */}
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>  
                    <h3 className="modal-title">Update Profile</h3>
                   
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input id="name" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="number">Phone No:</label>
                            <input id="number" name="phoneNumber" type="text" value={input.phoneNumber} onChange={changeEventHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio:</label>
                            <input id="bio" name="bio" type="text" value={input.bio} onChange={changeEventHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills">Skills:</label>
                            <input id="skills" name="skills" type="text" value={input.skills} onChange={changeEventHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="file">Resume:</label>
                            <input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} />
                        </div>

                        <div className="form-footer">
                            {loading ? (
                                <button className="btn loading-btn" disabled>
                                    <span className="spinner"></span> Please wait
                                </button>
                            ) : (
                                <button className="signup-btn" type="submit">
                                    Update
                                </button>
                            )}
                        </div>
                    </form>
                    <button className="close-btn" onClick={() => setOpen(false)}>Close</button>
                </div>
            </div>
        )
    );
};

export default UpdateProfileDialogue;


