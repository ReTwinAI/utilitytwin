
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must not be longer than 500 characters." }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = contactFormSchema.safeParse(body);

    if (!parsedData.success) {
      console.error('Contact API: Invalid input', parsedData.error.formErrors.fieldErrors);
      return NextResponse.json({ message: 'Invalid input.', errors: parsedData.error.formErrors.fieldErrors }, { status: 400 });
    }

    const { name, email, message } = parsedData.data;

    // --- Nodemailer Configuration ---
    // IMPORTANT: Ensure your .env.local file in the project root is correctly set up with these variables.
    // EMAIL_HOST=smtp.example.com
    // EMAIL_PORT=587 (or 465 for SSL)
    // EMAIL_USER=your-email-username
    // EMAIL_PASS=your-email-password-or-app-password
    // EMAIL_FROM_ADDRESS=your-sending-email@example.com (optional, if different from EMAIL_USER)
    //
    // For Gmail, you might need to:
    // 1. Enable "Less secure app access" (not recommended for production).
    // 2. Or, better, generate an "App Password" and use that as EMAIL_PASS.
    // For other services (SendGrid, Mailgun, etc.), use their specific SMTP details and API key/password.

    const emailHost = process.env.EMAIL_HOST;
    const emailPort = process.env.EMAIL_PORT;
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailFrom = process.env.EMAIL_FROM_ADDRESS || emailUser;


    if (!emailHost || !emailPort || !emailUser || !emailPass) {
        console.error('Contact API: Missing one or more email environment variables (EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS).');
        return NextResponse.json({ message: 'Email service is not configured correctly on the server.' }, { status: 500 });
    }

    const transporterOptions: nodemailer.TransportOptions = {
      host: emailHost,
      port: Number(emailPort),
      secure: Number(emailPort) === 465, // true for 465, false for other ports (like 587 with STARTTLS)
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    };

    console.log('Contact API: Attempting to create transporter with options (excluding password):', {
        host: transporterOptions.host,
        port: transporterOptions.port,
        secure: transporterOptions.secure,
        user: transporterOptions.auth?.user,
    });

    const transporter = nodemailer.createTransport(transporterOptions);

    // --- Recipient Email Addresses ---
    // Replace these with your actual recipient email addresses.
    const toEmails = [
      "rifaath.ameen@fau.de",
      "malte.hitpass@fau.de",
      "adithya.ramachandran@fau.de",
      "karla.hausel@fau.de"
      // Add up to two more emails here if needed
    ];

    if (toEmails.length === 0 || !toEmails[0]) {
        console.error('Contact API: No recipient email addresses configured in toEmails array.');
        return NextResponse.json({ message: 'Email service recipient is not configured.' }, { status: 500 });
    }


    const mailOptions = {
      from: `"${name}" <${emailFrom}>`, // Sender address (use your authenticated email, or a dedicated "from" address)
      replyTo: email, // Set reply-to to the user's email
      to: toEmails.join(','), // List of receivers
      subject: `UTILITY TWIN | New Contact Form Submission from ${name}`, // Subject line
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`, // HTML body
    };

    console.log('Contact API: Attempting to send email with options:', mailOptions);

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Contact API: Message sent successfully! Message ID:', info.messageId, 'Response:', info.response);
      return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
    } catch (emailError: any) {
      console.error('Contact API: Email sending failed. Error:', emailError);
      console.error('Contact API: Email error stack:', emailError.stack);
      // Provide a more specific error message if possible
      let errorMessage = 'Failed to send message due to an internal error.';
      if (emailError.code === 'ECONNREFUSED') {
        errorMessage = 'Could not connect to the email server. Please check the host and port configuration.';
      } else if (emailError.code === 'EAUTH') {
        errorMessage = 'Email authentication failed. Please check your email username and password/app password.';
      } else if (emailError.responseCode === 535) {
         errorMessage = 'Authentication credentials invalid. Please check your email username and password/app password.';
      }
      return NextResponse.json({ message: errorMessage, details: emailError.message || 'No additional details' }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Contact API: General error in /api/contact. Error:', error);
    console.error('Contact API: General error stack:', error.stack);
    return NextResponse.json({ message: 'Internal Server Error. Please try again later.', details: error.message || 'No additional details' }, { status: 500 });
  }
}
