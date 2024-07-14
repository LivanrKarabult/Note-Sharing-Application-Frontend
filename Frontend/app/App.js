// pages/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {NavBar} from './components/NavBar';
import HomePage from './home/page';
import AddPost from './add-post/page';
import InformationPage from './information/page';
import LoginSignup from './login/page';
import VerificationPage from './verification/page';
import ConfirmPage from './confirm-email/page';
import ResetPassword from './reset-password/page';
import ProfilePage from './profile/page'

export default function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/information" element={<InformationPage/>}/>
          <Route path="/home" element={<HomePage />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login-signup" element={<LoginSignup/>}/>
          <Route path="/verification" element={<VerificationPage/>}/>
          <Route path="/confirm-email" element={<ConfirmPage/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          
        </Routes>
      </div>
    </Router>
  );
}
