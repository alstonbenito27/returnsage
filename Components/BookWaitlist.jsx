import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

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

        try {
            const response = await fetch('http://localhost:5000/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
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

                <div style={{ ...commonTextStyles, fontSize: 50, paddingLeft:'35%' }}>
                    Join the Waitlist
                </div>
                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        width: '50%',
                        margin: '0 auto',
                    }}
                >
                    {['name', 'email', 'number', 'company', 'howDoYouKnow'].map((field, index) => (
                        <div key={index}>
                            <label htmlFor={field} style={{ fontSize: '16px', marginBottom: '5px', display: 'block' }}>
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
                                    style={{
                                        padding: '10px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                backgroundColor: 'white',
                                color: 'black',
                                width: '100%',
                                    }}
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
                                    style={{
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        backgroundColor: 'white',
                                        color: 'black',
                                        width: '100%',
                                        caretColor: 'black', // Ensures the cursor is visible
                                    }}
                                    onFocus={(e) =>
                                        (e.target.style.borderColor = '#6CCDC7') // Highlight border on focus
                                    }
                                    onBlur={(e) =>
                                        (e.target.style.borderColor = '#ccc') // Reset border on blur
                                    }
                                />

                            )}
                            {errors[field] && <p style={{ color: 'red', fontSize: '12px' }}>{errors[field]}</p>}
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
    );
};
const commonTextStyles = {
    color: 'black',
    fontFamily: 'Inria Sans',
    fontWeight: '400',
    wordWrap: 'break-word',
};
export default Waitlist;
