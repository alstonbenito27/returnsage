import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../src/assets/Hero.png';

const Hero = () => {
    const navigate = useNavigate();
    const lambdaURL = 'https://7q5eccos63fe7kj72ac2w42kqm0wazaf.lambda-url.ap-south-1.on.aws/';

    // Function to handle the button click for Waitlist and Demo
    const handleButtonClick = async (formType) => {
        navigate(`/${formType}`); // Navigate immediately
        try {
            const response = await fetch(lambdaURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formType }),
            });
    
            if (response.ok) {
                console.log('Data sent successfully to Lambda');
            } else {
                console.error('Failed to send data to Lambda');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <>
            <style>
                {`
                    /* General Hero Section Styling */
                    .hero {
                        width: 100vw; /* Ensures full width */
                        height: calc(100vh - 80px); /* Subtract navbar height */
                        background-color: #6CCCC7;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding-left: 80px;
                        margin: 0;
                        box-sizing: border-box;
                        overflow: hidden; /* Prevent scrollbars if content overflows */
                        padding-top: 80px; /* Add top padding to avoid overlap with the navbar */
                    }

                    .left-section {
                        padding-left: 100px;
                        color: white;
                        width: 50%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        gap: 20px;
                        padding: 0 30px; /* Add slight padding for text */
                    }

                    .left-section h1 {
                        font-size: 48px;
                        font-family: 'Inria Sans', sans-serif;
                        font-weight: 400;
                        margin: 0;
                        color: black;
                    }

                    .left-section p {
                        font-size: 20px;
                        font-family: 'Inria Sans', sans-serif;
                        font-weight: 300;
                        line-height: 1.5;
                        margin: 0;
                        color: black;
                    }

                    .buttons-container {
                        display: flex;
                        gap: 20px;
                    }

                    .button {
                        padding: 10px 20px;
                        background-color: black;
                        border: none;
                        color: white;
                        font-size: 18px;
                        font-family: 'Inria Sans', sans-serif;
                        cursor: pointer;
                        transition: all 0.3s ease-in-out;
                    }

                    .button:hover {
                        background-color: #489FD9;
                    }

                    .button-alt {
                        padding: 10px 20px;
                        background-color: #4E9490;
                        border: none;
                        color: white;
                        font-size: 18px;
                        font-family: 'Inria Sans', sans-serif;
                        cursor: pointer;
                        transition: all 0.3s ease-in-out;
                    }

                    .button-alt:hover {
                        background-color: #5cae9d;
                    }

                    /* Right Section: Image */
                    .right-section {
                        width: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .hero-image {
                        width: 650px;
                        height: auto;
                    }

                    /* Media Queries for Responsiveness */
                    @media (max-width: 1024px) {
                        .hero {
                            height: auto; /* Let the height adjust for different screen sizes */
                            flex-direction: column;
                            padding-left: 20px;
                            padding-top: 80px; /* Ensure no overlap with navbar */
                        }

                        .left-section {
                            width: 100%;
                            padding-left: 0;
                            text-align: center;
                            padding-top: 20px; /* Add space on top for mobile */
                        }

                        .right-section {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-top: 20px;
                        }

                        .hero-image {
                            width: 100%;
                            max-width: 400px;
                        }

                        .left-section h1 {
                            font-size: 36px;
                        }

                        .left-section p {
                            font-size: 16px;
                        }

                        .buttons-container {
                            flex-direction: column;
                            align-items: center;
                        }

                        .button, .button-alt {
                            width: 100%;
                            margin: 10px 0;
                        }
                    }

                    @media (max-width: 768px) {
                        .hero {
                            height: auto;
                            padding-left: 20px;
                            padding-right: 20px; /* Add some padding on the right for small screens */
                        }

                        .hero-image {
                            width: 100%;
                            max-width: 350px; /* Adjust image size for smaller screens */
                        }

                        .left-section h1 {
                            font-size: 30px;
                        }

                        .left-section p {
                            font-size: 14px;
                        }

                        .buttons-container {
                            flex-direction: column;
                            align-items: center;
                        }

                        .button, .button-alt {
                            width: 100%;
                            margin: 10px 0;
                        }
                    }

                    /* Additional mobile responsiveness to match features section width */
                    @media (max-width: 767px) {
                        .hero {
                            max-width: 100%; /* Ensure the Hero section does not exceed the screen width */
                            margin: 0 auto;
                        }

                        .left-section,
                        .right-section {
                            max-width: 100%;
                            padding-left: 15px;
                            padding-right: 15px;
                        }
                    }
                `}
            </style>

            <div className="hero">
                {/* Left Section: Text and Buttons */}
                <div className="left-section">
                    <h1>Returns AI Copilot</h1>
                    <p>
                        Our AI copilot manages e-commerce returns end-to-end with <br /> minimal human intervention and maximum efficiency.
                    </p>
                    <p>
                        Just set your return goal, then let AI run everything, saving <br /> up to 70% cost.
                    </p>
                    {/* Buttons */}
                    <div className="buttons-container">
                        <button
                            className="button"
                            onClick={() => handleButtonClick('waitlist')} // Send 'waitlist' to Lambda
                        >
                            Join the Waitlist
                        </button>
                        <button
                            className="button-alt"
                            onClick={() => handleButtonClick('demo')} // Send 'demo' to Lambda
                        >
                            Book a Demo
                        </button>
                    </div>
                </div>

                {/* Right Section: Image */}
                <div className="right-section">
                    <img
                        src={backgroundImage}
                        alt="Hero"
                        className="hero-image"
                    />
                </div>
            </div>
        </>
    );
};

export default Hero;
