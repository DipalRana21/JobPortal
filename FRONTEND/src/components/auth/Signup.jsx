import react,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../style.css';
import { USER_API_END_POINT } from "../utils/constant";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup=()=>{


    const navigate= useNavigate();
    // const loading= useSelector(store=>store.auth);
    const {loading,user} = useSelector(store => store.auth);

    const dispatch= useDispatch();

    const [error, setError]= useState("");
    const [input, setInput] = useState({

        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    });

    
    const changeEventHandler= (e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const changeFileHandler= (e)=>{
        setInput({...input, file: e.target.files?.[0]});
    }

    
    const submitHandler= async(e)=>{
        e.preventDefault();

        const formData= new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if(input.file)
        {
            formData.append("file",input.file);
        }
  
        try {
            dispatch(setLoading(true));
            const res= await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true,
            });

            if(res.data.success)
            {
                dispatch(setLoading(false));
                setTimeout(() => {
                    // alert(res.data.message);
                     toast.success(res.data.message);
                    navigate("/login");
                }, 100); 
            }
             
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
         } 
        
        finally{
            dispatch(setLoading(false));
        }
    }

    const [formData, setFormData]=useState({
        fullname:"",
        email:"",
        phone:"",
        password:"",
        role:"student",
        profile:null,
    });


     useEffect(()=>{
            if(user){
                navigate("/");
            }
        },[])


    
    return(
        <div className="main-content signup">
            <div className="signup-content">
                <form onSubmit={submitHandler}  className="form-signup">
                    <h2 className="signup-title">
                        Sign Up
                    </h2>
                    <div style={{marginTop:"0.5rem", marginBottom:"0.5rem", display:"flex", flexDirection:"column"}}>
                        <label style={{textAlign:"left", marginBottom:"7px"}} htmlFor="">Full Name</label>
                        <input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Enter your name" />
                    </div>

                    <div style={{marginTop:"0.5rem", marginBottom:"0.5rem", display:"flex", flexDirection:"column"}}>
                        <label style={{textAlign:"left", marginBottom:"7px"}} htmlFor="">Email</label>
                        <input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter your Email" />
                    </div>

                    <div style={{marginTop:"0.5rem", marginBottom:"0.5rem", display:"flex", flexDirection:"column"}}>
                        <label style={{textAlign:"left", marginBottom:"7px"}} htmlFor="">Phone No</label>
                        <input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} />
                    </div>

                    <div style={{marginTop:"0.5rem", marginBottom:"0.5rem", display:"flex", flexDirection:"column"}}>
                        <label style={{textAlign:"left", marginBottom:"7px"}} htmlFor="">Password</label>
                        <input type="password" name="password" value={input.password} onChange={changeEventHandler} />
                    </div>

                    <div className="signup-btns">
                        <input 
                        type="radio" 
                        name="role" 
                        id="r1" 
                        value="student" 
                        checked= {input.role === 'student'}
                        onChange={changeEventHandler}
                        style={{cursor:"pointer"}} />
                        <label htmlFor="r1" style={{textAlign:"left", marginLeft:"5px", marginRight:"5px"}}>Student</label>

                        <input 
                        type="radio"
                         name="role" 
                         id="r2" 
                         value="recruiter" 
                         checked= {input.role === 'recruiter'}
                        onChange={changeEventHandler}
                         style={{cursor:"pointer"}}/>
                        <label htmlFor="r2" style={{textAlign:"left", marginLeft:"5px", marginRight:"90px"}}>Recruiter</label>

                        <div className="signup-profile"> 
                        <label htmlFor="">Profile</label>
                        <input 
                        type="file" 
                        accept="image/*"
                         name="" id="" 
                         onChange={changeFileHandler}
                         style={{cursor:"pointer", maxWidth:"200px"}}/>
                        </div>

                    </div>


                    {
                        loading?  (
                            <button className="btn loading-btn" disabled>
                              <span className="spinner"></span> Please wait
                            </button>
                          ) : ( <button className="signup-btn" type="submit" >Sign Up</button>
                          )
                    } 
                <div>
                   
                    <span style={{color:"blue"}}>Already have an account? <a href="/login">Login</a></span>
                </div>
                </form>
            </div>


          
        </div>
    )
}

export default Signup;