import React ,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'; // Ensure the CSS file is imported
import logo3 from './img/logo3.jpg'; 
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
  const {user} = useSelector(store=>store.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  
  const logoutHandler= async()=>{
    try {
      const res= await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
      if(res.data.success)
      {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link style={{textDecorationLine:"none"}} to="/">Job Connect</Link>
        </div>
        <div className="navbar-links">

          {
            user && user.role === 'recruiter' ? (
              <>
              <Link to="/admin/companies" className="navbar-link">Companies</Link>
              <Link to="/admin/jobs" className="navbar-link">Jobs</Link>
              </>
            ) : (
              <>
               <Link to="/" className="navbar-link">Home</Link>
          <Link to="/jobs" className="navbar-link">Jobs</Link>
          <Link to="/browse" className="navbar-link">Browse</Link>
          {user && (
        <Link to="/mockint" className="navbar-link mock-link">
          Mock Interview
        </Link>
      )}
              </>
            )
          }

         
        </div>

        {
          !user?(
            <div className="navbar-login-signup">
            <Link to="/login" className="navbar-link login-nav">Login</Link>
            <Link to="/signup" className="navbar-link login-nav">Signup</Link>
    
          
            </div>
          )
          :(
            <div className="avatar-container">
          <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
            <img src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"} alt="Avatar" className="avatar-img" />
          </button>

          {isOpen && (
            <div className="popup-menu">
              <div className="popup-header">
                <img src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"} alt="User" className="popup-avatar" style={{cursor:"pointer"}} />
                <div className="popup-user-details">
                  <h4>{user?.fullname}</h4>
                  <p className="popup-bio" style={{marginTop:"5px"}}>{user?.profile?.bio}</p>
                
                </div>

              </div>
              <div className="Avatar-btn" style={{display:"flex",flexDirection:"column", gap:"5px"}}>

                {
                  user && user.role=== 'student' && (
                    <button><i className="fas fa-user"></i><Link to="/Profile" >View Profile</Link> </button>
                  )
                }
             
              
              <button onClick={logoutHandler}><i className="fas fa-sign-out-alt"></i> Logout</button>
              </div>
              

             
            </div>
          )}
        </div>
          )
        }
   
      </div>
    </nav>
  );
};

export default Navbar;
