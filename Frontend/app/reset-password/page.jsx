"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import '../pages/ResetPassword.css';
import NavBar from '../components/NavBar';

const ResetPassword = () => {
  const [action, setAction] = useState("Forgot Password");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRequestToken = (e) => {
    e.preventDefault();
    // Simulate successful API response
    setTimeout(() => {
      setMessage('Reset password instructions sent to your email.');
      setAction("Reset Password");
    }, 500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Simulate successful API response
    setTimeout(() => {
      setMessage('Password reset successfully.');
      router.push('/login');  // Simulate redirect to login page
    }, 500);
  };

  return (
    
    <div className="reset-password-container">
       
      {action === "Forgot Password" ? (
        <form onSubmit={handleRequestToken}>
          <h2>Forgot Password</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Request Code</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <h2>Reset Password</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="token">Token:</label>
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ResetPassword;




/*"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import '../pages/ResetPassword.css';

const API_URL = 'https://yourapiurl.com';  // API URL'inizi burada belirtin

const ResetPassword = () => {
  const [action, setAction] = useState("Forgot Password");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRequestToken = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/Account/forgot-password`, { email });
      if (response.status === 200) {
        setMessage('Reset password instructions sent to your email.');
        setAction("Reset Password");
      } else {
        setMessage('Failed to send reset password instructions.');
      }
    } catch (error) {
      console.error('Error requesting token:', error);
      setMessage('An error occurred while requesting the reset token.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/Account/reset-password`, {
        email,
        token,
        password: newPassword,
        confirmPassword
      });

      if (response.status === 200) {
        setMessage('Password reset successfully.');
        router.push('/login');  // Başarılı olduğunda kullanıcıyı login sayfasına yönlendirin
      } else {
        setMessage('Failed to reset password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred while resetting your password.');
    }
  };

  return (
    <div className="reset-password-container">
      {action === "Forgot Password" ? (
        <form onSubmit={handleRequestToken}>
          <h2>Forgot Password</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Request Code</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <h2>Reset Password</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="token">Token:</label>
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ResetPassword;*/
