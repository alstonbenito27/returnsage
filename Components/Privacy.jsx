import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PrivacyPolicy = () => {
    return (
        <div style={{ backgroundColor: '#6CCCC7', minHeight: '100vh', color: 'black' }}>
            <Navbar />
            <style>
                {`
                    .privacy {
                        padding-left: 200px;
                        padding-top: 100px;
                        font-family: 'Inria Sans', sans-serif;
                        line-height: 1.6;
                        word-wrap: break-word; 
                        max-width: 1000px;
                        text-align: left;
                    }

                    .privacy h1 {
                        font-size: 36px;
                        font-weight: bold;
                    }

                    .privacy h2 {
                        font-size: 24px;
                        font-weight: bold;
                        margin-top: 20px;
                    }

                    .privacy p {
                        font-size: 20px;
                        margin-bottom: 15px;
                        text-align: justify;
                    }

                    .privacy a {
                        color: blue;
                        text-decoration: none;
                    }

                    .privacy a:hover {
                        text-decoration: underline;
                    }

                    @media (max-width: 768px) {
                        .privacy {
                            padding-left: 20px;
                            padding-right: 20px;
                            padding-top: 50px;
                        }

                        .privacy h1 {
                            font-size: 28px;
                        }

                        .privacy h2 {
                            font-size: 20px;
                        }

                        .privacy p {
                            font-size: 14px;
                        }
                    }
                `}
            </style>
            <div className="privacy">
                <h1>Privacy Policy</h1>
                <p>
                    ReturnSage helps to prevent and manage returns and exchanges. This Privacy Policy describes how personal information is
                    collected, used, and shared when you install or use the App in connection with your Shopify-supported store.
                </p>
                <h2>Personal Information the App Collects:</h2>
                <p>
                    When you install the App, we automatically access certain types of information from your Shopify account.
                </p>
                <h2>Store Details (Read Access):</h2>
                <p>Each store has a unique login requiring access to store details.</p>
                <h2>Order Details (Read/Write Access):</h2>
                <p>
                    We push tracking URLs into orders and retrieve order data to process and automate the return flow.
                </p>
                <h2>Customer Details (Read Access):</h2>
                <p>
                    We use customer data to validate when raising requests and detect fraud or risky transactions.
                </p>
                <h2>Product Details (Read Access):</h2>
                <p>
                    We use product data to display products on the dashboard and sync them with our system.
                </p>
                <p>
                    Additionally, once you have installed the App, we collect the following types of personal information from you and/or
                    your customers: shop name, customer and support email, and information about you and others who may access the App on
                    behalf of your store, such as your name, address, email address, phone number, and billing information.
                </p>
                <h2>Cookies:</h2>
                <p>
                    Cookies are small text files placed in device browsers that store preferences and facilitate and enhance your
                    experience.
                </p>
                <h2>Pixel Tags/Web Beacons:</h2>
                <p>
                    A pixel tag (also known as a web beacon) is a piece of code embedded in our Services that collects information about
                    engagement on our Services.
                </p>
                <h2>Advertising- or Targeting-Related:</h2>
                <p>
                    We may use first-party or third-party technologies to deliver content, including ads relevant to your interests, on our
                    Services or on third-party websites.
                </p>
                <h2>Delete your personal data</h2>
                <p>
                    You have the right to delete or request that we assist in deleting the personal data that we have collected about You.
                </p>
                <h2>Data Retention</h2>
                <p>
                    When you place any request or call our server end, we store all requests and responses to maintain your information for
                    our records unless and until you ask us to delete this information.
                </p>
                <h2>Changes</h2>
                <p>
                    We may update this privacy policy from time to time to reflect changes to our practices or for other operational,
                    legal, or regulatory reasons.
                </p>
                <h2>Contact Us</h2>
                <p>
                    ‍For more information about our privacy practices, if you have questions, or if you would like to make a complaint,
                    please get in touch with us by email at{' '}
                    <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${import.meta.env.VITE_EMAIL_ADMIN}&subject=Inquiry&body=Hello, I have a question...`}
                    >
                        Contact Us
                    </a>
                </p>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
