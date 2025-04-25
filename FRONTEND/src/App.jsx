import { useState } from 'react'
import './index.css';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom';
import './components/style.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Filters from './components/Filters';
import Latestjob from './components/Latestjob';
import Footer from './components/Footer';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import MockInterview from './components/MockInterview';


export default function App() {
  return (
    <Router>
      <Navbar/>
        <Routes>
         <Route path="/" element={
          <>
          <Home />
          <Filters />
          <Latestjob />

          </>
          } />

          <Route path="/mockint" element={ <MockInterview/> } />
          <Route path="/jobs" element={ <Jobs/> } />
          <Route path="/browse" element={<Browse/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/description/:id" element={<JobDescription/>} />

          <Route path="/admin/companies" element= {<Companies/>} />
          <Route path="/admin/companies/create" element= {<CompanyCreate/>} />
          <Route path="/admin/companies/:id" element= {<CompanySetup/>} />
       
        </Routes>

        
    <Footer/>
   

   
   
    </Router>
    
  );
}




