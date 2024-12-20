import React from "react";

const PricingSection = () => {
    const pricingPlans = [
        {
            title: "Beta/Pilot",
            price: "$14.99/month",
            returnspost: "30 returns (post purchase)",
            returns: "N/A",
            features: [
                "Customized Returns",
                "Return Approval Dashboard",
                "Analytics",
                "Returns: 30 returns (post purchase)",
            ],
        },
        {
            title: "Start",
            price: "$29/month",
            returnspost: "50 returns (post purchase)",
            returns: "N/A",
            features: [
                "Bootstrap features",
                "Deep Analytics",
                "Semi automated approval",
                "Basic fraud protection",
                "Returns: 50 returns (post purchase)",
            ],
        },
        {
            title: "Premium Plan",
            price: "$149/month",
            returns: "5000 returns predictions",
            returnspost: "100 returns (post purchase)",
            features: [
                "Start features",
                "One prevention action",
                "Automated Approvals",
                "Actionable Analytics",
                "ML powered fraud prevention",
                "Returns: 5000 returns predictions",
                "Returns: 100 returns (post purchase)",
            ],
        },
        {
            title: "Enterprise Plan",
            price: "Custom Pricing",
            returns: "10000 returns predictions",
            returnspost: "200 returns (post purchase)",
            features: [
                "Grow features",
                "Customized Preventive actions",
                "AI Copilot",
                "AI/ML powered features",
                "Returns: 10000 returns predictions",
                "Returns: 200 returns (post purchase)",
            ],
        },
    ];

    // Access the email from the environment variable
    const emailAdmin = import.meta.env.EMAIL_ADMIN;
    console.log(emailAdmin); // For debugging purposes

    return (
        <>
            <style>
                {`
                    /* Section Container */
                    .pricing-section-container {
                        padding: 50px 10px;
                        background-color: #F9F9F9;
                        text-align: center;
                    }

                    /* Heading Container */
                    .heading-container {
                        margin-bottom: 40px;
                    }

                    .main-heading {
                        font-size: 36px;
                        color: #333;
                        font-family: Inria Sans;
                        font-weight: 600;
                    }

                    .sub-heading {
                        font-size: 18px;
                        color: #555;
                        font-family: Inria Sans;
                        font-weight: 300;
                        margin-top: 10px;
                    }

                    /* Pricing Cards Container */
                    .pricing-container {
                        display: flex;
                        justify-content: space-around;
                        flex-wrap: wrap;
                        gap: 20px;
                        margin-top: 20px;
                    }

                    /* Pricing Card */
                    .pricing-card {
                        width: 250px;
                        background-color: white;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 20px;
                        transition: all 0.3s ease-in-out;
                    }

                    .pricing-card:hover {
                        transform: translateY(-10px);
                    }

                    /* Plan Title */
                    .plan-title {
                        font-size: 22px;
                        font-weight: 600;
                        color: #333;
                        margin-bottom: 10px;
                    }

                    /* Plan Price */
                    .plan-price {
                        font-size: 18px;
                        font-weight: 400;
                        color: #555;
                        margin-bottom: 20px;
                    }

                    /* Separator */
                    .separator {
                        width: 100%;
                        border: none;
                        border-top: 1px solid #ddd;
                        margin-bottom: 15px;
                    }

                    /* Features List */
                    .features-list {
                        list-style: none;
                        padding: 0;
                        margin-bottom: 20px;
                        text-align: left;
                    }

                    .feature-item {
                        font-size: 14px;
                        color: #666;
                        margin-bottom: 8px;
                    }

                    /* Button */
                    .get-started-button {
                        padding: 10px 20px;
                        background-color: #000;
                        color: #fff;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                        transition: background-color 0.3s ease;
                    }

                    .get-started-button:hover {
                        background-color: #444;
                    }

                    /* Media Queries for Responsiveness */
                    @media (max-width: 768px) {
                        .pricing-card {
                            width: 100%;
                            margin-bottom: 30px;
                        }

                        .main-heading {
                            font-size: 28px;
                        }

                        .sub-heading {
                            font-size: 16px;
                        }

                        .plan-title {
                            font-size: 20px;
                        }

                        .plan-price {
                            font-size: 16px;
                        }

                        .feature-item {
                            font-size: 12px;
                        }

                        .get-started-button {
                            padding: 12px 24px;
                        }
                    }
                `}
            </style>

            <div className="pricing-section-container" id="pricing">
                {/* Section Heading */}
                <div className="heading-container">
                    <h1 className="main-heading">Plans & Pricing</h1>
                    <p className="sub-heading">No credit card required. No risk.</p>
                </div>

                {/* Pricing Cards */}
                <div className="pricing-container">
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className="pricing-card">
                            <h3 className="plan-title">{plan.title}</h3>
                            <p className="plan-price">{plan.price}</p>
                            <hr className="separator" />
                            <ul className="features-list">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="feature-item">
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="get-started-button">Get Started</button>
                        </div>
                    ))}
                </div>

                {/* Contact Link */}
                <p className="sub-heading">
    Got Questions? 
    <a 
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${import.meta.env.VITE_EMAIL_ADMIN}&subject=Inquiry&body=Hello, I have a question...`} 
        style={{ color: "blue", textDecoration: "none" }}
    >
        Contact Us
    </a>
</p>


            </div>
        </>
    );
};

export default PricingSection;
