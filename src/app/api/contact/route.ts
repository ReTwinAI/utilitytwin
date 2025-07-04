
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

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

    // --- Google Sheets Configuration ---
    // Ensure these environment variables are set in your .env.local or Vercel project settings.
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!spreadsheetId || !clientEmail || !privateKey) {
        console.error('Contact API: Missing one or more Google Sheets environment variables.');
        return NextResponse.json({ message: 'Google Sheets service is not configured correctly on the server.' }, { status: 500 });
    }

    // Authenticate with Google
    const auth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare data for insertion
    const timestamp = new Date().toISOString();
    const values = [[timestamp, name, email, message]];

    console.log('Contact API: Attempting to append to Google Sheet:', spreadsheetId);

    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1', // Appends to the first empty row in Sheet1
        valueInputOption: 'USER_ENTERED',
        resource: {
          values,
        },
      });

      console.log('Contact API: Successfully appended to Google Sheet.', response.data);
      return NextResponse.json({ message: 'Message logged successfully!' }, { status: 200 });
    } catch (sheetError: any) {
      console.error('Contact API: Failed to append to Google Sheet. Error:', sheetError);
      let errorMessage = 'Failed to log message due to an internal error.';
      if (sheetError.code === 403) {
          errorMessage = "Permission denied. Ensure the service account email has 'Editor' access to the Google Sheet.";
      } else if (sheetError.code === 404) {
          errorMessage = "Spreadsheet not found. Please check the GOOGLE_SHEET_ID in your environment variables.";
      }
      return NextResponse.json({ message: errorMessage, details: sheetError.message || 'No additional details' }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Contact API: General error in /api/contact. Error:', error);
    console.error('Contact API: General error stack:', error.stack);
    return NextResponse.json({ message: 'Internal Server Error. Please try again later.', details: error.message || 'No additional details' }, { status: 500 });
  }
}
