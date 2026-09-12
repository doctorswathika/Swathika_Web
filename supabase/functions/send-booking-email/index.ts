import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFICATION_EMAIL = "doctorswathika@gmail.com";

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: {
    name: string;
    email: string;
    phone: string;
    service?: string;
    message?: string;
    created_at: string;
  };
  schema: string;
}

serve(async (req) => {
  try {
    const payload: WebhookPayload = await req.json();

    // Only process INSERT events for the bookings table
    if (payload.type !== "INSERT" || payload.table !== "bookings") {
      return new Response(JSON.stringify({ message: "Not a new booking insert, ignoring." }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    const { name, email, phone, service, message } = payload.record;

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #000; border-bottom: 2px solid #f3d2c1; padding-bottom: 10px;">New Consultation Booking</h2>
        <p>You have received a new consultation request from your website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${name || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              <a href="mailto:${email}">${email || 'N/A'}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${service || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Message</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${message || 'None'}</td>
          </tr>
        </table>
        
        <p style="margin-top: 30px; font-size: 12px; color: #888;">
          This is an automated notification from Dr. Swathika Rajendran's website.
        </p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "New Booking <onboarding@resend.dev>", // Default testing domain for Resend
        to: NOTIFICATION_EMAIL,
        subject: `New Booking Request from ${name}`,
        html: htmlContent,
        reply_to: email, // This allows the doctor to hit "Reply" in their email client directly
      }),
    });

    const data = await res.json();

    if (res.ok) {
      return new Response(JSON.stringify({ success: true, data }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      console.error("Resend error:", data);
      return new Response(JSON.stringify({ success: false, error: data }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }
  } catch (error: any) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
