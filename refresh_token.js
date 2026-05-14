require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function refreshToken() {
  console.log("Attempting to refresh token...");

  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/auth",
      {
        companyName: "Affordmed",
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        ownerName: "Anuj Kumar",
        ownerEmail: "anujksah123@gmail.com",
        rollNo: "12314104"
      }
    );

    const newToken = response.data.access_token;
    if (newToken) {
      console.log("New token received!");
      
      // Update .env file
      const envPath = path.join(__dirname, ".env");
      let envContent = fs.readFileSync(envPath, "utf8");
      
      // Replace the TOKEN line
      const tokenRegex = /^TOKEN=.*$/m;
      if (tokenRegex.test(envContent)) {
        envContent = envContent.replace(tokenRegex, `TOKEN=${newToken}`);
      } else {
        envContent += `\nTOKEN=${newToken}`;
      }
      
      fs.writeFileSync(envPath, envContent);
      console.log("Successfully updated .env with new token.");
    } else {
      console.log("No token found in response:", response.data);
    }
  } catch (error) {
    console.error(
      "Token refresh failed:",
      error.response?.data || error.message
    );
    console.log("Note: If this URL is incorrect, please check your assignment PDF for the 'auth' endpoint.");
  }
}

refreshToken();
