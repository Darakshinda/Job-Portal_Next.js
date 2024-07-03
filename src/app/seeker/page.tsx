"use client"

// pages/page.tsx
import { useState } from 'react';
import Head from 'next/head';
import { Tags } from '@/stories/Tags';
import tagOpns from "../post/data/tags.json"

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username:'',
    email: '',
    location: '',password: '',
    countryCode: '+91',
    contactNumber: '',
    yearsOfExperience: '',
    monthsOfExperience: '',
    skills: ''
  });

  const handler = (key:string, value:string) => {
    setFormData((prevState) => {
      if (prevState[key] === value) {
        return prevState; // Prevent unnecessary state updates
      }
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Head>
        <title>Get Hired</title>
        <meta name="description" content="Let's get you hired!" />
      </Head>
      <div className="container" style={{top:0,right:0,position:"fixed",height:"100%",}}>
        <b><h1>Let's get you hired!</h1></b>
        <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
            <label>First Name*</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={{width:"80.5%",marginLeft:"2%"}} />
          </div>
          <div className="formGroup">
            <label>Last Name*</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={{width:"80.5%",marginLeft:"2%"}} />
          </div>
          <div className="formGroup">
            <label>Username*</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required style={{width:"80.5%",marginLeft:"2%"}} />
          </div>
          <div className="formGroup">
            <label>Password*</label>
            <input type="text" name="password" value={formData.password} onChange={handleChange} required style={{width:"80.5%",marginLeft:"2%"}} />
          </div>
          <div className="formGroup">
            <label>Email ID*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{width:"80.5%",marginLeft:"2%"}} />
          </div>
          <div className="formGroup">
            <label>Location*</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required style={{width:"80.5%",marginLeft:"2%"}}/>
          </div>
          <div className="formGroup">
            <label>Contact Number*</label>
            <div className="contactNumber" style={{width:"90%",}}>
              <select name="countryCode" value={formData.countryCode} onChange={handleChange}>
                <option value="+91">India +91</option>
                {/* Add other country codes as needed */}
              </select>
              <input type="tel" name="contactNumber"  pattern="[0-9]{10}" value={formData.contactNumber} onChange={handleChange} required />
            </div>
          </div>
          
          <button type="submit" className="submitButton">Find Dream Jobs</button>
        </form>
        <p>Already have an account? <a href="/login" className="loginLink">Login here</a></p>
      </div>
      <style jsx>{`
        .container {
          background-color: #1a1a1a;
          color: #fff;
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
          
          font-family: Arial, sans-serif;
          text-align: center;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .form {
          display: flex;
          flex-direction: column;
        }
        .formGroup {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
        }
        .inputContainer {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .inputContainer:not(:last-child) {
          margin-right: 10px;
        }
        label {
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
        input,
        select {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #333;
          color: #fff;
          font-size: 1rem;
        }
        .cont
        {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #333;
          color: #fff;
          font-size: 1rem;
        }

        .contactNumber {
          display: flex;
        }
        .contactNumber select {
          width: 30%;
          margin-right: 0.5rem;
        }
        .contactNumber input {
          width: 70%;
        }
        .submitButton {
          background-color: #fff;
          color: #000;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          
          
        }
        .submitButton:hover {
          background-color: #f0f0f0;
        }
        p {
          margin-top: 1rem;
        }
        .loginLink {
          color: #1e90ff;
          text-decoration: none;
        }
        .loginLink:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default Page;
