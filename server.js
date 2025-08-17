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
    const { message , name } = req.body;
  
    try {
      const data = await resend.emails.send({
        from: 'onboarding@sonagraf.com',
        to: 'jaakko@sonagraf.com',
        subject: `Contact request from ${name}`,
        html: `<p>${message}</p>`,
      });
      console.log('Resend response:', data);
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