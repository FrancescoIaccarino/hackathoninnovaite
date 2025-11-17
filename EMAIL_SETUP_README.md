# INNOVAITE Registration Form - Email Setup

The registration form now sends applications via email using a Netlify serverless function with Gmail SMTP.

## 🚀 Quick Setup

### 1. Install Dependencies

```powershell
npm install
```

This installs the required packages:
- `@netlify/functions` - Netlify serverless functions runtime
- `nodemailer` - Email sending library
- `@types/nodemailer` - TypeScript types for nodemailer

### 2. Configure Gmail App Password

Follow the detailed guide in [GMAIL_SETUP.md](./GMAIL_SETUP.md) to:
1. Enable 2-Factor Authentication on your Gmail
2. Generate an App Password
3. Configure environment variables in Netlify

### 3. Set Up Environment Variables

#### For Local Development (Optional)

```powershell
# Copy the example file
Copy-Item .env.example .env

# Edit .env and add your credentials
```

**Note:** Netlify CLI is required to test functions locally. For production, just deploy to Netlify with environment variables set.

#### For Production (Netlify)

1. Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
2. Add these variables:
   - `GMAIL_USER`: Your Gmail address (e.g., `rexgamification@gmail.com`)
   - `GMAIL_APP_PASSWORD`: Your 16-character app password

### 4. Deploy to Netlify

```powershell
# Build the project
npm run build

# Netlify will automatically detect and deploy the function
```

## 📁 Project Structure

```
innovaite-ai-hub-landing/
├── netlify/
│   └── functions/
│       └── submit-application.ts    # Serverless function for sending emails
├── src/
│   └── components/
│       └── Registration.tsx         # Updated form component
├── .env.example                     # Environment variables template
├── GMAIL_SETUP.md                   # Detailed Gmail setup guide
└── netlify.toml                     # Netlify configuration
```

## 🔧 How It Works

1. User fills out the registration form
2. On submit, form data (including CV as base64) is sent to `/.netlify/functions/submit-application`
3. The Netlify function receives the data and sends an email via Gmail SMTP
4. Email is delivered to your Gmail inbox with:
   - All form fields formatted in HTML
   - CV attached as a PDF
   - Reply-to set to applicant's email

## 📧 Email Format

Each application email includes:
- **Subject:** `INNOVAITE Application - [Full Name]`
- **Body:** Formatted HTML with all application details
- **Attachments:**
  - **CSV file:** `application_[Name]_[timestamp].csv` - Ready to import into Excel/Google Sheets
  - **CV (PDF):** Applicant's CV file

### CSV File Format

The CSV attachment contains all application data in a single row that can be easily copied into a spreadsheet:

| Timestamp | Full Name | Email | Phone | Degree | Year | LinkedIn | GitHub | Has Team | Team Members | Track 1 | Track 2 | Motivation | CV File |
|-----------|-----------|-------|-------|--------|------|----------|--------|----------|--------------|---------|---------|------------|---------|

**Benefits:**
- ✅ Open in Excel, Google Sheets, or Numbers
- ✅ Copy-paste directly into existing spreadsheet
- ✅ All data in structured columns
- ✅ Easy to sort, filter, and analyze applications
- ✅ Unique filename prevents overwriting

## 🧪 Testing

### Test Locally with Netlify CLI

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Run dev server with functions
netlify dev
```

The form will be available at `http://localhost:8888`

### Test in Production

1. Deploy to Netlify
2. Fill out the form on your live site
3. Check your Gmail inbox for the application

## 🐛 Troubleshooting

### Emails not arriving?

- ✅ Check spam/junk folder
- ✅ Verify environment variables are set in Netlify
- ✅ Check Netlify function logs: Site → Functions → submit-application
- ✅ Ensure 2FA is enabled on your Gmail account

### "500 Internal Server Error"?

- Check Netlify function logs for detailed error messages
- Verify your Gmail app password is correct
- Ensure you're using the app password, not regular password

### Form submission timeout?

- Large CV files (>5MB) may cause timeouts
- Check file size before submission
- Consider adding client-side file size validation

## 🔒 Security

- ✅ Environment variables are encrypted in Netlify
- ✅ `.env` is in `.gitignore` to prevent accidental commits
- ✅ App passwords can be revoked anytime from Google Account
- ✅ No credentials stored in client-side code

## 📝 Customization

### Change Email Template

Edit the HTML content in `netlify/functions/submit-application.ts`:

```typescript
const htmlContent = `
  // Your custom HTML template here
`;
```

### Change Recipient Email

Update the `GMAIL_USER` environment variable in Netlify dashboard.

### Add More Form Fields

1. Add field to form state in `Registration.tsx`
2. Add to JSON payload in submit handler
3. Update TypeScript interface in `submit-application.ts`
4. Add to email HTML template

## 📚 Additional Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833)

## 🆘 Support

If you encounter issues:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [GMAIL_SETUP.md](./GMAIL_SETUP.md)
3. Check Netlify function logs for errors
