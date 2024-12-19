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
            text: "With a fully automated decision to the copilot, brands will have no to minimal human intervention to manage returns.",
        },
        {
            heading: "Resolve root causes",
            text: "Our action based analytics will help brands to not just root cause but resolve the issues with AI recommendation.",
        },
    ];

    return (
        <>
            <style>
                {`
                    /* Row Flex Container */
                    .row-flex-container {
                        background-color: #EEF4F3;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        gap: 20px;
                        padding: 20px;
                        flex-wrap: wrap; /* Ensures responsive layout for smaller screens */
                    }

                    /* Column Style */
                    .row-flex-column {
                        flex: 1;
                        max-width: 23%; /* Ensures 4 items fit within the row */
                        text-align: center;
                        background-color: #EEF4F3;
                        padding: 15px;
                    }

                    /* Heading Style */
                    .row-flex-heading {
                        font-size: 20px;
                        font-weight: 600;
                        margin-bottom: 10px;
                        color: #333;
                    }

                    /* Text Style */
                    .row-flex-text {
                        font-size: 16px;
                        font-weight: 300;
                        color: #555;
                    }

                    /* Media Queries for Responsiveness */
                    @media (max-width: 768px) {
                        .row-flex-column {
                            max-width: 100%; /* Columns stack on smaller screens */
                            margin-bottom: 20px; /* Add space between columns */
                        }

                        .row-flex-heading {
                            font-size: 18px;
                        }

                        .row-flex-text {
                            font-size: 14px;
                        }
                    }
                `}
            </style>

            <div className="row-flex-container">
                {content.map((item, index) => (
                    <div key={index} className="row-flex-column">
                        <h3 className="row-flex-heading">{item.heading}</h3>
                        <p className="row-flex-text">{item.text}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default RowFlex;
