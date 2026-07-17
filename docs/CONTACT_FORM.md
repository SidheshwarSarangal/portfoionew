# Google Forms Contact Setup

## Contact Flow

```mermaid
sequenceDiagram
  participant Visitor
  participant Portfolio
  participant Form as Google Form
  participant Sheet as Linked Sheet
  Visitor->>Portfolio: Fill contact form
  Portfolio->>Portfolio: Show compiler-style run
  Portfolio->>Form: POST formResponse
  Form->>Sheet: Append row
  Portfolio->>Visitor: Success + clear fields
```

## Form Shape

| Portfolio field | Google Form question | Type |
|---|---|---|
| `firstName` | First name | Short answer |
| `lastName` | Last name | Short answer |
| `email` | Email | Short answer |
| `subject` | Subject | Short answer |
| `message` | Message | Paragraph |

## Setup Map

```mermaid
flowchart TD
  A[Create blank Google Form] --> B[Add five fields]
  B --> C[Responses tab]
  C --> D[Link to Google Sheet]
  D --> E[Open form preview/source]
  E --> F[Find form ID + entry IDs]
  F --> G[Add VITE_* env values]
  G --> H[Restart / redeploy]
  H --> I[Test one message]
```

## Env Values

```env
VITE_GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
VITE_GOOGLE_FORM_FIRST_NAME_ENTRY=entry.111111111
VITE_GOOGLE_FORM_LAST_NAME_ENTRY=entry.222222222
VITE_GOOGLE_FORM_EMAIL_ENTRY=entry.333333333
VITE_GOOGLE_FORM_SUBJECT_ENTRY=entry.444444444
VITE_GOOGLE_FORM_MESSAGE_ENTRY=entry.555555555
```

For this portfolio form:

```env
VITE_GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/1FAIpQLSeA8gSRT5wx_256TFuYcDFxR2WVdOcqBPrcGBXoQjLrhDozSw/formResponse
VITE_GOOGLE_FORM_FIRST_NAME_ENTRY=entry.2097483210
VITE_GOOGLE_FORM_LAST_NAME_ENTRY=entry.164345121
VITE_GOOGLE_FORM_EMAIL_ENTRY=entry.709217032
VITE_GOOGLE_FORM_SUBJECT_ENTRY=entry.1356572923
VITE_GOOGLE_FORM_MESSAGE_ENTRY=entry.307250720
```

## Where Responses Go

```mermaid
flowchart LR
  Submit[Portfolio submit] --> Forms[Google Forms response]
  Forms --> Sheet[Google Sheet row]
  Sheet --> Columns[Timestamp<br/>First name<br/>Last name<br/>Email<br/>Subject<br/>Message]
```

## Test Checklist

```text
[ ] Add env values locally or in Vercel
[ ] Restart dev server or redeploy
[ ] Submit a full test message
[ ] Confirm compiler success screen
[ ] Confirm form clears
[ ] Confirm row appears in linked Google Sheet
```

## Notes

| Point | Meaning |
|---|---|
| Browser response | Google returns opaque `no-cors`; frontend cannot read stored result |
| Credentials | Form IDs and `entry.*` IDs are public routing values |
| Changed question | Recreated fields can change `entry.*`; update env and redeploy |
| Strong guarantees | Use a serverless endpoint if you need spam control or verified delivery |
