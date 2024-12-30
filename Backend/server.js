require("dotenv").config(); // Use environment variables configured in AWS
const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");

// AWS SDK configuration
AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();
const lambda = new AWS.Lambda(); 

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper function to validate input
const validateInput = (data, requiredFields) => {
  for (const field of requiredFields) {
    if (!data[field]) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    }
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

// Send email confirmation
const sendConfirmationEmail = async (recipientEmail, recipientName, type) => {
  const subject = type === "demo" ? "Your Demo Request Confirmation" : "Welcome to Our Waitlist!";
  const textContent = type === "demo"
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

// Lambda function to invoke another Lambda function
async function invokeLambda(functionName, payload) {
  const params = {
    FunctionName: functionName,
    InvocationType: "RequestResponse", // synchronous invocation
    Payload: JSON.stringify(payload),
  };

  try {
    const data = await lambda.invoke(params).promise();
    console.log("Lambda response:", JSON.parse(data.Payload));
    return JSON.parse(data.Payload);
  } catch (error) {
    console.error("Error invoking Lambda:", error);
    throw new Error("Failed to invoke Lambda function.");
  }
}

// Add CORS headers to all responses
const addCorsHeaders = (response) => ({
  ...response,
  headers: {
    "Access-Control-Allow-Origin": "http://returnsage-migration1.s3-website.ap-south-1.amazonaws.com", // Replace with your S3 URL
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST", // Allow preflight (OPTIONS) and POST
    ...response.headers,
  },
});

// Main handler for waitlist submissions
exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return addCorsHeaders({
      statusCode: 200,
      body: "",
    });
  }

  const { name, email, number, company, howDoYouKnow } = JSON.parse(event.body);

  const validationError = validateInput({ name, email, number, company, howDoYouKnow }, ["name", "email"]);
  if (validationError) {
    return addCorsHeaders({
      statusCode: 400,
      body: JSON.stringify({ error: validationError }),
    });
  }

  const waitlistData = { name, email, number, company, howDoYouKnow };

  try {
    await saveDataToS3(waitlistData, "waitlist");
    await sendConfirmationEmail(email, name, "waitlist");

    const lambdaResponse = await invokeLambda("returnsage-migration", waitlistData); // Replace with actual Lambda function name

    return addCorsHeaders({
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully joined the waitlist!", lambdaResponse }),
    });
  } catch (error) {
    console.error("Error in waitlist handler:", error);
    return addCorsHeaders({
      statusCode: 500,
      body: JSON.stringify({ error: "Error processing request." }),
    });
  }
};

// Main handler for demo submissions
exports.demoHandler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return addCorsHeaders({
      statusCode: 200,
      body: "",
    });
  }

  const { name, email, number, company } = JSON.parse(event.body);

  const validationError = validateInput({ name, email, number, company }, ["name", "email", "number", "company"]);
  if (validationError) {
    return addCorsHeaders({
      statusCode: 400,
      body: JSON.stringify({ error: validationError }),
    });
  }

  const demoData = { name, email, number, company };

  try {
    await saveDataToS3(demoData, "demo");
    await sendConfirmationEmail(email, name, "demo");

    const lambdaResponse = await invokeLambda("returnsage-migration", demoData); // Replace with actual Lambda function name

    return addCorsHeaders({
      statusCode: 200,
      body: JSON.stringify({ message: "Demo request submitted successfully!", lambdaResponse }),
    });
  } catch (error) {
    console.error("Error in demo handler:", error);
    return addCorsHeaders({
      statusCode: 500,
      body: JSON.stringify({ error: "Error processing request." }),
    });
  }
};
