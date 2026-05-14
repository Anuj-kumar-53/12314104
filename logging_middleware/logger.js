require("dotenv").config();
const axios = require("axios");

const Log = async (stack, level, pkg, message) => {
  try {
    console.log("Attempting to send log with token (length):", process.env.TOKEN?.length);
    if (process.env.TOKEN) {
      console.log("Token starts with:", process.env.TOKEN.substring(0, 10));
    }

    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );

    console.log("Log sent successfully:", response.data);
  } catch (error) {
    console.error(
      "Logging failed:",
      error.response?.data || error.message
    );
  }
};

const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    Log(
      "backend",
      res.statusCode >= 400 ? "error" : "info",
      "server",
      `${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
    );
  });
  next();
};

module.exports = { Log, requestLogger };