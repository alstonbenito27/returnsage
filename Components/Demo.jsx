import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Features from './Features';
import RowFlex from './Rowflex';
import Footer from './Footer';

const Demo = () => {
    const [hover, setHover] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        company: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Input validation
    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address.';
        if (!formData.number) newErrors.number = 'Phone number is required.';
        else if (!/^\d{10}$/.test(formData.number)) newErrors.number = 'Invalid phone number.';
        if (!formData.company) newErrors.company = 'Company name is required.';
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

        try {
            const response = await fetch('http://localhost:5000/api/demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Your demo request has been successfully submitted!');
                navigate('/');
            } else {
                alert(result.error || 'An error occurred while submitting your demo request.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred while submitting your demo request.');
        }
    };

    const handleRedirect = () => navigate('/');

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <Navbar />

            <div style={{ padding: '100px 200px' }}>
                {/* Back Button */}
                <div
                    onClick={handleRedirect}
                    style={{
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

                {/* Flex Container */}
                <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
                    {/* Left Side */}
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: '36px', fontFamily: 'Inria Sans', color: 'black', marginBottom: '20px' }}>
                            Contact our team
                        </h1>
                        <p style={{ fontSize: '18px', fontFamily: 'Inria Sans', color: 'black', lineHeight: '1.5' }}>
                        Book a demo to learn how ReturnSage is helping brands to prevent returns.<br/><br/>
                        1 . Learn how to prevent returns and save 90% of reverse supply chain cost. <br/><br/>
                        2 . Learn how returnsage increase customer life time value.<br/><br/>
                        3 . Learn how we protect brand with advanced fraud prevention ML models.
                        </p>
                    </div>

                    {/* Right Side (Form) */}
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        {['name', 'email', 'number', 'company'].map((field, index) => (
                            <div key={index}>
                                <label
                                    htmlFor={field}
                                    style={{ fontSize: '16px', marginBottom: '5px', display: 'block' }}
                                >
                                    {`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                </label>
                                <input
                                    type={field === 'email' ? 'email' : 'text'}
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    placeholder={`Your ${field}`}
                                    style={{
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        backgroundColor: 'white',
                                        color: 'black',
                                        width: '100%',
                                    }}
                                />
                                {errors[field] && (
                                    <p style={{ color: 'red', fontSize: '12px' }}>{errors[field]}</p>
                                )}
                            </div>
                        ))}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#6CCDC7',
                                borderRadius: '5px',
                                color: 'white',
                                fontSize: '16px',
                                fontFamily: 'Inria Sans',
                                cursor: 'pointer',
                                width: '100%',
                                marginTop: '10px',
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            <Features />
            <RowFlex />
            <Footer />
        </div>
    );
};

export default Demo;
