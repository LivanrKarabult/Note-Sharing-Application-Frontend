"use client";
import React ,{useState,useEffect} from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
import axios from 'axios';
//import profile_icon from '../assets/profileImg.jpeg';
import '../pages/ProfilePage.css';
import { NavBar } from '../components/NavBar';
import { useRouter } from "next/navigation";


const API_URL = 'https://notetrove0.azurewebsites.net';

const getRandomNumber = () => Math.floor(Math.random() * 500) + 1;


const fakePosts=[
    
    /*{

    id:1,
    userName:'default_user',
    lessonName:'Mathematics',
    imageUrl: '/assets/math1.jpeg',
    likes:getRandomNumber(),
    comments:getRandomNumber(),
    },*/
    
    

]

const Profile = () => {

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [document,setDocument]=useState('');
  const [firstName,setFirstName]=useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const router = useRouter();

    useEffect(() => {
        const fetchUsername = async () => {
          
          const token = localStorage.getItem('authToken');
          if (!token) {
            router.push('/login');
            return;
          }
            try {
                
                const response = await axios.get(`${API_URL}/api/Upload/Profile`,{
                  headers: {
                      
                      Authorization: `Bearer ${token}`
                  }
              });
              /*const apiPosts = response.map((post, index) => ({
                userName: post.userName,
                email: post.userEmail,
              }));*/

                if (response.status === 200) {
                  const data = response.data;
                  console.log('API response data:', data);
                  console.log(response);
                  
                  setUserName(data.userName || 'default_username');
                  setUserEmail(data.userEmail || 'default_userEmail');
                  setFirstName(data.firstName || 'default firstname');
                

                  console.log('document url',data.originalUrl);
               
                  //setPosts([...fakePosts,...apiPosts]);
                } else {
                  console.error('API response error:', response);
                  setError('Failed to fetch username from API');
                }
                const postsResponse = await axios.get(`${API_URL}/api/Upload/My-Uploads`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                if (postsResponse.status === 200) {
                  const postsData = postsResponse.data;
                  console.log('Posts Data:', postsData);
                  const userPosts = postsData.map((post, index) => ({
                    id: index + 1,
                    //document:post.document,
                    document:post.originalUrl,
                    userName: post.username,
                    lessonName: post.lessonname,
                    urlLink:post.urlLink,
                    description:post.description,
                    likes: getRandomNumber(),
                    comments: getRandomNumber(),
                  }));
                  setPosts([...fakePosts, ...userPosts]);
                  //setDocument('url:',postsData.document);
                  console.log(userPosts);
                  console.log('url',postsData.document);



                } else {
                  console.error('Error fetching posts:', postsResponse);
                  setError('Failed to fetch posts from API');
                }

                

            } catch (error) {
                console.error('Error fetching username:', error);
                setError('Error fetching username from API');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsername();

        //getProfileData();

    }, [router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
  }


   return (
    <div><NavBar/>
    <div className="container">
        
        <div className="profileSection">
          <Image 
            src="/assets/indir.jpeg" 
            alt="Profile Picture" 
            className="profilePicture" 
            width={50} 
            height={50} 
          />
      <h2>{userName}</h2>
      <p>{userEmail}</p>
      <p>Belirtilmedi</p>     
    <Link href="/information">
      <div className="editProfileButton">Edit Profile</div>
    </Link>
  </div>
      <h1 className='text'>My Uploads</h1>
      <div className="postsSection">
       
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className=',header'>
              <div className='userName'>{post.userName || 'default-user'}</div>
              <div className='lessonName'>{post.lessonName ||'default'}</div>
            </div>
            <div className='post-image'>
                {/* Dosya URL'si resim ise */}
                {post.document && post.document.endsWith('.jpeg') && (
                  <img src={post.document} alt="post image" />
                )}

                {/* Dosya URL'si PDF ise */}
                {post.document && post.document.endsWith('.pdf') && (
                  <iframe src={post.document} width="100%" height="500px"></iframe>
                )}
            </div>
            <div className="post-footer">
              <div className="like-icon" >&#x2764;</div>
              <div className="likes">{post.likes}</div>
              <div className='commment-icon'>&#x1F4AC;</div>
              <div className='comments'>{posts.comments}</div>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>

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

export default Profile;

//<p>Comments: {post.comments}</p>


/*<strong><p>{post.username}</p></strong>
            <p>{post.firstName}</p>
            <p> {post.lessonName}</p>*/


          /*  <div>
            <p>Document URL: {post.document}</p> 
            </div>
       */   

            /*<div className='post-image'>
               <img src={post.document} alt="Post Image" />
            </div>*/