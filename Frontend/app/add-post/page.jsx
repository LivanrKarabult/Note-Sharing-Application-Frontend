"use client";
import React, { useState } from 'react';
import axios from 'axios';
import '../pages/AddPost.css';
import { useRouter } from "next/navigation";
import { NavBar } from '../components/NavBar';

const API_URL = 'https://notetrove0.azurewebsites.net';

function AddPost () {
    const [description, setDescription] = useState('');
    const [document, setDocument] = useState(''); 
    const [lessonName, setLessonName] = useState('');
    const router = useRouter();




    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted');

        const formData = new FormData();
        
        formData.append('UserName ',localStorage.getItem('userName') || 'default_user');
        formData.append('Description', description);
        formData.append('LessonName', lessonName);
        formData.append('Document', document);
        

        try {
            const token = localStorage.getItem('authToken');
            const userName=localStorage.getItem('userName');
            console.log('deneme1',userName);
            const response = await axios.post(`${API_URL}/api/Upload`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Response:', response);
            console.log('URL: ',response.config.url);
            console.log('username',userName);
            

            if (response.status === 200) {
                const data=response.data;
                const newPost = {
                    id: Date.now(),
                    username: userName,
                    description: description,
                    lessonName: lessonName,
                    document: data.document ,
                    likes: Math.floor(Math.random() * 500) + 1,
                    comments: Math.floor(Math.random() * 500) + 1,
                };
                console.log('username3',userName);
    
                const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
                localStorage.setItem('posts', JSON.stringify([...storedPosts, newPost]));
                console.log(storedPosts);
    
                setDescription('');
                setDocument(null);
                setLessonName('');
    
                router.push('/home');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

    
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            console.log('File selected:', event.target.files[0]);
            setDocument(event.target.files[0]);
        }
    };
    
    

   return (
    <div><NavBar/>
    <div className='form-container'>
        <strong><h2>Adding Post</h2></strong>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="description"> Description : </label>
                <textarea 
                 id="description"
                 value={description}
                 onChange={(event)=> setDescription(event.target.value)}required/>

            </div>
            <div className="form-group">
                <label htmlFor="lessonName">Lesson Name:</label>
                <input
                    type="text"
                    id="lessonName"
                    value={lessonName}
                    onChange={(event) => setLessonName(event.target.value)} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='document'> Select Document : </label>
                <input 
                 type="File"
                 id="document"
                 accept=".pdf,.doc,.docx,.txt,.jpeg" 
                 lang="en"
                 onChange={handleFileChange} required  />
              
            </div>
            <button type="submit" > Send </button>
        </form>
        {lessonName && (
            <div className='lesson-info'>
                <strong> Lesson Name : </strong> {lessonName}
            </div>    
        )}
        {description && (
                    <div className='description-info'>
                        <strong>Description:</strong> {description}
                    </div>
        )}


    </div>
    </div>
    
  )
}

export default AddPost;