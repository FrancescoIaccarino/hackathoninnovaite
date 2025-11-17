# Gmail SMTP Setup for INNOVAITE Application Form

This document explains how to configure Gmail SMTP to receive application submissions via Netlify Functions.

## Prerequisites

- A Gmail account to receive applications
- Access to Netlify dashboard for your deployed site

## Step 1: Generate Gmail App Password

1. **Enable 2-Factor Authentication on your Gmail account**
   - Go to https://myaccount.google.com/security
   - Under "Signing in to Google", enable "2-Step Verification"

2. **Create an App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter a name like "INNOVAITE Netlify Function"
   - Click "Generate"
   - **Copy the 16-character password** (you won't be able to see it again)

## Step 2: Configure Environment Variables in Netlify

1. **Go to your Netlify dashboard**
   - Navigate to your site
   - Go to Site settings > Environment variables

2. **Add the following environment variables:**

   | Variable Name | Value | Description |
   |--------------|-------|-------------|
   | `GMAIL_USER` | `your-email@gmail.com` | Your Gmail address |
   | `GMAIL_APP_PASSWORD` | `your-app-password` | The 16-character app password from Step 1 |

3. **Deploy your site**
   - The environment variables will be available after redeployment
   - Trigger a new deploy if it doesn't happen automatically

## Step 3: Test the Form

1. Go to your deployed site
2. Fill out the application form
3. Submit the form
4. Check your Gmail inbox for the application email

## Troubleshooting

### Email not received?

- **Check spam folder**: Gmail might filter the email
- **Verify environment variables**: Make sure they're set correctly in Netlify
- **Check Netlify function logs**: Go to Functions tab in Netlify dashboard
- **Verify 2FA is enabled**: App passwords only work with 2FA enabled

### "Invalid credentials" error?

- Regenerate the app password and update the environment variable
- Make sure you're using the app password, not your regular Gmail password
- Ensure there are no extra spaces in the environment variables

### Function timeout?

- Large file attachments (CV > 5MB) might cause timeouts
- Consider adding file size validation in the form

## Security Notes

- **Never commit** your Gmail password or app password to Git
- Environment variables are encrypted in Netlify
- App passwords can be revoked at any time from Google Account settings
- Each app password is unique to one application

## File Size Limits

- Maximum CV file size: ~5MB (Gmail attachment limit)
- Larger files will fail to send
- Consider implementing client-side file size validation

## Alternative Email Providers

If you prefer not to use Gmail, you can modify the Netlify function to use:
- SendGrid
- AWS SES
- Mailgun
- Any SMTP provider

Just update the `nodemailer` transporter configuration in:
`netlify/functions/submit-application.ts`

## Email Template Customization

To customize the email format, edit the HTML content in:
`netlify/functions/submit-application.ts` at the `htmlContent` variable.
