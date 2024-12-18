require("dotenv").config({ path: "../.env" }); // Adjust the path based on your folder structure
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define schema for waitlist form data
const waitlistSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  company: String,
  howDoYouKnow: String,
});
const Waitlist = mongoose.model("Waitlist", waitlistSchema, "waitlistreturn");

// Define schema for demo form data
const demoSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  company: String,
});
const Demo = mongoose.model("Demo", demoSchema, "demoRequests");

// Create a reusable transporter object using Gmail SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// Define the validation function
const validateInput = (data, requiredFields) => {
  for (let field of requiredFields) {
    if (!data[field]) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    }
  }
  return null;
};


// Function to send confirmation email
const sendConfirmationEmail = async (recipientEmail, recipientName, type) => {
  const subject = type === "demo" ? "Your Demo Request Confirmation" : "Welcome to Our Waitlist!";
  const textContent =
    type === "demo"
      ? `Hi ${recipientName},\n\nThank you for requesting a demo! We'll get back to you shortly.\n\nBest regards,\nYour App Team`
      : `Hi ${recipientName},\n\nThank you for joining our waitlist! We're excited to have you on board.\n\nBest regards,\nYour App Team`;
  const htmlContent =
    type === "demo"
      ? `<p>Hi <b>${recipientName}</b>,</p>
         <p>Thank you for requesting a demo! We'll get back to you shortly.</p>
         <p>Best regards,<br>Your App Team</p>`
      : `<p>Hi <b>${recipientName}</b>,</p>
         <p>Thank you for joining our waitlist! We're excited to have you on board.</p>
         <p>Best regards,<br>Your App Team</p>`;

  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject,
    text: textContent,
    html: htmlContent,
  };

  const notificationMail = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_ADMIN,
    subject: type === "demo" ? "New Demo Request Received" : "New Waitlist Entry Received",
    text: `${recipientName} submitted a ${type} request.`,
    html: `<p><b>${recipientName}</b> submitted a ${type} request. Check your dashboard for details.</p>`,
  };

  try {
    // Send confirmation email to the recipient
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to:", recipientEmail);

    // Send notification email to the admin
    await transporter.sendMail(notificationMail);
  } catch (error) {
    console.error("Error sending emails:", error.message);
    throw error;
  }
};

// Endpoint for waitlist
app.post("/api/waitlist", async (req, res) => {
  const { name, email, number, company, howDoYouKnow } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  try {
    const newWaitlistEntry = new Waitlist({
      name,
      email,
      number,
      company,
      howDoYouKnow,
    });
    await newWaitlistEntry.save();

    await sendConfirmationEmail(email, name, "waitlist");

    res.status(200).json({ message: "Successfully joined the waitlist and confirmation email sent!" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

// Endpoint for demo requests
// Endpoint for demo requests
app.post("/api/demo", async (req, res) => {
  const { name, email, number, company } = req.body;

  // Define the required fields
  const requiredFields = ["name", "email", "number", "company"];

  // Use the validateInput function
  const validationError = validateInput(req.body, requiredFields);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    // Log the request body for debugging
    console.log("Received demo request:", req.body);

    const newDemoRequest = new Demo({ name, email, number, company });
    await newDemoRequest.save();

    try {
      await sendConfirmationEmail(email, name, "demo");
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError.message);
      return res.status(500).json({ error: "Failed to send confirmation email." });
    }

    res.status(200).json({
      success: true,
      message: "Demo request submitted successfully.",
    });
  } catch (error) {
    // Log the error details to understand the issue
    console.error("Error saving demo request:", error.message);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
