"use client";
import React,{useState,useEffect} from 'react';
import axios from 'axios'; 
import '../pages/HomePage.css'
import { NavBar } from '../components/NavBar';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

const API_URL = 'https://notetrove0.azurewebsites.net';

function HomePage (){
    const [posts,setPosts]=useState([]);
    
    const [selectedLesson, setSelectedLesson] = useState('');
    const [nextId, setNextId] = useState(5); 
    
    const router=useRouter();
    

    useEffect(() => {

        const getRandomNumber = () => Math.floor(Math.random() * 500) + 1;

        const fakePosts=[
            {
            id:1,
            userName:'dorukYelken',
            lessonName:'History',
            document: '/assets/tarih.jpeg',
            description:'please help',
            likes:getRandomNumber(),
            comments:getRandomNumber(),
            },
            {
            id:2,
            userName:'livaKarablt',
            lessonName:'Physics',
            document: '/assets/physic.jpeg',
            description:'fizik saati',
            likes:getRandomNumber(),
            comments:getRandomNumber(),
            },
           
            
            

    ]

    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/api/Upload/MainPageGet`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
          
        }
      );

       // Endpoint'ten gelen veriler
       const apiPosts = response.data.map((post, index) => ({
        id: index + 5, 
        userName: post.username,
        lessonName: post.lessonname,
        document: post.originalUrl, 
        description: post.description,
        likes: getRandomNumber(),
        comments: getRandomNumber(),
      }));

       
  
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        
        
        

        setPosts([...fakePosts, ...apiPosts, ...storedPosts]);
        console.log('response',response);
        console.log('data',response.data);
        console.log('name',response.data[0].originalUrl);
    


      } catch (error) {
        console.error("Error fetching posts:", error);
        if (error.response.status === 401) {
          // Token geçersizse login sayfasına yönlendir
          router.push('/login');
        }
      }
    };

    fetchData();
   

      }, [router]
    ); 

    //ders seçimi değiştiğinde çağrılacak
    const handleLessonChange = (event) => {
        const lesson = event.target.value;
        setSelectedLesson(lesson);
    };
    const handleAddPost = () => {
        const newPostWithId = {
          ...newPost,
          id: nextId,
          likes: Math.floor(Math.random() * 500) + 1,
          comments: Math.floor(Math.random() * 500) + 1,
        };
        setPosts([...posts, newPostWithId]);
        setNextId(nextId + 1);
        //setNewPost({ userName: '', lessonName: '', document: '' ,description});
    };
    const handleSearchInputChange = (event) => {
      const searchText = event.target.value.toLowerCase(); 
      const filteredPosts = searchText === '' ? posts : posts.filter(post => post.userName.toLowerCase().includes(searchText));
      setPosts(filteredPosts); 
    };
    
    

    //filtrele
    const getFilteredPosts = () => {
        if (selectedLesson === '') {
          return posts; 
        } else {
            return posts.filter(post => post.lessonName.toLowerCase() === selectedLesson.toLowerCase());
        }
    };
    const handleDeletePost = (postId) => {
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    /*const handleDeletePost = async (userName, originalUrl) => {
      // Postu API'den sil
      try {
        await axios.delete(`${API_URL}/api/Upload/DeleteFile?url=${originalUrl}`);
        
        // Postu yerel depodan sil
        const updatedPosts = posts.filter(post =>  post.document !== originalUrl);
        setPosts(updatedPosts);
        console.log("Post deleted successfully.");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };*/
    const handleNewPostClick = () => {
      router.push('/add-post');
  }

   
  


    return (
      <div><NavBar/>
      <div className='home-page'>
      <div className="buttons">
        
        <button className="newpost-button" onClick={handleNewPostClick}>New Post</button>
      </div>
      <h1 className='header'>All posts are listed </h1>
      
      <div className="search-bar">{}
        <input type="text" placeholder="Please enter the user name..."  onChange={handleSearchInputChange}/>
        <button>Search</button>
    </div>
    <div className="filter-bar">
      {}
      <select id="lesson-filter" onChange={handleLessonChange}>
        <option value="">All</option>
        <option value="mathematics">Mathematics</option>
        <option value="geography">Geography</option>
        <option value="history">History</option>
        <option value='biology'>Biology</option>
        <option value='chemistry'>Chemistry</option>
        <option value='science'>Science</option>

      </select>
    </div>

    <div className="post-container">
      {getFilteredPosts().map((post, index) => (
        <div className="post" key={index}>
          <div className="post-header">
            <Link href={`/app/profile/${post.userName}/page`}>
               <span className="user-info">{post.userName || 'unknown user'} </span>
            </Link>
            
            <div className="lesson-name">{post.lessonName || 'unknown lesson'}</div>
          </div>
          
          <div className='post-image'>
                {/* Dosya URL'si resim ise */}
                {typeof post.document === 'string' && (post.document.endsWith('.jpeg') || post.document.endsWith('.png')) && (
                  <img src={post.document} alt="post image" />
                )}

                {/* Dosya URL'si PDF ise */}
                {typeof post.document === 'string' && (post.document.endsWith('.pdf') || post.document.endsWith('.docx')) && (
                  <iframe src={post.document} width="100%" height="500px"></iframe>
                )}
            </div>
          <div className="post-footer">
            
            <div className='delete'>
            <button onClick={() => handleDeletePost( post.id)}>Delete</button>
            </div>
            
          </div>
          <div className="description">
             <span className="info-text">Info </span> {post.description}
           </div>
        </div>
      ))}
    </div>
  </div>
      </div>
    
  );
};

export default HomePage;

      