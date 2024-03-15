const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

const app = express();

app.use(cors());
app.use(express.json());

const mailgun = new Mailgun(formData);

const client = mailgun.client({
  username: "Lucas",
  key: "f745c****-b02bcf9f-4269ae9b",
});

app.get("/", (req, res) => {
  res.json({ message: "salut !!" });
});

app.post("/form", async (req, res) => {
  //   console.log(req.body);

  try {
    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: "lucasr.prof@gmail.com",
      subject: "Bonjour Lucas",
      text: `${req.body.message}`,
    };

    const response = await client.messages.create(
      "sand****ilgun.org",
      messageData
    );

    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("server started");
});
