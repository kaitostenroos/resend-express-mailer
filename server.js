require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const resend = new Resend(process.env.RESEND_API_KEY);


app.post('/api/resend', async (req, res) => {
    const { email, name } = req.body;
  
    try {
      const data = await resend.emails.send({
        from: 'onboarding@yourdomain.com',
        to: email,
        subject: 'Verify your email',
        html: `<p>Hello ${name || 'there'}, please verify your email.</p>`,
      });
  
      res.status(200).json({ success: true, id: data.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });