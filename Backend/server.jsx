require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs-extra");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Nodemailer transporter setup
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

// Set projectRoot to the desired absolute path
const projectRoot = 'C:\\Users\\alsto\\OneDrive\\Desktop\\Waitlist';

// Initialize the database file path
const dbPath = path.join(projectRoot, 'data.json');

// Utility function to validate input fields
const validateInput = (data, requiredFields) => {
  for (const field of requiredFields) {
    if (!data[field]) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    }
  }
  return null;
};

// Function to read the database file and initialize it if it doesn't exist
async function readDb() {
  try {
    const dir = path.dirname(dbPath);
    // Ensure the directory exists
    if (!fs.existsSync(dir)) {
      console.log("Directory does not exist, creating it...");
      fs.mkdirSync(dir, { recursive: true });
    }

    // Check if the file exists, create it if not
    if (!fs.existsSync(dbPath)) {
      console.log("Database file does not exist. Creating a new one...");
      await fs.writeJson(dbPath, { waitlist: [], demoRequests: [] });
    }

    // Log and read the database file
    console.log("Database file exists, loading it...");
    const data = await fs.readJson(dbPath);
    return data;
  } catch (error) {
    console.error("Error reading or creating the db:", error.message);
    throw new Error("Failed to read or create the db file.");
  }
}

// Function to save form data to the database (using fs-extra)
async function saveDataToDb(data, type) {
  try {
    const dbData = await readDb();

    // Add data to the appropriate array
    if (type === "waitlist") {
      dbData.waitlist.push(data);
    } else if (type === "demo") {
      dbData.demoRequests.push(data);
    }

    // Write updated data to the file
    await fs.writeJson(dbPath, dbData, { spaces: 2 });
    console.log("Data saved to db");

  } catch (error) {
    console.error("Error saving data to db:", error.message);
    throw new Error("Failed to save data to db.");
  }
}

// Function to send emails
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
    to: process.env.VITE_EMAIL_ADMIN,
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

// Waitlist API endpoint
// Waitlist API endpoint
app.post("/api/waitlist", async (req, res) => {
  const { name, email, number, company, howDoYouKnow } = req.body;

  // Validate input
  const validationError = validateInput(req.body, ["name", "email"]);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const waitlistData = { name, email, number, company, howDoYouKnow };

  try {
    // Save data to db
    await saveDataToDb(waitlistData, "waitlist");

    // Send email notifications (corrected function call)
    await sendConfirmationEmail(email, name, "waitlist");

    res.status(200).json({ message: "Successfully joined the waitlist and confirmation email sent!" });
  } catch (error) {
    console.error("Error handling waitlist request:", error.message);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

// Demo request API endpoint
app.post("/api/demo", async (req, res) => {
  const { name, email, number, company } = req.body;

  // Validate input
  const validationError = validateInput(req.body, ["name", "email", "number", "company"]);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const demoData = { name, email, number, company };

  try {
    // Save data to db
    await saveDataToDb(demoData, "demo");

    // Send email notifications (corrected function call)
    await sendConfirmationEmail(email, name, "demo");

    res.status(200).json({ message: "Demo request submitted successfully and confirmation email sent!" });
  } catch (error) {
    console.error("Error handling demo request:", error.message);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
