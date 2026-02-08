import { betterAuth, url } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
// If your Prisma file is located elsewhere, you can change the path
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins: [process.env.APP_URL!],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                required: false
            },
            phone: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },
    emailVerification: {

        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            try {
                const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

                const info = await transporter.sendMail({
                    from: '"Maddison Foo Koch" <riponsaha@ph.com>',
                    to: user.email,
                    subject: "Verify your email address",
                    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:#2563eb; padding:20px; text-align:center; color:#ffffff;">
              <h1 style="margin:0; font-size:24px;">Verify Your Email</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <p style="font-size:16px; margin:0 0 16px;">
                Hi <strong>${user.name}</strong>,
              </p>

              <p style="font-size:15px; line-height:1.6; margin:0 0 20px;">
                Thanks for signing up! Please confirm your email address by clicking the button below.
              </p>

              <div style="text-align:center; margin:30px 0;">
                <a
                  href="${verificationUrl}"
                  style="
                    background:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    padding:14px 28px;
                    border-radius:6px;
                    font-size:16px;
                    display:inline-block;
                  "
                >
                  Verify Email
                </a>
              </div>

              <p style="font-size:14px; color:#555; line-height:1.6;">
                If the button doesn’t work, copy and paste this link into your browser:
              </p>

              <p style="word-break:break-all; font-size:13px; color:#2563eb;">
                ${url}
              </p>

              <p style="font-size:14px; color:#555; margin-top:30px;">
                If you didn’t create an account, you can safely ignore this email.
              </p>

              <p style="font-size:14px; color:#333; margin-top:20px;">
                — The Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#777;">
              © ${new Date().getFullYear()} Your Company. All rights reserved.
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

                console.log("Verification email sent:", info.messageId);
            } catch (err) {
                console.error("Error sending verification email:", err);
                throw err;
            }
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});