import React from "react";

const RowFlex = () => {
    // Content data
    const content = [
        {
            heading: "Delight Customers",
            text: "With our customer segmentation, brands can focus to delight loyal customers.",
        },
        {
            heading: "Increase LTV",
            text: "With instant approval and personalized experience, brands increase the customer life time value",
        },
        {
            heading: "Reduce Operations",
            text: "With a fully automated decision to the copilot, brands will have no to minimal human intervention to manage returns.  ",
        },
        {
            heading: "Resolve root causes",
            text: "Our action based analytics will help brands to not just root cause but resolve the issues with AI recommendtion.",
        },
    ];

    return (
        <div style={rowStyle}>
            {content.map((item, index) => (
                <div key={index} style={columnStyle}>
                    <h3 style={headingStyle}>{item.heading}</h3>
                    <p style={textStyle}>{item.text}</p>
                </div>
            ))}
        </div>
    );
};

// Styles
const rowStyle = {
    backgroundColor:"#EEF4F3",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    padding: "20px",
    flexWrap: "wrap", // Ensures responsive layout for smaller screens
};

const columnStyle = {
    flex: "1", // Each item takes an equal portion of the available space
    maxWidth: "23%", // Ensures 4 items fit within the row
    textAlign: "center",
    backgroundColor: "#EEF4F3",
    padding: "15px",
};

const headingStyle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
};

const textStyle = {
    fontSize: "16px",
    fontWeight: "300",
    color: "#555",
};

export default RowFlex;
