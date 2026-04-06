import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  try {
    const { record } = await req.json()
    
    // 1. Send Notification to Admin (Geeks Crowd)
    await resend.emails.send({
      from: 'Geeks Crowd <info@geekscrowd.com>', 
      to: 'geeksccrowd0@gmail.com',
      subject: `🚀 New Lead: ${record.project_name || 'New Project Request'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h1 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Lead Captured</h1>
          <p><strong>Project Name:</strong> ${record.project_name || 'Unnamed'}</p>
          <p><strong>Client Email:</strong> <a href="mailto:${record.client_email}">${record.client_email}</a></p>
          <p><strong>Service:</strong> ${record.service_type || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${record.budget_range || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${record.timeline || 'Not specified'}</p>
          <p><strong>Tech Stack:</strong> ${record.tech_stack?.join(', ') || 'N/A'}</p>
          <p><strong>Required Features:</strong> ${record.features?.join(', ') || 'N/A'}</p>
          <p><strong>Domain Status:</strong> ${record.domain_status || 'N/A'}</p>
          ${record.domain_name ? `<p><strong>Domain Name:</strong> ${record.domain_name}</p>` : ''}
          <div style="margin-top: 20px; padding: 10px; background: #f9f9f9; border-radius: 5px;">
            <p style="font-size: 12px; color: #666;">This lead was automatically captured via the Geeks Crowd website wizard.</p>
          </div>
        </div>
      `
    })

    // 2. Send Automated Confirmation to Customer
    if (record.client_email) {
      await resend.emails.send({
        from: 'Geeks Crowd <info@geekscrowd.com>', 
        to: record.client_email,
        subject: 'We received your project brief! - Geeks Crowd',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h1 style="color: #6366f1;">Hi there!</h1>
            <p>Thank you for reaching out to <strong>Geeks Crowd</strong>. We've received your project brief for <strong>${record.project_name || 'your upcoming project'}</strong>.</p>
            <p>Our team is currently reviewing your requirements for <strong>${record.service_type}</strong> and we'll get back to you shortly to discuss the next steps.</p>
            
            <div style="background: #f4f4f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Summary of your request:</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Service:</strong> ${record.service_type}</li>
                <li><strong>Budget:</strong> ${record.budget_range}</li>
                <li><strong>Timeline:</strong> ${record.timeline}</li>
              </ul>
            </div>

            <p>Looking forward to potentially working together!</p>
            <br/>
            <p>Best Regards,</p>
            <p><strong>The Geeks Crowd Team</strong></p>
            <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; font-size: 12px; color: #999;">
              <p>Geeks Crowd | High-Performance Digital Solutions</p>
            </div>
          </div>
        `
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})
