"use client";
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from '../../services/authService';
import { getHomeData } from '../../services/apiService';
import axios from 'axios';
import '../pages/LoginSignup.css'
import '../login/page';
import './page';
import Image from "next/image";
 

const API_URL = 'https://notetrove0.azurewebsites.net';
 
const LoginSignup = () => {
 
  const [action,setAction]=useState("Login");
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState([]);
  
  
  useEffect(() => {
    
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

   const handleSignUp = async () => {
    if (action === "Sign Up") {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const response = await axios.post(`${API_URL}/api/Account/register`, {
          firstName,
          lastName,
          userName,
          email,
          password,
          confirmPassword
        });
 
        if (response.status === 200) {
          console.log("User signed up:", response.data);
          const {userName} = response.data;
          console.log("selam",response.data);


          setAction("Login");
          router.push('/confirm-email');
        }
        else{
          console.error("Unexpected response status:", response.status);
          alert("Unsuccessfull");
        }
      
      } catch (error) {
        console.error("Error signing up:", error);
      }
    } else {
      setAction("Sign Up");
    }
  };
   
  const handleLogin = async () => {
    if (action === "Login") {
      try {
        const response = await axios.post(`${API_URL}/api/Account/authenticate`, {
          email,
          password
        });
        

        console.log("Response3:", response.data);
 
        if (response.status === 200) {
          const { data } = response.data;
          const { jwToken, userName } = data;
  
          console.log("User logged in:",userName);

          if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem('authToken', jwToken);
            localStorage.setItem('userName',userName)
          }

            console.log('Username:',userName);
            
            router.push('/home');

        } else {
          alert("Invalid email or password");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Invalid email or password");
      }
    } else {
      setAction("Login");
    }
  };


  const handleClick = () => {
    router.push('/reset-password');
  };
 
  return (
    <div className='container'>
     <div className="header">
      <div className="text"> {action} </div>
      <div className="underline"></div>
     </div>
     <div className="inputs">
        {action === "Sign Up" && (
          <>
            <div className="input">
            <Image src="/assets/person.png" alt="" width={24} height={24} />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <Image src="/assets/person.png" alt="" width={24} height={24} />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input">
            <Image src="/assets/person.png" alt="" width={24} height={24} />
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            
          </>
        )}
      
     <div className="input">
     <Image src="/assets/email.png" alt="" width={24} height={24} />
        <input
            type="email"
            placeholder="Users Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
     </div>   
     <div className="input">
     <Image src="/assets/password.png" alt="" width={24} height={24} />
        <input
            type="password"
            placeholder="Users Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
     </div>  
     {action === "Sign Up" && (
          <div className="input">
            <Image src="/assets/password.png" alt="" width={24} height={24} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
    
     </div>  
     {action=="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span onClick={handleClick} >Click Here!</span></div>}
     
 
     <div className="submit-container">
      <div className={action=="Login"?"submit gray":"submit"} onClick={handleSignUp}>Sign Up</div>
      <div className={action=="Sign Up"?"submit gray":"submit"} onClick={handleLogin}>Login</div>
      
      
         
 
     </div>
     
     
    </div>
  );
};

export default LoginSignup;