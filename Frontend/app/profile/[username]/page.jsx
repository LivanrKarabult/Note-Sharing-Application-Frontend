'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { NavBar } from '../../components/NavBar';
import '../../pages/ProfilePage.css';

const API_URL = 'https://notetrove0.azurewebsites.net';

const UserProfile = ({ params }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');
    const router=useRouter();
    const { username } = router.query;
    //const { username } = useParams();

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!username) return;

            try {
                const response = await axios.get(`${API_URL}/api/Upload/GetAnotherProfile`, {
                    params: { userName: username }, 
                });

                if (response.status === 200) {
                    setUserInfo(response.data);
                } else {
                    console.error('Error fetching user info:', response);
                    setError('Failed to fetch user info from API');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                setError('Error fetching user info from API');
            }
        };

        fetchUserInfo();
    }, [username]);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="profileSection">
                    <h2>{userInfo[0]?.username  || 'Unknown User'}</h2>
                    <p>{userInfo.description}</p>
                    <p>{userInfo[0]?.lessonName || 'No lesson ınfo'}</p>
                </div>
                <div className="postsSection">
                    <h3>User Documents</h3>
                    
                    { userInfo.documents.map((doc, index) => (
                        <div key={index} className="document">
                            <div className="document-header">
                                <div className="document-lessonname">{doc.lessonname}</div>
                            </div>
                            <div className="document-url">
                                <a href={doc.originalUrl} target="_blank" rel="noopener noreferrer">
                                    {doc.originalUrl}
                                </a>
                            </div>
                            <div className="document-description">{doc.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
/* {userInfo.documents && userInfo.documents.map((doc, index) => (
                        <div key={index} className="document">
                            <div className="document-header">
                                <div className="document-lessonname">{doc.lessonName}</div>
                            </div>
                            <div className="document-url">
                                <a href={doc.originalUrl} target="_blank" rel="noopener noreferrer">
                                    {doc.originalUrl}
                                </a>
                            </div>
                            <div className="document-description">{doc.description}</div>
                        </div>
                    ))} */