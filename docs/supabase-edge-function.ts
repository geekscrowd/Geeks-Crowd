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
      subject: `New Lead: ${record.project_name || 'New Project Request'}`,
      html: `
        <h1>New Lead Captured</h1>
        <p><strong>Client Email:</strong> ${record.client_email}</p>
        <p><strong>Service:</strong> ${record.service_type}</p>
        <p><strong>Budget:</strong> ${record.budget_range}</p>
        <p><strong>Timeline:</strong> ${record.timeline}</p>
        <p><strong>Tech Stack:</strong> ${record.tech_stack?.join(', ') || 'N/A'}</p>
      `
    })

    // 2. Send Automated Confirmation to Customer
    if (record.client_email) {
      await resend.emails.send({
        from: 'Geeks Crowd <info@geekscrowd.com>', 
        to: record.client_email,
        subject: 'We received your project brief! - Geeks Crowd',
        html: `
          <h1>Hi there!</h1>
          <p>Thank you for reaching out to Geeks Crowd. We've received your brief for <strong>${record.project_name}</strong>.</p>
          <p>Our team is reviewing your requirements for ${record.service_type} and we'll get back to you shortly.</p>
          <br/>
          <p>Best Regards,</p>
          <p>The Geeks Crowd Team</p>
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
