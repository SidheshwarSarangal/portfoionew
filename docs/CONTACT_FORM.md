# Google Forms Contact Setup

The contact interface submits directly to a published Google Form and presents progress as a compiler run. It clears inputs only after the request resolves successfully and keeps all values when configuration or submission fails.

## 1. Create the form

Create one Google Form with these five questions:

| Form question | Recommended type | Required in UI |
|---|---|---:|
| First name | Short answer | Yes |
| Last name | Short answer | No |
| Email | Short answer with email validation | Yes |
| Subject | Short answer | No |
| Message | Paragraph | Yes |

Publish the form and allow the intended portfolio visitors to respond. Avoid file-upload questions and account-restricted settings for a public portfolio form.

## 2. Find the entry identifiers

1. Open the form editor.
2. Choose **More → Pre-fill form**.
3. Put a different recognizable sample value in every field.
4. Generate and copy the pre-filled link.
5. Match each sample value to its `entry.<number>` query parameter.

Example:

```text
.../viewform?entry.111=FIRST&entry.222=LAST&entry.333=EMAIL
```

## 3. Configure local development

Create `.env.local` from the committed template:

```bash
cp .env.example .env.local
```

Set the generated values:

```env
VITE_GOOGLE_FORM_ACTION_URL="https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse"
VITE_GOOGLE_FORM_FIRST_NAME_ENTRY="entry.111111111"
VITE_GOOGLE_FORM_LAST_NAME_ENTRY="entry.222222222"
VITE_GOOGLE_FORM_EMAIL_ENTRY="entry.333333333"
VITE_GOOGLE_FORM_SUBJECT_ENTRY="entry.444444444"
VITE_GOOGLE_FORM_MESSAGE_ENTRY="entry.555555555"
```

The action URL is the responder URL with `viewform` replaced by `formResponse`. Restart Vite after changing environment variables.

## 4. Test the full path

```text
[ ] Start npm run dev
[ ] Submit all five fields
[ ] Watch validation, transport linking, and submission output
[ ] Confirm “build finished successfully” and exit code 0
[ ] Confirm the form clears only after success
[ ] Open the Google Form Responses tab
[ ] Confirm every value reached the correct column
[ ] Test a missing configuration value and confirm exit code 1 preserves input
```

## 5. Configure deployment

Add the same six variables to the hosting platform's environment settings, then redeploy. These form IDs are public routing identifiers, not Google account credentials. Never add Google passwords, cookies, OAuth secrets, or private tokens to `VITE_*` variables.

## Operational notes

- Google Forms responds cross-origin with an opaque browser response, so the frontend can confirm request completion but cannot read the stored response back.
- Verify production submissions in the Google Forms Responses tab or its linked Google Sheet.
- If a form question is recreated, its `entry.*` identifier can change; update the environment variable and redeploy.
- For delivery guarantees, spam controls, server-side validation, or transactional email, replace this browser transport with a serverless endpoint.
