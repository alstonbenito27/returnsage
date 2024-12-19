import React, { useEffect, useRef, useState } from "react";
import one from "../src/assets/1.png";
import two from "../src/assets/2.png";
import three from "../src/assets/3.png";
import four from "../src/assets/4.png";

const Features = () => {
    const [isInView, setIsInView] = useState(false);

    const imageRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        imageRef.current.forEach((img) => {
            observer.observe(img);
        });

        return () => {
            if (imageRef.current) {
                imageRef.current.forEach((img) => {
                    observer.unobserve(img);
                });
            }
        };
    }, []);

    return (
        <>
            <style>
                {`
                    /* General Container */
                    .features-container {
                        width: 100%;
                        max-width: 95%;
                        min-height: 600px;
                        margin: 0 auto;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        background-color: #eef4f3;
                        padding: 60px 3rem;
                        overflow-x: hidden;
                    }

                    .title-primary {
                        font-size: 2.5rem;
                        color: black;
                        font-family: 'Inria Sans', sans-serif;
                        font-weight: 400;
                        margin-bottom: 0.5rem;
                    }

                    .title-secondary {
                        font-size: 1.25rem;
                        color: black;
                        font-family: 'Inria Sans', sans-serif;
                        font-weight: 300;
                        margin-bottom: 2rem;
                    }

                    .feature-cards {
                        width: 100%;
                        max-width: 1400px;
                    }

                    .feature-row,
                    .feature-row-alt {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 3rem;
                        gap: 2rem;
                        flex-wrap: wrap;
                    }

                    .image-container {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 1rem;
                    }

                    .image-style {
                        max-width: 100%;
                        height: auto;
                        object-fit: cover;
                        opacity: 0;
                        transition: opacity 1s ease-in-out;
                    }

                    .fade-in {
                        opacity: 1;
                    }

                    .text-container {
                        flex: 2;
                        text-align: left;
                        padding: 1rem;
                    }

                    .feature-title {
                        font-size: 1.5rem;
                        font-family: 'Inria Sans', sans-serif;
                        font-weight: 400;
                        margin-bottom: 0.5rem;
                        color: black;
                    }

                    .feature-description {
                        font-size: 20px;
                        font-family: 'Inria Sans', sans-serif;
                        font-weight: 300;
                        line-height: 1.5;
                        color: black;
                        word-wrap: break-word; 
                        overflow-wrap: break-word; 
                        white-space: normal;
                    }

                    @media (max-width: 1024px) {
                        .features-container {
                            padding: 3rem 2rem;
                        }

                        .feature-row,
                        .feature-row-alt {
                            flex-direction: column;
                        }

                        .text-container {
                            text-align: center;
                        }
                    }

                    @media (max-width: 768px) {
                        .title-primary {
                            font-size: 2rem;
                        }

                        .title-secondary {
                            font-size: 1rem;
                        }

                        .image-style {
                            max-width: 300px;
                        }

                        .feature-title {
                            font-size: 1.25rem;
                        }

                        .feature-description {
                            font-size: 0.9rem;
                        }
                    }

                    @media (max-width: 480px) {
                        .features-container {
                            padding: 2rem 1rem;
                        }

                        .title-primary {
                            font-size: 1.75rem;
                        }

                        .title-secondary {
                            font-size: 0.875rem;
                        }

                        .image-style {
                            max-width: 250px;
                        }

                        .feature-title {
                            font-size: 1rem;
                        }

                        .feature-description {
                            font-size: 0.8rem;
                        }
                    }

                `}
            </style>

            <div id="features" className="features-container">
                {/* Section Title */}
                <div className="title-primary">ML/AI Powered Returns Manager</div>
                <div className="title-secondary">
                    Our solution stops the reverse/returns before it starts
                </div>

                {/* Feature Cards */}
                <div className="feature-cards">
                    {/* Feature 1 */}
                    <div className="feature-row">
                        <div className="image-container">
                            <img
                                ref={(el) => imageRef.current[0] = el}
                                src={one}
                                alt="Feature 1"
                                className="image-style"
                            />
                        </div>
                        <div className="text-container">
                            <div className="feature-title">1. Predict return risk</div>
                            <div className="feature-description">
                                Predict the likelihood of return before the customer completes<br/> the purchase and identify the risky returns.
                            </div>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="feature-row-alt">
                        <div className="text-container">
                            <div className="feature-title">2. Prevent with inline actions</div>
                            <div className="feature-description">
                                With our suite of preventive inline personalized actions, <br/>brands can mitigate the risk of returns and delight your<br/> loyal customers before they order completion.
                            </div>
                        </div>
                        <div className="image-containeralt">
                            <img
                                ref={(el) => imageRef.current[1] = el}
                                src={two}
                                alt="Feature 2"
                                className="image-style"
                            />
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="feature-row">
                        <div className="image-container">
                            <img
                                ref={(el) => imageRef.current[2] = el}
                                src={three}
                                alt="Feature 3"
                                className="image-style"
                            />
                        </div>
                        <div className="text-container">
                            <div className="feature-title">3. Protect from fraud</div>
                            <div className="feature-description">
                                With our machine learning solution, we help brands to de-clutter<br/> fraud/abusive from low-risk customers, so brands can delight low-risk<br/> high-value customers while restricting fraudsters.
                            </div>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="feature-row-alt">
                        <div className="text-container">
                            <div className="feature-title">4. Auto-resolve every return</div>
                            <div className="feature-description">
                                Our advanced ML solution will review every return to take optimized <br/>decisions that balance the cost to business, sustainability, and customer<br/> experience. More importantly, with minimal to no human intervention.
                            </div>
                        </div>
                        <div className="image-container">
                            <img
                                ref={(el) => imageRef.current[3] = el}
                                src={four}
                                alt="Feature 4"
                                className="image-style"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Features;
