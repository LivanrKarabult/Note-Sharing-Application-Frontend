
"use client";
import React, { useState } from 'react';
import '../pages/VerificationPage.css'
import NavBar from '../components/NavBar';


const VerificationPage = () => {
    const [verificationCode, setVerificationCode] = useState('');

    const handleVerificationSubmit = (event) => {
        event.preventDefault();
        console.log('Doğrulama kodu:', verificationCode);
    };

    return (
        <div className="verification-container">
            <NavBar/>
            <h2>Please enter the code sent to your e-mail.</h2>
            <form onSubmit={handleVerificationSubmit}>
                <div className="form-group">
                    <strong><label htmlFor="verificationCode">Verification Code:</label></strong>
                    <input
                        type="text"
                        id="verificationCode"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Confirm</button>
            </form>
        </div>
    );
};

export default VerificationPage;
