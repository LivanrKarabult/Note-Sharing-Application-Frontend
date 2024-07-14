"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import '../pages/ConfirmEmail.css';

const API_URL = 'https://notetrove0.azurewebsites.net';

function ConfirmEmailPage() {
  const [userId, setUserId] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleConfirmEmail = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.get(`${API_URL}/api/Account/confirm-email?userId=${userId}&code=${code}`, {
            
          });

          if (response.data) {
            console.log('API Response:', response.data);
            
            if (response.status==200) {
              setMessage('Email confirmed successfully! Redirecting to login...');
              router.push('/login'); 
              
            } else {
              setMessage('Failed to confirm email. Please try again.');
            }
          } else {
            setMessage('No response from server. Please try again.');
          }
    } catch (error) {
        if (error.response) {
          console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
        setMessage('An error occurred. Please try again.');
      }
  };

  return (
    <div className="confirm-email-page">
      <h1>Confirm Your Email</h1>
      <form onSubmit={handleConfirmEmail}>
        <div className='form-group'>
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="code">Confirmation Code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Confirm Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ConfirmEmailPage;
