import React ,{ useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Ensure the CSS file is imported
import logo3 from './img/logo3.jpg'; 
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {user} = useSelector(store=>store.auth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">MyWebsite</Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/jobs" className="navbar-link">Jobs</Link>
          <Link to="/browse" className="navbar-link">Browse</Link>
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
            <img src={logo3} alt="Avatar" className="avatar-img" />
          </button>

          {isOpen && (
            <div className="popup-menu">
              <div className="popup-header">
                <img src={logo3} alt="User" className="popup-avatar" style={{cursor:"pointer"}} />
                <div className="popup-user-details">
                  <h4>{user.fullname}</h4>
                  <p className="popup-bio" style={{marginTop:"5px"}}>Hello i am Dipal</p>
                
                </div>

              </div>
              <div className="Avatar-btn" style={{display:"flex",flexDirection:"column", gap:"5px"}}>
              <button><i className="fas fa-user"></i><Link to="/Profile" >View Profile</Link> </button>
              
              <button><i className="fas fa-sign-out-alt"></i> Logout</button>
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
