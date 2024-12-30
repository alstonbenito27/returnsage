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
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address.';
    if (!formData.number) newErrors.number = 'Phone number is required.';
    else if (!/^\+?\d{7,15}$/.test(formData.number)) newErrors.number = 'Invalid phone number.';
    if (!formData.company) newErrors.company = 'Company name is required.';
    return newErrors;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submission:", formData); // Log form data

    setLoading(true); // Start loading

    // Validate inputs
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      const response = await fetch(
        'https://7q5eccos63fe7kj72ac2w42kqm0wazaf.lambda-url.ap-south-1.on.aws/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, type: 1 }), // Include `type` field if needed
        }
      );

      const result = await response.json(); // Get response body as JSON
      console.log("Response from Lambda:", result); // Log the result

      if (response.ok && result.message && result.message === 'Request processed successfully!') {
        alert('Your demo request has been successfully submitted!');
        navigate('/');
      } else {
        console.error("Error in response:", result); // Log error response
        alert(result.message || 'An error occurred while submitting your demo request.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error); // Log any errors
      alert('An error occurred while submitting your demo request.');
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  // Handle redirection
  const handleRedirect = () => navigate('/');

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Navbar />

      <div
        style={{
          padding: '5vw 5vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Back Button */}
        <div
          onClick={handleRedirect}
          style={{
            marginTop: '70px',
            padding: '10px 20px',
            backgroundColor: hover ? '#5cae9d' : '#6CCDC7',
            borderRadius: '5px',
            color: 'white',
            fontSize: '20px',
            fontFamily: 'Inria Sans',
            textAlign: 'center',
            cursor: 'pointer',
            marginBottom: '20px',
            width: '100%',
            maxWidth: '200px',
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Back
        </div>

        {/* Flex Container */}
        <div
          style={{
            display: 'flex',
            gap: '5vw',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          {/* Left Side (Text) */}
          <div
            style={{
              flex: 1,
              minWidth: '280px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            <h1 style={{ fontSize: '32px', fontFamily: 'Inria Sans', color: 'black' }}>
              Contact our team
            </h1>
            <p
              style={{
                fontSize: '20px',
                fontFamily: 'Inria Sans',
                color: 'black',
                lineHeight: '1.5',
              }}
            >
              Book a demo to learn how ReturnSage is helping brands to prevent returns.
              <br />
              <br />
              1. Learn how to prevent returns and save 90% of reverse supply chain cost.
              <br />
              2. Learn how ReturnSage increases customer lifetime value.
              <br />
              3. Learn how we protect brands with advanced fraud prevention ML models.
            </p>
          </div>

          {/* Right Side (Form) */}
          <form
            onSubmit={handleSubmit}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              minWidth: '280px',
              maxWidth: '400px',
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
                  type={field === 'email' ? 'email' : field === 'number' ? 'tel' : 'text'}
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
                    width: '100%',
                    backgroundColor: '#fff', // White background
                    color: '#000', // Black text color
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
                backgroundColor: loading ? '#d3d3d3' : '#6CCDC7',
                borderRadius: '5px',
                color: 'white',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%',
              }}
              disabled={loading} // Disable button during loading
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            {/* Placeholder Styles */}
            <style>{`
              input::placeholder {
                color: #000; /* Black placeholder color */
                opacity: 0.6; /* Slightly lighter for differentiation */
              }
            `}</style>
          </form>
        </div>
      </div>

      <Features />
      <RowFlex />
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 28px;
          }
          p {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 24px;
          }
          p {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Demo;
