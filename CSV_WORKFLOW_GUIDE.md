# Managing Applications with CSV Exports

Each application email now includes a CSV file attachment that makes it easy to track and manage applications in Excel or Google Sheets.

## 📊 Quick Start

### Opening CSV Files

1. **Download the CSV attachment** from the application email
2. **Open in Excel/Google Sheets:**
   - Excel: Double-click the CSV file
   - Google Sheets: File → Import → Upload → Select the CSV

### Creating a Master Spreadsheet

**Option 1: Manual Copy-Paste**
1. Create a new spreadsheet with these headers:
   ```
   Timestamp | Full Name | Email | Phone | Degree Program | Year of Study | LinkedIn | GitHub | Has Team | Want Team Assignment | Team Members | First Track | Second Track | Motivation | CV File
   ```
2. Open each CSV attachment
3. Copy the data row and paste into your master spreadsheet

**Option 2: Google Sheets Auto-Import (Recommended)**
1. Create a Google Sheet for all applications
2. Add the header row (see above)
3. For each new application:
   - Download CSV from email
   - File → Import → Upload
   - Choose "Append to current sheet"
   - Click Import

## 📋 CSV Column Reference

| Column | Description | Example |
|--------|-------------|---------|
| Timestamp | Submission date/time | `2025-11-16T10:30:00.000Z` |
| Full Name | Applicant's full name | `John Doe` |
| Email | University email | `john.doe@university.edu` |
| Phone | Phone number | `+39 123 456 7890` |
| Degree Program | Degree code | `BEMACS` |
| Year of Study | Academic year | `2nd Year` |
| LinkedIn | Profile URL | `https://linkedin.com/in/...` |
| GitHub | Profile URL (optional) | `https://github.com/...` |
| Has Team | Has existing team | `Yes` / `No` |
| Want Team Assignment | Needs team assignment | `Yes` / `No` |
| Team Members | List of teammates | `Jane Smith, jane@uni.edu \| ...` |
| First Track | Preferred track | `Tech Track (Hiop & Tada)` |
| Second Track | Alternative track | `Entrepreneurial Track (...)` |
| Motivation | Application essay | Applicant's motivation text |
| CV File | CV filename | `John_Doe_CV.pdf` |

## 💡 Tips & Tricks

### Tracking Application Status

Add these columns to your master spreadsheet:
- **Status:** `New`, `Reviewed`, `Accepted`, `Rejected`, `Waitlist`
- **Reviewer:** Who reviewed the application
- **Notes:** Internal comments
- **Decision Date:** When decision was made

### Filtering Applications

Use Excel/Sheets filters to:
- View only `Tech Track` applicants
- See applicants who need team assignment
- Filter by degree program or year
- Sort by submission timestamp

### Sample Master Sheet Structure

```
| Timestamp | Full Name | Email | ... | Status | Reviewer | Notes | Decision Date |
|-----------|-----------|-------|-----|--------|----------|-------|---------------|
| ...CSV data...                | New    | -        | -     | -             |
```

### Bulk Operations

**Mark multiple applications:**
1. Filter applications (e.g., all BEMACS students)
2. Select multiple rows
3. Update status column for all selected

**Export filtered list:**
1. Apply filters
2. File → Download → CSV
3. Share with team members

## 🔄 Workflow Example

1. **Receive application email** → Download CSV + CV
2. **Import CSV** to master spreadsheet
3. **Review application:**
   - Read motivation in spreadsheet
   - Download and review CV from email
4. **Update status** in spreadsheet
5. **Filter & export** accepted applicants
6. **Send acceptance emails** using email column

## 📈 Analytics

Use spreadsheet formulas for insights:

### Count by Track
```
=COUNTIF(L:L,"Tech Track*")
```

### Team vs Solo
```
=COUNTIF(I:I,"Yes")  // Has team
=COUNTIF(J:J,"Yes")  // Needs assignment
```

### By Degree Program
```
=COUNTIF(E:E,"BEMACS")
```

### Acceptance Rate
```
=COUNTIF(Status,"Accepted")/COUNTA(Status)
```

## 🔐 Data Privacy

**Important reminders:**
- Keep the master spreadsheet private
- Share only with authorized reviewers
- Don't share applicant data publicly
- Download CVs securely from emails
- Delete old applications per GDPR requirements

## 🛠️ Troubleshooting

### CSV opens with wrong encoding
- Open Excel/Sheets → File → Import
- Select UTF-8 encoding
- Delimiters: Comma

### Team Members column looks messy
- Team members are separated by ` | ` (pipe)
- Can use Find & Replace to format differently

### Special characters appear as symbols
- Make sure UTF-8 encoding is selected on import
- Re-import the CSV with correct encoding

## 📚 Advanced: Google Sheets Automation

Create a Google Apps Script to auto-import CSVs from Gmail:

1. Extensions → Apps Script
2. Use Gmail API to fetch attachment
3. Parse CSV and append to sheet
4. Set up time-based trigger

(This requires technical setup - contact your developer if needed)

## ✅ Best Practices

1. **Import daily** - Don't let applications pile up
2. **Backup regularly** - Download spreadsheet weekly
3. **Use filters** - Don't manually scroll through hundreds of rows
4. **Add status immediately** - Mark as "New" when imported
5. **Keep CVs organized** - Create folder structure by acceptance status
6. **Document decisions** - Add notes for future reference
