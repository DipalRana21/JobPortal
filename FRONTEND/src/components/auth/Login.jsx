import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import '../style.css';
import { useDispatch, useSelector } from "react-redux";
import { setLoading,setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login=()=>{

    const {loading,user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({

        email:"",
        password:"",
        role:"",
    });

    const changeEventHandler= (e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const submitHandler= async(e)=>{
        e.preventDefault();
  
        try {
            dispatch(setLoading(true));
            const res= await axios.post(`${USER_API_END_POINT}/login`,input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true,
            });

            if(res.data.success)
            {
                dispatch(setLoading(false));

                dispatch(setUser(res.data.user));
                
                setTimeout(() => {
                    // alert(res.data.message);
                    toast.success(res.data.message);
                    navigate("/");
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

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return(
        <div className="main-content signup">
            <div className="signup-content">
                <form onSubmit={submitHandler} className="form-signup">
                    <h2 className="signup-title">
                        Login
                    </h2>
                   

                    <div style={{marginTop:"0.5rem", marginBottom:"0.5rem", display:"flex", flexDirection:"column"}}>
                        <label style={{textAlign:"left", marginBottom:"7px"}} htmlFor="">Email</label>
                        <input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter your Email" />
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

                        <input type="radio"
                         name="role" 
                         id="r2" 
                         value="recruiter" 
                         checked= {input.role === 'recruiter'}
                        onChange={changeEventHandler}
                         style={{cursor:"pointer"}}/>
                        <label htmlFor="r2" style={{textAlign:"left", marginLeft:"5px", marginRight:"100px"}}>Recruiter</label>
                    </div>

                    {
                        loading?  (
                            <button className="btn loading-btn" disabled>
                              <span className="spinner"></span> Please wait
                            </button>
                          ) : ( <button className="signup-btn" type="submit" >Login</button>
                          )
                    }
                <div>
                    
                    <span style={{color:"blue"}}>Don't have an account? <a href="/signup">Sign Up</a></span>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Login;