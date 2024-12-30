import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Waitlist = () => {
    const [hover, setHover] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        company: '',
        howDoYouKnow: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Lambda URL
    const lambdaURL = 'https://7q5eccos63fe7kj72ac2w42kqm0wazaf.lambda-url.ap-south-1.on.aws/'; // Replace with your Lambda function URL

    // Input validation
    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address.';
        if (!formData.number) newErrors.number = 'Phone number is required.';
        else if (!/^\d{10}$/.test(formData.number)) newErrors.number = 'Invalid phone number.';
        if (!formData.company) newErrors.company = 'Company name is required.';
        if (!formData.howDoYouKnow) newErrors.howDoYouKnow = 'This field is required.';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Include the 'type' field for Lambda (2 for Waitlist)
        const payload = { ...formData, type: 2 };

        try {
            const response = await fetch(lambdaURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload), // Send the form data to Lambda
            });

            const result = await response.json();
            if (response.ok) {
                alert('You have successfully joined the waitlist!');
                navigate('/'); // Redirect to homepage after successful submission
            } else {
                alert(result.error || 'An error occurred while submitting your information.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred while submitting your information.');
        }
    };

    const handleRedirect = () => navigate('/');

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <Navbar />

            <div className="waitlist-container">
                {/* Back Button */}
                <div
                    onClick={handleRedirect}
                    style={{
                        marginTop: '60px',
                        padding: '10px 20px',
                        backgroundColor: hover ? '#5cae9d' : '#6CCDC7',
                        borderRadius: '5px',
                        color: 'white',
                        fontSize: '20px',
                        fontFamily: 'Inria Sans',
                        textAlign: 'center',
                        cursor: 'pointer',
                        marginBottom: '20px',
                        display: 'inline-block',
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    Back
                </div>

                <div className="form-title">
                    Join the Waitlist
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="form-container">
                    {['name', 'email', 'number', 'company', 'howDoYouKnow'].map((field, index) => (
                        <div key={index}>
                            <label htmlFor={field}>
                                {field === 'howDoYouKnow'
                                    ? 'How did you hear about us?'
                                    : `Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                            </label>
                            {field === 'howDoYouKnow' ? (
                                <select
                                    name={field}
                                    id={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                >
                                    <option value="">Select an option</option>
                                    <option value="Social Media">Social Media</option>
                                    <option value="Referral">Referral</option>
                                    <option value="Advertisement">Advertisement</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                <input
                                    type={field === 'email' ? 'email' : 'text'}
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    placeholder={`Your ${field}`}
                                />
                            )}
                            {errors[field] && <p style={{ color: 'red', fontSize: '12px' }}>{errors[field]}</p>}
                        </div>
                    ))}

                    {/* Submit Button */}
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>

            <style>{`
                /* Base Styling */
                .waitlist-container {
                    padding: 100px 200px;
                    padding-top: 80px;
                }

                .form-title {
                    color: black;
                    font-family: 'Inria Sans';
                    font-weight: 400;
                    word-wrap: break-word;
                    font-size: 50px;
                    text-align: center;
                    margin-bottom: 40px;
                }

                .form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    width: 50%;
                    margin: 0 auto;
                }

                .form-container input,
                .form-container select {
                    padding: 10px;
                    font-size: 16px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    background-color: white;
                    color: black;
                    width: 100%;
                }

                .form-container button {
                    padding: 10px 20px;
                    background-color: #6CCDC7;
                    border-radius: 5px;
                    color: white;
                    font-size: 16px;
                    font-family: 'Inria Sans';
                    cursor: pointer;
                    width: 100%;
                    margin-top: 10px;
                }

                /* Media Queries for Responsiveness */
                @media (max-width: 768px) {
                    .waitlist-container {
                        padding: 20px;
                    }

                    .form-title {
                        font-size: 32px;
                        text-align: center;
                    }

                    .form-container {
                        width: 100%;
                        margin: 0;
                    }

                    .form-container input,
                    .form-container select,
                    .form-container button {
                        width: 100%;
                        font-size: 14px;
                    }

                    .form-container label {
                        font-size: 14px;
                    }
                }

                @media (max-width: 480px) {
                    .form-title {
                        font-size: 28px;
                    }

                    .form-container {
                        width: 100%;
                        padding: 0 10px;
                    }

                    .form-container input,
                    .form-container select,
                    .form-container button {
                        padding: 12px;
                        font-size: 14px;
                    }

                    .form-container label {
                        font-size: 12px;
                    }

                    .submit-button {
                        padding: 12px 24px;
                        font-size: 14px;
                    }
                }
            `}</style>
            <Footer />
        </div>
    );
};

export default Waitlist;
