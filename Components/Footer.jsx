import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert(`Subscribed with email: ${email}`);
  };

  return (
    <>
      <style>
        {`
          /* Footer Container */
          .footer {
            display: flex;
            justify-content: space-between;
            padding: 20px;
            background-color: #333;
            color: #fff;
            flex-wrap: wrap; /* Ensure footer content wraps on smaller screens */
          }

          .footer .left {
            flex: 1;
            padding-left: 60px;
            margin-bottom: 20px;
          }

          .footer .left h3 {
            font-family: "Roboto Slab", serif;
            font-weight: 700;
          }

          .footer .left h2 {
            font-family: "Inria Sans", serif;
            font-weight: 400;
          }

          .footer .form {
            margin-top: 10px;
          }

          .footer .input {
            padding: 10px;
            margin-right: 10px;
            border: none;
            border-radius: 4px;
          }

          .footer .button {
            padding: 10px 15px;
            background-color: #008CBA;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .footer .section-container {
            display: flex;
            flex-direction: column;
            text-align: center;
            padding: 0px 25px;
            margin-bottom: 20px;
          }

          .footer .section-title {
            font-size: 20px;
            font-family: "Inria Sans", serif;
            font-weight: 700;
            color: white;
            margin-bottom: 15px;
          }

          .footer .link {
            font-size: 18px;
            font-family: "Inria Sans", serif;
            font-weight: 400;
            color: #CBC8C8;
            opacity: 0.5;
            margin-bottom: 10px;
            cursor: pointer;
            text-decoration: none;
          }

          /* New Container Below the Footer */
          .new-container {
            background-color: #000;
            padding: 20px;
          }

          .new-container-text {
            color: #fff;
            font-family: "Roboto Slab", serif;
            font-weight: 400;
            font-size: 16px;
            text-align: left;
            padding-left: 60px;
            margin: 0;
          }

          /* Media Queries for Responsiveness */
          @media (max-width: 768px) {
            .footer .left,
            .footer .right {
              flex: 1 1 100%; /* Stack columns on smaller screens */
              padding-left: 0;
              text-align: center;
            }

            .footer .section-container {
              padding: 0;
              margin-bottom: 10px;
            }

            .footer .button {
              padding: 12px 24px;
            }

            .new-container-text {
              padding-left: 20px;
              font-size: 14px;
            }
          }
        `}
      </style>

      <footer className="footer">
        <div className="left">
          <h3>ReturnSage</h3>
        </div>

        <div className="section-container">
          <div className="section-title">Company</div>
          <div className="link">Home</div>
          <div className="link">Features</div>
        </div>

        <div className="section-container">
          <div className="section-title">Legal</div>
          <div className="link">Privacy Policy</div>
          <div className="link">Terms of Use</div>
        </div>
      </footer>

      <div className="new-container">
        <h3 className="new-container-text">Copyright 2024 Sproutron Labs. All Rights Reserved.</h3>
      </div>
    </>
  );
};

export default Footer;
