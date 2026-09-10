import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets/images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Helper to parse SMTP settings, handling multiple comma-separated emails
const getSMTPConfig = () => {
  const rawUser = process.env.SMTP_USER || '4srsinc@gmail.com';
  // Split by comma to get all recipients
  const recipients = rawUser.split(',').map(e => e.trim()).filter(Boolean);
  // The first email is used as the SMTP login user
  const smtpUser = recipients[0] || '4srsinc@gmail.com';
  // The SMTP pass
  const smtpPass = process.env.SMTP_PASS || 'trnbsbyozoipwhgb';
  // Clean fallback or env password spaces
  const cleanPass = smtpPass.replace(/\s+/g, '');
  
  return {
    smtpUser,
    smtpPass: cleanPass,
    to: recipients.join(', ') // Nodemailer sends to all
  };
};

// API endpoint for SMTP booking requests
app.post('/api/booking', async (req, res) => {
  const { name, email, phone, service, details, source } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone number are required.' });
  }

  try {
    const smtpConfig = getSMTPConfig();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpConfig.smtpUser,
        pass: smtpConfig.smtpPass
      }
    });

    const mailOptions = {
      from: `"4 Seasons Booking System" <${smtpConfig.smtpUser}>`,
      to: smtpConfig.to,
      replyTo: email || undefined,
      subject: `🚨 New Booking Request (${source || 'Form'}) - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #FD441B 0%, #FF6B4A 100%); padding: 24px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">New Estimate Request</h2>
            <p style="margin: 4px 0 0; opacity: 0.9; font-size: 14px;">Source: ${source || 'Website Form'}</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <p style="font-size: 16px; margin-top: 0;">You have received a new contracting request from your website. Here are the details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="border-bottom: 1px solid #edf2f7;">
                <td style="padding: 12px 0; font-weight: bold; color: #4a5568; width: 150px;">Customer Name:</td>
                <td style="padding: 12px 0; color: #2d3748;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #edf2f7;">
                <td style="padding: 12px 0; font-weight: bold; color: #4a5568;">Phone Number:</td>
                <td style="padding: 12px 0; color: #2d3748;"><a href="tel:${phone}" style="color: #FD441B; text-decoration: none; font-weight: bold;">${phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #edf2f7;">
                <td style="padding: 12px 0; font-weight: bold; color: #4a5568;">Email Address:</td>
                <td style="padding: 12px 0; color: #2d3748;">${email ? `<a href="mailto:${email}" style="color: #FD441B; text-decoration: none;">${email}</a>` : 'Not provided'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #edf2f7;">
                <td style="padding: 12px 0; font-weight: bold; color: #4a5568;">Service Requested:</td>
                <td style="padding: 12px 0; color: #2d3748;"><span style="background-color: #fff3f0; color: #FD441B; padding: 4px 8px; border-radius: 6px; font-size: 13px; font-weight: bold;">${service || 'General Inquiry'}</span></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #4a5568; vertical-align: top;">Project Details:</td>
                <td style="padding: 12px 0; color: #2d3748; white-space: pre-wrap;">${details || 'No additional details provided.'}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f7fafc; padding: 16px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7;">
            &copy; 2026 4 Seasons Right Services Inc. All Rights Reserved.
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Booking inquiry sent successfully!' });
  } catch (error) {
    console.error('SMTP Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send booking request. Please try again later.' });
  }
});

// Lazy initialization of Gemini API client
let aiClient = null;
function getGenAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// System Instruction for the AI Booking Bot
const aiBotSystemInstruction = `
You are the official conversational AI Booking Bot for "4 Seasons Right Services Inc.", a premium general contractor located in Kirkland, Washington (WA Lic# 4SEASSR801OR).
We provide residential and commercial services across Washington, including:
- Kitchen Remodeling
- Bathroom Remodeling
- Drywall & Painting (Interior & Exterior)
- Flooring & Carpentry
- Deck & Siding Installation
- Roofing Services
- General Remodeling
- Commercial Painting
- Pressure Washing
- New Construction

Your goals are:
1. Enthusiastically, warmly, and politely assist customers.
2. Answer their questions about our services, business location (Kirkland, WA), working hours (Mon - Sat: 8am - 7pm), phone number ((425) 466-5469), and service area (King County, Snohomish County, Pierce County, Seattle, Bellevue, Everett, Tacoma, etc.).
3. Guide the customer to book a FREE, no-obligation contracting estimate.
4. If they agree or want to get an estimate, proactively and conversationally collect the following required info, ONE BY ONE:
   - Full Name
   - Phone Number (strictly required for follow-up)
   - Email Address (or 'none' if they don't want to provide)
   - Service they are interested in
   - Brief details/description of the project
5. DO NOT ask all questions at once. Ask them one by one in a friendly, conversational manner.
6. Once you have collected ALL 5 details, immediately call the 'schedule_booking' function with these details. Do not ask for further confirmation before calling it.
7. Keep responses concise, clear, and professional. Avoid long blocks of text.
`;

// Tool schema for booking
const scheduleBookingDeclaration = {
  name: "schedule_booking",
  description: "Schedule a free contracting estimate booking request for the customer after collecting all required details.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "The customer's full name" },
      phone: { type: Type.STRING, description: "The customer's phone number" },
      email: { type: Type.STRING, description: "The customer's email address (or 'none')" },
      service: { type: Type.STRING, description: "The service type requested (e.g., Kitchen Remodeling, Roofing, Drywall & Painting)" },
      details: { type: Type.STRING, description: "Brief project details and specifications" }
    },
    required: ["name", "phone", "email", "service", "details"]
  }
};

// API endpoint for AI Chatbot conversational bookings
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ success: false, message: 'Messages array is required.' });
  }

  try {
    const ai = getGenAI();
    
    // Map history to Gemini contents format
    // Each client message is { role: 'user' | 'assistant', text: string }
    const mappedContents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: mappedContents,
      config: {
        systemInstruction: aiBotSystemInstruction,
        tools: [{ functionDeclarations: [scheduleBookingDeclaration] }]
      }
    });

    const text = response.text || '';
    const functionCalls = response.functionCalls;

    // Check if the model triggered the schedule_booking function call
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === 'schedule_booking') {
        const args = call.args;
        
        // Send SMTP booking notification email
        const smtpConfig = getSMTPConfig();
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpConfig.smtpUser,
            pass: smtpConfig.smtpPass
          }
        });

        const mailOptions = {
          from: `"4 Seasons Booking System" <${smtpConfig.smtpUser}>`,
          to: smtpConfig.to,
          replyTo: args.email && args.email !== 'none' ? args.email : undefined,
          subject: `🚨 New Booking Request (AI Chatbot) - ${args.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
              <div style="background: linear-gradient(135deg, #FD441B 0%, #FF6B4A 100%); padding: 24px; text-align: center; color: white;">
                <h2 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">New Estimate Request</h2>
                <p style="margin: 4px 0 0; opacity: 0.9; font-size: 14px;">Source: AI Booking Chatbot</p>
              </div>
              <div style="padding: 24px; background-color: #ffffff;">
                <p style="font-size: 16px; margin-top: 0;">You have received a new contracting request from your AI Chatbot. Here are the details:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                  <tr style="border-bottom: 1px solid #edf2f7;">
                    <td style="padding: 12px 0; font-weight: bold; color: #4a5568; width: 150px;">Customer Name:</td>
                    <td style="padding: 12px 0; color: #2d3748;">${args.name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #edf2f7;">
                    <td style="padding: 12px 0; font-weight: bold; color: #4a5568;">Phone Number:</td>
                    <td style="padding: 12px 0; color: #2d3748;"><a href="tel:${args.phone}" style="color: #FD441B; text-decoration: none; font-weight: bold;">${args.phone}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #edf2f7;">
                    <td style="padding: 12px 0; font-weight: bold; color: #4a5568;">Email Address:</td>
                    <td style="padding: 12px 0; color: #2d3748;">${args.email && args.email !== 'none' ? `<a href="mailto:${args.email}" style="color: #FD441B; text-decoration: none;">${args.email}</a>` : 'Not provided'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #edf2f7;">
                    <td style="padding: 12px 0; font-weight: bold; color: #4a5568;">Service Requested:</td>
                    <td style="padding: 12px 0; color: #2d3748;"><span style="background-color: #fff3f0; color: #FD441B; padding: 4px 8px; border-radius: 6px; font-size: 13px; font-weight: bold;">${args.service || 'General Inquiry'}</span></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: bold; color: #4a5568; vertical-align: top;">Project Details:</td>
                    <td style="padding: 12px 0; color: #2d3748; white-space: pre-wrap;">${args.details || 'No additional details provided.'}</td>
                  </tr>
                </table>
              </div>
              <div style="background-color: #f7fafc; padding: 16px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7;">
                &copy; 2026 4 Seasons Right Services Inc. All Rights Reserved.
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
          success: true,
          text: `🎉 **Booking Confirmed!**\n\nThank you, **${args.name}**! I have successfully submitted your estimate request via SMTP.\n\nOur contracting supervisor will reach out to you at **${args.phone}** within 24 hours to schedule!`,
          bookingData: args,
          isBookingSuccessful: true
        });
      }
    }

    return res.status(200).json({
      success: true,
      text: text,
      isBookingSuccessful: false
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: true,
        text: `Welcome to 4 Seasons Right Services! 🌟\n\nI can help you schedule a free, no-obligation estimate right now!\n\nTo proceed, please call our supervisor directly at **(425) 466-5469** or type your contact info and I can note it down!`,
        isBookingSuccessful: false
      });
    }
    return res.status(500).json({ success: false, message: 'Internal server error during chat.' });
  }
});

// Serve static build from dist if available, else static root
const distPath = path.join(__dirname, 'dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
app.use(express.static(__dirname));

// SPA Catch-all fallback for React Router
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }

  const distIndex = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(distIndex)) {
    return res.sendFile(distIndex);
  }
  
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

