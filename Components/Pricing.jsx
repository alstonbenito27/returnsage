import React from "react";

const PricingSection = () => {
    const pricingPlans = [
        {
            title: "Beta/Pilot",
            price: "$14.99/month",
            returnspost:"30 returns (post purchase)",
            returns:"N/A",  // Add return field if needed
            features: [
                "Customized Returns", 
                "Return Approval Dashboard", 
                "Analytics",
                "Returns: 30 returns (post purchase)", // Add returnspost in features
            ],
        },
        {
            title: "Start",
            price: "$29/month",
            returnspost:"50 returns (post purchase)",
            returns:"N/A",
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
            returns:"5000 returns predictions",
            returnspost:"100 returns (post purchase)",
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
            returns:"10000 returns predictions",
            returnspost:"200 returns (post purchase)",
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
    return (
        <div id="pricing" style={sectionContainerStyle}>
            {/* Section Heading */}
            <div style={headingContainerStyle}>
                <h1 style={mainHeadingStyle}>Plans & Pricing</h1>
                <p style={subHeadingStyle}>
                    No credit card required. No risk.
                </p>
            </div>
            
            {/* Pricing Cards */}
            <div style={pricingContainerStyle}>
                {pricingPlans.map((plan, index) => (
                    <div key={index} style={pricingCardStyle}>
                        <h3 style={planTitleStyle}>{plan.title}</h3>
                        <p style={planPriceStyle}>{plan.price}</p>
                        <hr style={separatorStyle} />
                        <ul style={featuresStyle}>
                            {plan.features.map((feature, idx) => (
                                <li key={idx} style={featureItemStyle}>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button style={buttonStyle}>Get Started</button>
                    </div>
                ))}
            </div>
            <p style={subHeadingStyle}>
                Got Questions? <a href="mailto:alstonbeny@gmail.com" style={{ color: "blue", textDecoration: "none" }}>Contact Us</a>
            </p>
        </div>
    );
};

// Styles
const sectionContainerStyle = {
    padding: "50px 10px",
    backgroundColor: "#F9F9F9",
    textAlign: "center",
};

const headingContainerStyle = {
    marginBottom: "40px",
};

const mainHeadingStyle = {
    fontSize: "36px",
    color: "#333",
    fontFamily: "Inria Sans",
    fontWeight: "600",
};

const subHeadingStyle = {
    fontSize: "18px",
    color: "#555",
    fontFamily: "Inria Sans",
    fontWeight: "300",
    marginTop: "10px",
};

const pricingContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "0px",
};

const pricingCardStyle = {
    width: "250px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const planTitleStyle = {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
};

const planPriceStyle = {
    fontSize: "18px",
    fontWeight: "400",
    color: "#555",
    marginBottom: "20px",
};

const separatorStyle = {
    width: "100%",
    border: "none",
    borderTop: "1px solid #ddd",
    marginBottom: "15px",
};

const featuresStyle = {
    listStyle: "none",
    padding: "0",
    marginBottom: "20px",
    textAlign: "left",
};

const featureItemStyle = {
    fontSize: "14px",
    color: "#666",
    marginBottom: "8px",
};

const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
};

export default PricingSection;
