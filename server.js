const express = require("express");
const { Log, requestLogger } = require("./logging_middleware/logger");

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
    res.send("Hello");
});

const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await Log("backend", "info", "server", `Server started on port ${PORT}`);
});