import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ══════════════════════════════════════
   TYPES
══════════════════════════════════════ */
interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  error?: string;
}

/* ══════════════════════════════════════
   POST /api/contact
══════════════════════════════════════ */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = (await req.json()) as ContactPayload;
    const { name, email, subject, message } = body;

    /* ── Basic validation ── */
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    /* ── Nodemailer transporter ──
       Uses Gmail App Password.
       Set these in .env.local:
         GMAIL_USER=your-gmail@gmail.com
         GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
    ── */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    /* ── Email to YOU (sufyanxen8@gmail.com) ── */
    await transporter.sendMail({
      from: `"NeuromotionTech Contact" <${process.env.GMAIL_USER}>`,
      to: "sufyanxen8@gmail.com",
      replyTo: email,
      subject: `[NeuromotionTech] New message: ${subject || "(no subject)"}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#0d2d45 0%,#257ca3 100%);padding:28px 32px;">
                      <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.55);">
                        NeuromotionTech
                      </p>
                      <h1 style="margin:6px 0 0;font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">
                        New Contact Message
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:28px 32px;">

                      <!-- Fields -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom:20px;border-bottom:1px solid #f1f5f9;">
                            <p style="margin:0 0 4px;font-size:9px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:#94a3b8;">From</p>
                            <p style="margin:0;font-size:15px;font-weight:700;color:#0d2d45;">${escapeHtml(name)}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:20px 0;border-bottom:1px solid #f1f5f9;">
                            <p style="margin:0 0 4px;font-size:9px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:#94a3b8;">Reply To</p>
                            <p style="margin:0;font-size:15px;font-weight:700;color:#257ca3;">${escapeHtml(email)}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:20px 0;border-bottom:1px solid #f1f5f9;">
                            <p style="margin:0 0 4px;font-size:9px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:#94a3b8;">Subject</p>
                            <p style="margin:0;font-size:15px;font-weight:700;color:#0d2d45;">${escapeHtml(subject || "No subject provided")}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:20px 0;">
                            <p style="margin:0 0 10px;font-size:9px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:#94a3b8;">Message</p>
                            <div style="background:#f8fafc;border-radius:10px;padding:16px;border:1px solid #e2e8f0;">
                              <p style="margin:0;font-size:14px;line-height:1.75;color:#334155;white-space:pre-wrap;">${escapeHtml(message)}</p>
                            </div>
                          </td>
                        </tr>
                      </table>

                      <!-- CTA -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                        <tr>
                          <td align="center">
                            <a
                              href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || "Your inquiry")}"
                              style="display:inline-block;background:linear-gradient(135deg,#0d2d45 0%,#257ca3 100%);color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:50px;font-size:12px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;"
                            >
                              Reply to ${escapeHtml(name)}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
                      <p style="margin:0;font-size:10px;color:#94a3b8;text-align:center;">
                        Sent via NeuromotionTech contact form · neuromotiontech.com
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    /* ── Auto-reply to the SENDER ── */
    await transporter.sendMail({
      from: `"NeuromotionTech" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We received your message — NeuromotionTech",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
          <title>We received your message</title>
        </head>
        <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="background:linear-gradient(135deg,#0d2d45 0%,#257ca3 100%);padding:28px 32px;text-align:center;">
                      <h1 style="margin:0;font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">
                        Got your message!
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:32px;text-align:center;">
                      <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.75;">
                        Hi <strong>${escapeHtml(name)}</strong>, thanks for reaching out to NeuromotionTech.
                      </p>
                      <p style="margin:0 0 24px;font-size:14px;color:#64748b;line-height:1.75;">
                        We&apos;ve received your message and will reply to <strong>${escapeHtml(email)}</strong> within 24 hours.
                      </p>
                      <div style="background:#f8fafc;border-radius:10px;padding:16px 20px;border:1px solid #e2e8f0;text-align:left;margin-bottom:24px;">
                        <p style="margin:0 0 6px;font-size:9px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:#94a3b8;">Your message</p>
                        <p style="margin:0;font-size:13px;color:#334155;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
                      </div>
                      <p style="margin:0;font-size:12px;color:#94a3b8;">
                        — The NeuromotionTech Team
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f8fafc;padding:14px 32px;border-top:1px solid #e2e8f0;">
                      <p style="margin:0;font-size:10px;color:#94a3b8;text-align:center;">
                        neuromotiontech.com · sufyanxen8@gmail.com
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("[contact/route] Error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

/* ══════════════════════════════════════
   HELPER — prevent XSS in HTML emails
══════════════════════════════════════ */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}