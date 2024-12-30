require("dotenv").config();
const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");

// AWS SDK configuration
AWS.config.update({ region: "ap-south-1" });
const s3 = new AWS.S3();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,npm 
  },
});

// Constants for request types
const REQUEST_TYPE = {
  DEMO: 1,
  WAITLIST: 2,
};

// Helper function to validate input
const validateInput = (data, requiredFields) => {
  const missingFields = requiredFields.filter((field) => !data[field]);
  if (missingFields.length > 0) {
    console.log("Missing fields:", missingFields);
    return `${missingFields.join(", ")} ${
      missingFields.length > 1 ? "are" : "is"
    } required.`;
  }
  return null;
};


// Save data to S3
async function saveDataToS3(data, type) {
  const timestamp = new Date().toISOString();
  const key = `requests/${type}_${timestamp}.json`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: JSON.stringify(data, null, 2),
    ContentType: "application/json",
  };

  try {
    await s3.putObject(params).promise();
    console.log("Data saved to S3:", key);
  } catch (error) {
    console.error("Error saving data to S3:", error.message);
    throw new Error("Failed to save data to S3.");
  }
}

// Send confirmation email
const sendConfirmationEmail = async (recipientEmail, recipientName, type) => {
  const subject =
    type === REQUEST_TYPE.DEMO
      ? "Your Demo Request Confirmation"
      : "Welcome to Our Waitlist!";

  const textContent =
    type === REQUEST_TYPE.DEMO
      ? `Hi ${recipientName},\n\nThank you for requesting a demo! We'll get back to you shortly.`
      : `Hi ${recipientName},\n\nThank you for joining our waitlist! We're excited to have you on board.`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject,
    text: textContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to:", recipientEmail);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email.");
  }
};

// Send notification email
const sendNotificationEmail = async (formData, type) => {
  const subject =
    type === REQUEST_TYPE.DEMO
      ? "New Demo Request Submitted"
      : "New Waitlist Submission Received";

  const textContent = `
    A new ${type === REQUEST_TYPE.DEMO ? "demo request" : "waitlist submission"} has been received:

    Name: ${formData.name}
    Email: ${formData.email}
    Phone: ${formData.number || "N/A"}
    Company: ${formData.company || "N/A"}
    How they heard about us: ${formData.howDoYouKnow || "N/A"}

    Please review the details and follow up as needed.
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Notification email sent to EMAIL_USER
    subject,
    text: textContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to admin:", process.env.EMAIL_USER);
  } catch (error) {
    console.error("Error sending notification email:", error.message);
    throw new Error("Failed to send notification email.");
  }
};

// Main handler for form submissions
exports.handler = async (event) => {
  try {
    console.log("Incoming event:", event);

    // Parse the event body
    const { type, ...formData } = JSON.parse(event.body);

    console.log("Received type:", type);
    console.log("Received formData:", formData);

    // Validate formData
    const requiredFields = ["name", "email"];
    if (type === REQUEST_TYPE.WAITLIST) requiredFields.push("howDoYouKnow");

    const validationError = validateInput(formData, requiredFields);
    if (validationError) {
      console.log("Validation error:", validationError);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: validationError }),
      };
    }

    // Process the request based on type
    if (type === REQUEST_TYPE.DEMO) {
      console.log("Processing demo request...");
      await saveDataToS3(formData, "demo");
      await sendConfirmationEmail(formData.email, formData.name, REQUEST_TYPE.DEMO);
      await sendNotificationEmail(formData, REQUEST_TYPE.DEMO);
    } else if (type === REQUEST_TYPE.WAITLIST) {
      console.log("Processing waitlist submission...");
      await saveDataToS3(formData, "waitlist");
      await sendConfirmationEmail(formData.email, formData.name, REQUEST_TYPE.WAITLIST);
      await sendNotificationEmail(formData, REQUEST_TYPE.WAITLIST);
    } else {
      console.log("Invalid type received:", type);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid type received." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Request processed successfully!" }),
    };
  } catch (error) {
    console.error("Error in handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error processing request.", details: error.message }),
    };
  }
};
