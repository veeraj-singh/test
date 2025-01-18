const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.json());


const API_KEY = "341dd7f9fa57ee22a1bb6e4c13315f92a8467c24d67d84e35a41f9ade0d0721f";


app.post("/api/zapier/invoice-responses", (req, res) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== API_KEY) {
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
