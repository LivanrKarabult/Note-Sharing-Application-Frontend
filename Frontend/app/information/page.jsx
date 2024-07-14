
"use client";
import React,{useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import  '../pages/InformationPage.css';
import { NavBar } from "../components/NavBar";
import Image from "next/image";

const API_URL = 'https://notetrove0.azurewebsites.net';

const InformationPage = () => {
    const[fileUrl,setFileUrl] =useState(null);
    const router=useRouter();
    const [selectedLessons, setSelectedLessons] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userInfo,setUserInfo] =useState({
        name:"",
        email:"",
        birthDate:"",
        bio:"",
        selectedLEssons:[],
    })
    const lessons = [
        "Mathematics",
        "Science",
        "History",
        "Biology",
        "Chemistry",
        "Physics",
        "Literature"
    ];
    useEffect(() => {
        const fetchUserInfo = async () => {
          const token = localStorage.getItem('authToken');
          if (!token) {
            router.push('/login');
            return;
          }
    
          try {
            const response = await axios.get(`${API_URL}/api/UserInfo`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUserInfo({
              name: response.data.name,
              email: response.data.email,
              birthDate: response.data.birthDate,
              bio: response.data.bio,
              selectedLessons: response.data.selectedLessons || [],
            });
          } catch (error) {
            console.error("Error fetching user info:", error);
            if (error.response.status === 401) {
              router.push('/login');
            }
          }
        };
    
        fetchUserInfo();
      }, [router]);
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
          ...userInfo,
          [name]: value,
        });
      };

    const handleLessonChange = (lesson) => {
        setSelectedLessons(prevState => 
            prevState.includes(lesson) 
                ? prevState.filter(item => item !== lesson) 
                : [...prevState, lesson]
        );
    };
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleNewPostClick = () => {
        router.push('/add-post');
    }

    return (
        <div> <NavBar/>
        <div className='container'>
            
            <div className="header">
            <div className="profile-info">
                   <img
                    src="/assets/indir.jpeg" 
                    alt=" " className="profile-img" 
                    />
                    <h2>Profile Informations</h2>
            </div>
            <p>
                You can set preferred display name,create your profile and make other personel settings.
            </p>
            </div>
            <div className="buttons">
        
                <button className="newpost-button" onClick={handleNewPostClick}>New Post</button>
            </div>
            
            <div className="inputs"> 
                <div className="input"> 
                    <img src="/assets/person.png" alt="" />
                    <input type="text" placeholder="Edit name-surname"/>
                </div>
                
                <div className="input"> 
                    <img src="/assets/email.png" alt="" />
                    <input type="email" placeholder="Edit email"/>
                </div>   
                <div className="input"> 
                    <img src="/assets/date.png" alt="" />
                    <input type="date"placeholder="Edit birth date"/>
        
                </div>  
                <div className="input"> 
                    <img src="/assets/text.jpeg" alt="" />
                    <input type="text" placeholder="Write bio"/>
                </div>
                <div className="input">
                    <label htmlFor="lesson-select">Select Lessons:</label>
                    <div className="dropdown" onClick={toggleDropdown}>
                        <div className="dropdown-select">
                            {selectedLessons.length > 0 ? selectedLessons.join(', ') : "Select Lessons"}
                        </div>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                {lessons.map((lesson, index) => (
                                    <div key={index} className="dropdown-item" onClick={() => handleLessonChange(lesson)}>
                                        {selectedLessons.includes(lesson) ? <strong>{lesson}</strong> : lesson}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div> 
            <div className="box">
                 <div className="change-image">If you change your profile image, <span>Click Here!</span></div>
            </div>
            <div className="submit-container">
                <button type="submit"> Confirm </button>
            </div>
        </div>
        </div>
        
            
        
    );

};
export default InformationPage;