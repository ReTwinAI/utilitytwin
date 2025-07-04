
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

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

    // --- Google Sheets Integration ---
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    // Vercel escapes newlines, so we need to un-escape them.
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
        console.error('Contact API Error: Missing Google Sheets environment variables.');
        return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }
    
    const auth = new GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const timestamp = new Date().toISOString();
    const values = [[name, email, message, timestamp]];

    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      });
      
      console.log('Contact API: Successfully appended to Google Sheet.', response.data);
      return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

    } catch (error: any) {
        console.error('Contact API: Error appending to Google Sheet.', error.response?.data?.error || error.message);
        return NextResponse.json({ message: 'Could not submit your message. Please try again later.' }, { status: 500 });
    }
    
  } catch (error: any) {
    console.error('Contact API: General error in /api/contact.', error);
    return NextResponse.json({ message: 'Internal Server Error. Please try again later.' }, { status: 500 });
  }
}
