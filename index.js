const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv')
const app = express();
dotenv.config()
app.use(bodyParser.json());

app.post("/api/zapier/invoice-responses", (req, res) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const { Body, Date, Subject } = req.body;
    if (!Body || !Date || !Subject) {
        return res.status(400).json({ error: "Missing required fields in the payload" });
    }
    console.log("Webhook received:", {
        body: Body,
        date: Date,
        subject: Subject,
    });
    res.status(200).json({ status: "success", message: "Webhook processed successfully" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
