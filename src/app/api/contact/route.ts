
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

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

    // --- Google Sheets Integration is temporarily disabled for debugging ---
    // This will allow us to confirm if the issue is with the Google Sheets API or environment variables.
    console.log('Contact API: Received data (Google Sheets disabled):', parsedData.data);
    
    // Always return success for now
    return NextResponse.json({ message: 'Message logged successfully! (Debug Mode)' }, { status: 200 });

  } catch (error: any) {
    console.error('Contact API: General error in /api/contact. Error:', error);
    return NextResponse.json({ message: 'Internal Server Error. Please try again later.' }, { status: 500 });
  }
}
