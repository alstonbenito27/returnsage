import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Waitlist = () => {
    const [hover, setHover] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        company: '',
        howDoYouKnow: '',
        countryCode: '1', // Default country code
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const lambdaURL = import.meta.env.VITE_LAMBDA_FUNCTION; // Use the environment variable

    // Validation function
    const validate = () => {
        const newErrors = {};
        
        // Validate Name
        if (!formData.name) newErrors.name = 'Name is required.';
        
        // Validate Email
        if (!formData.email) newErrors.email = 'Email is required.';
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = 'Invalid email address.';
        
        // Validate Phone Number
        if (!formData.number) newErrors.number = 'Phone number is required.';
        
        // Validate Company Name
        if (!formData.company) newErrors.company = 'Company name is required.';
        
        // Validate How Did You Hear About Us
        if (!formData.howDoYouKnow) newErrors.howDoYouKnow = 'This field is required.';
        
        return newErrors;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (value, countryData) => {
        setFormData((prev) => ({
            ...prev,
            number: value,
            countryCode: countryData?.dialCode || '1', // Default to '1' (US) if not specified
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Prepend the country code to the phone number
        const fullPhoneNumber = `+${formData.countryCode}${formData.number}`;

        try {
            const response = await fetch(lambdaURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, number: fullPhoneNumber, type: 2 }), // Use full phone number
            });
            const result = await response.json();

            if (response.ok) {
                alert('You have successfully joined the waitlist!');
                navigate('/');
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
                <div className="form-title">Join the Waitlist</div>
                <form onSubmit={handleSubmit} className="form-container">
                    <div>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            style={{ backgroundColor: 'white', color: 'black' }}
                        />
                        {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            style={{ backgroundColor: 'white', color: 'black' }}
                        />
                        {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="number">Your Phone Number</label>
                        <PhoneInput
                            country="us"
                            value={formData.number}
                            onChange={handlePhoneChange}
                            containerStyle={{
                                width: '100%',
                                display: 'flex', // Use flex to align elements
                            }}
                            inputStyle={{
                                width: '100%',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                padding: '10px',
                                fontSize: '16px',
                                backgroundColor: 'white',
                                color: 'black',
                                marginLeft: '35px', // Add left margin to create space between country code dropdown and input
                            }}
                            buttonStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                            dropdownStyle={{
                                backgroundColor: 'white',
                                color: 'black',
                            }}
                        />

                        {errors.number && <p style={{ color: 'red', fontSize: '12px' }}>{errors.number}</p>}
                    </div>
                    <div>
                        <label htmlFor="company">Your Company</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Company"
                            style={{ backgroundColor: 'white', color: 'black' }}
                        />
                        {errors.company && <p style={{ color: 'red', fontSize: '12px' }}>{errors.company}</p>}
                    </div>
                    <div>
                        <label htmlFor="howDoYouKnow">How Did You Hear About Us?</label>
                        <select
                            name="howDoYouKnow"
                            id="howDoYouKnow"
                            value={formData.howDoYouKnow}
                            onChange={handleChange}
                            style={{ backgroundColor: 'white', color: 'black' }}
                        >
                            <option value="">Select an option</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Referral">Referral</option>
                            <option value="Advertisement">Advertisement</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.howDoYouKnow && <p style={{ color: 'red', fontSize: '12px' }}>{errors.howDoYouKnow}</p>}
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
            <Footer />
            <style>{`
                .waitlist-container {
                    padding: 100px 200px;
                }
                .form-title {
                    color: black;
                    font-family: 'Inria Sans';
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
                    width: 100%;
                    background-color: white;
                    color: black;
                }
                .form-container button {
                    padding: 10px;
                    background-color: #6CCDC7;
                    border-radius: 5px;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                }
                @media (max-width: 768px) {
                    .waitlist-container {
                        padding: 20px;
                    }
                    .form-title {
                        font-size: 32px;
                    }
                    .form-container {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default Waitlist;
