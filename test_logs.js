const { Log } = require("./logging_middleware/logger");

async function runTests() {
  console.log("Running manual log tests...");

  // Example from image: handler error
  await Log(
    "backend",
    "error",
    "handler",
    "received string, expected bool"
  );

  // Example from image: db fatal
  await Log(
    "backend",
    "fatal",
    "db",
    "Critical database connection failure."
  );

  // Informational log
  await Log(
    "backend",
    "info",
    "app",
    "Manual test logs completed successfully."
  );
}

runTests();
