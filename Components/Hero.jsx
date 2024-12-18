import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../src/assets/Hero.png';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                width: '100vw', // Ensures full width
                height: 'calc(100vh - 80px)', // Subtract navbar height
                backgroundColor: '#6CCCC7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '80px',
                margin: '0',
                boxSizing: 'border-box',
                overflow: 'hidden', // Prevent scrollbars if content overflows
            }}
        >
            {/* Left Section: Text and Buttons */}
            <div
                style={{
                    paddingLeft: "100px",
                    color: 'white',
                    width: '50%', // Use half the width for text
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '0 30px', // Add slight padding for text
                }}
            >
                <h1
                    style={{
                        fontSize: '48px',
                        fontFamily: 'Inria Sans, sans-serif',
                        fontWeight: '400',
                        margin: '0',
                        color:'black',
                    }}
                >
                    Returns AI Copilot
                </h1>
                <p
                    style={{
                        fontSize: '20px',
                        fontFamily: 'Inria Sans, sans-serif',
                        fontWeight: '300',
                        lineHeight: '1.5',
                        margin: '0',
                        color:'black',
                    }}
                >
                    Our AI copilot manage e-commerce returns end-to-end with <br/>minimal human intervention and maximum efficiency.
                </p>
                <p
                    style={{
                        fontSize: '20px',
                        fontFamily: 'Inria Sans, sans-serif',
                        fontWeight: '300',
                        lineHeight: '1.5',
                        margin: '0',
                        color:'black',
                    }}
                >
                    Just set your return goal, then let AI run everything, saving <br/> up to 70% cost.
                </p>
                {/* Buttons */}
                <div style={{ display: 'flex', gap: '20px' }}>
                    <button
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white',
                            fontSize: '18px',
                            fontFamily: 'Inria Sans, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease-in-out',
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = '#489FD9')
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = 'black')
                        }
                        onClick={() => navigate('/waitlist')}
                    >
                        Join the Waitlist
                    </button>
                    <button
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4E9490',
                            border: 'none',
                            color: 'white',
                            fontSize: '18px',
                            fontFamily: 'Inria Sans, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease-in-out',
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = '#5cae9d')
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = '#4E9490')
                        }
                        onClick={() => navigate('/demo')}
                    >
                        Book a Demo
                    </button>
                </div>
            </div>

            {/* Right Section: Image */}
            <div
                style={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={backgroundImage}
                    alt="Hero"
                    style={{
                        width: '650px',
                        height: 'auto',
                    }}
                />
            </div>
        </div>
    );
};

export default Hero;
