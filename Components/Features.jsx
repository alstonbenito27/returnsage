import React from "react";
import one from "../src/assets/1.png";
import two from "../src/assets/2.png";
import three from "../src/assets/3.png";
import four from "../src/assets/4.png";
const Features = () => {
    return (
        
        <div id = "features" style={containerStyle}>
            {/* Section Title */}
            <div style={titleStyle1}>ML/AI Powered Returns Manager</div>
            <div style={titleStyle2}>Our solution stop the reverse/returns before it starts</div>
            {/* Feature Cards */}
            <div style={featureCardStyle}>
                {/* Feature 1 */}
                <div style={featureRowStyle}>
                    <div style={imageContainerStyle}>
                        <img
                            src={one}
                            alt="Feature 1"
                            style={imageStyle}
                        />
                    </div>
                    <div style={textContainerStyle}>
                        <div style={featureTitleStyle}>1. Predict return risk</div>
                        <div style={featureDescriptionStyle}>
                        Predict the likelihood of return before the customer
                        completes the purchase and identify the risky returns
                        </div>
                    </div>
                </div>

                {/* Feature 2 */}
                <div style={{ ...featureRowStyleAlt, marginBottom: "40px" }}>
                    <div style={textContainerStyle}>
                        <div style={featureTitleStyle}>2.Prevent with inline actions</div>
                        <div style={featureDescriptionStyle}>
                        With our suite of preventive inline personalized actions, brands can mitigate the risk of returns and delight your loyal customers before they order completion.
                        </div>
                    </div>
                    <div style={imageContainerStyle}>
                        <img
                            src={two}
                            alt="Feature 2"
                            style={imageStyle}
                        />
                    </div>
                </div>

                {/* Feature 3 */}
                <div style={featureRowStyle}>
                    <div style={imageContainerStyle}>
                        <img
                            src={three}
                            alt="Feature 3"
                            style={imageStyle}
                        />
                    </div>
                    <div style={textContainerStyle}>
                        <div style={featureTitleStyle}>3. Protect from fraud</div>
                        <div style={featureDescriptionStyle}>
                        With our machine learning solution, we help brands to de-clutter fraud/abusive from low risk customers, so brands can delight low-risk high-value customers while restricting fraudsters.
                        </div>
                    </div>
                </div>

                {/* Feature 4 */}
                <div style={featureRowStyleAlt}>
                    <div style={textContainerStyle}>
                        <div style={featureTitleStyle}>4. Auto-resolve every return</div>
                        <div style={featureDescriptionStyle}>
                        Our advanced ML solution will review every return to take optimized decision that balance the cost to business, sustainability, and customer experience. More importantly, with minimal to no human intervention.  
                        </div>
                    </div>
                    <div style={imageContainerStyle}>
                        <img
                            src={four}
                            alt="Feature 4"
                            style={imageStyle}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles
const containerStyle = {
    width: "100%",
    maxWidth: "1473px",
    minHeight: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#EEF4F3",
    padding: "50px 20px",
};

const titleStyle1 = {
    fontSize: "40px",
    color: "black",
    fontFamily: "Inria Sans",
    fontWeight: "400",
    wordWrap: "break-word",
};

const titleStyle2 = {
    fontSize: "25px",
    color: "black",
    fontFamily: "Inria Sans",
    fontWeight: "100",
    marginBottom: "30px",
    wordWrap: "break-word",
    };

const featureCardStyle = {
    width: "100%",
    maxWidth: "1000px",
};

const featureRowStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "40px",
    gap: "20px",
    flexWrap: "wrap",
};

const featureRowStyleAlt = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
};

const imageContainerStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
};

const imageStyle = {
    width: "350px",
    height: "350px",
    objectFit: "cover",
};

const textContainerStyle = {
    flex: 2,
    textAlign: "left",
    padding: "10px 20px",
};

const featureTitleStyle = {
    fontSize: "25px",
    fontFamily: "Inria Sans",
    fontWeight: "400",
    color: "black",
    marginBottom: "10px",
};

const featureDescriptionStyle = {
    fontSize: "18px",
    fontFamily: "Inria Sans",
    fontWeight: "300",
    color: "black",
    lineHeight: "1.5",
};

export default Features;
