"use client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar'; 
import App from './App';
import LoginSignup from './login/page';
import AddPost from './add-post/page';
import HomePage from './home/page';
import InformationPage from './information/page';
import VerificationPage from './verification/page';
import ProfilePage from './profile/page';


export default function Home() {
  return (
   <div>
    <LoginSignup/>
   </div>
    
  );
}
