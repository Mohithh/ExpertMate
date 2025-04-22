import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, number, email, message, location, preferredTime, urgency } = await req.json();

  // Check for missing fields
  const requiredFields = { name, number, email, message, location, preferredTime, urgency };
  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return new Response(
      JSON.stringify({ 
        error: "Missing required fields", 
        missingFields 
      }), 
      { status: 400 }
    );
  }

  // Create nodemailer transport
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Base64 encoded SettleSmart logo (replace with your actual base64)
    const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';

    // Modern icon set (using Font Awesome inspired icons in base64)
    const icons = {
      contact: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjMjU2M2ViIj48cGF0aCBkPSJNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptMCA0OGM0MC44IDAgNzQgMzMuMiA3NCA3NHMtMzMuMiA3NC03NCA3NC03NC0zMy4yLTc0LTc0IDMzMi03NCA3NC03NHptMCAzMjBjLTQ4LjYgMC05My4zLTI2LjUtMTE0LjktNjktMjUuNS00OC4yLTQwLjEtMTAxLjEtNDAuMS0xNTUgMC0xNy43IDE0LjMtMzIgMzItMzJoNjQuNWMxMi4yIDAgMjMuNCA2LjggMjkuMSAxNy43IDQwLjYgNzEuMSAxMTYuMiAxMTkuNyAxOTkuMSAxMTkuNyA4Mi45IDAgMTU4LjUtNDguNiAxOTkuMS0xMTkuNyA1LjctMTAuOSAxNi45LTE3LjcgMjkuMS0xNy43SDQ3OGMxNy43IDAgMzIgMTQuMyAzMiAzMiAwIDUzLjktMTQuNiAxMDYuOC00MC4xIDE1NUMzNDkuMyAzNTkuNSAzMDQuNiAzODQgMjU2IDM4NHoiLz48L3N2Zz4=',
      calendar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIiBmaWxsPSIjMjU2M2ViIj48cGF0aCBkPSJNMTI4IDB2MzJoMTkyVjBIMTI4em0zMjAgODB2MzUyYzAgMjYuNS0yMS41IDQ4LTQ4IDQ4SDQ4Yy0yNi41IDAtNDgtMjEuNS00OC00OFY4MGMwLTI2LjUgMjEuNS00OCA0OC00OGgxNnY0OGgyNTZWMzJoMTZjMjYuNSAwIDQ4IDIxLjUgNDggNDh6TTk2IDI0MGMwLTguOCA3LjItMTYgMTYtMTZoMzJjOC44IDAgMTYgNy4yIDE2IDE2djMyYzAgOC44LTcuMiAxNi0xNiAxNmgtMzJjLTguOCAwLTE2LTcuMi0xNi0xNnYtMzJ6bTAgOTZjMC04LjggNy4yLTE2IDE2LTE2aDMyYzguOCAwIDE2IDcuMiAxNiAxNnYzMmMwIDguOC03LjIgMTYtMTYgMTZoLTMyYy04LjggMC0xNi03LjItMTYtMTZ2LTMyem05Ni05NmMwLTguOCA3LjItMTYgMTYtMTZoMzJjOC44IDAgMTYgNy4yIDE2IDE2djMyYzAgOC44LTcuMiAxNi0xNiAxNmgtMzJjLTguOCAwLTE2LTcuMi0xNi0xNnYtMzJ6bTAgOTZjMC04LjggNy4yLTE2IDE2LTE2aDMyYzguOCAwIDE2IDcuMiAxNiAxNnYzMmMwIDguOC03LjIgMTYtMTYgMTZoLTMyYy04LjggMC0xNi03LjItMTYtMTZ2LTMyem05Ni05NmMwLTguOCA3LjItMTYgMTYtMTZoMzJjOC44IDAgMTYgNy4yIDE2IDE2djMyYzAgOC44LTcuMiAxNi0xNiAxNmgtMzJjLTguOCAwLTE2LTcuMi0xNi0xNnYtMzJ6TTE0NCA0ODBoMTYwYzguOCAwIDE2LTcuMiAxNi0xNnYtMzJjMC04LjgtNy4yLTE2LTE2LTE2SDE0NGMtOC44IDAtMTYgNy4yLTE2IDE2djMyYzAgOC44IDcuMiAxNiAxNiAxNnoiLz48L3N2Zz4=',
      urgent: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTEyIiBmaWxsPSIjZGMyNjI2Ij48cGF0aCBkPSJNNTY5LjUxNCA0NDEuNjMyTDMxOC4zNzggNjcuMzk1Yy0xOC43MDktMjQuOTQ2LTUyLjg1NC0yNC45NDYtNzEuNTYzIDBMMy40ODYgNDQxLjYzMkMtMTIuOTYzIDQ2Ni45MzkgMTUuMzY4IDQ5NiA0My44NTIgNDk2aDQ4OC4yOTZjMjguNDg0IDAgNTYuODE1LTI5LjA2MSA0My4zNjYtNTQuMzY4ek0yODggNDE0YzAtMTYuNSAxMy41LTMwIDMwLTMwczMwIDEzLjUgMzAgMzAtMTMuNSAzMC0zMCAzMC0zMC0xMy41LTMwLTMwem0zMC0xNjJjLTE2LjUgMC0zMCAxMy41LTMwIDMwdjEwOGMwIDE2LjUgMTMuNSAzMCAzMCAzMHMzMC0xMy41IDMwLTMwVjI4MmMwLTE2LjUtMTMuNS0zMC0zMC0zMHoiLz48L3N2Zz4=',
      message: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjMjU2M2ViIj48cGF0aCBkPSJNNDQ4IDBjMzUuMyAwIDY0IDI4LjcgNjQgNjR2Mjg4YzAgMzUuMy0yOC43IDY0LTY0IDY0SDE0NGMtMTcuNyAwLTM0LjUtNy4xLTQ2LjktMTkuNkw5LjQgNDY5LjFDMy4xIDQ3Mi4zIDAgNDc4LjggMCA0ODUuN2MwIDE5LjggMTYuMSAzNS43IDM1LjcgMzUuNyAxMS4zIDAgMjIuMS02LjIgMjcuOS0xNkwxMDcuNiAzMjEuMWMxMi41LTEyLjQgMjkuOC0xOS43IDQ3LjktMTkuN2gzMjB6TTY0IDgwdjI4OGMwIDguOCA3LjIgMTYgMTYgMTZoMzIwYzguOCAwIDE2LTcuMiAxNi0xNlY4MGMwLTguOC03LjItMTYtMTYtMTZINjRjLTguOCAwLTE2IDcuMi0xNiAxNnptOTYgNjR2MzJjMCAxNy43IDE0LjMgMzIgMzIgMzJoMTkyYzE3LjcgMCAzMi0xNC4zIDMyLTMydi0zMmMwLTE3LjctMTQuMy0zMi0zMi0zMkgxOTJjLTE3LjcgMC0zMiAxNC4zLTMyIDMyem0wIDk2djMyYzAgMTcuNyAxNC4zIDMyIDMyIDMyaDEyOGMxNy43IDAgMzItMTQuMyAzMi0zMnYtMzJjMC0xNy43LTE0LjMtMzItMzItMzJIMTkyYy0xNy43IDAtMzIgMTQuMy0zMiAzMnoiLz48L3N2Zz4=',
      check: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjMTZhMzQ0Ij48cGF0aCBkPSJNMTczLjkgNDM5LjRsMTY2LjQtMTY2LjRjOS43LTkuNyA5LjctMjUuNSAwLTM1LjJsLTIzLjQtMjMuNGMtOS43LTkuNy0yNS41LTkuNy0zNS4yIDBMMTkyIDMzNi4xIDk2LjMgMjQwLjRjLTkuNy05LjctMjUuNS05LjctMzUuMiAwTDQzLjkgMjYzLjhjLTkuNyA5LjctOS43IDI1LjUgMCAzNS4ybDEzMCAxMzBjOS43IDkuNyAyNS41IDkuNyAzNS4yIDB6TTUxMiA0NDh2LTU3LjZjMC0xMy4zLTguMy0yNS4zLTIwLjgtMzAuMUwzNjEuOCAyNzQuOGMtMTMuOS02LjgtMzAuNy0xLjktMzcuNiAxMS45bC0xMy44IDI4LjFjLTYuOCAxMy45LTEuOSAzMC43IDExLjkgMzcuNkw0MzIgMzQ0LjR2NTcuNmMwIDguOCA3LjIgMTYgMTYgMTZoMzJjOC44IDAgMTYtNy4yIDE2LTE2eiIvPjwvc3ZnPg==',
      location: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIiBmaWxsPSIjMjU2M2ViIj48cGF0aCBkPSJNMTY4LjMgNDk5LjJDMjE2LjEgNDM1LjkgMjU2IDM0Ni4yIDI1NiAyNTZjMC0xMDYuMS04NS45LTE5Mi0xOTItMTkyUzAgMTQ5LjkgMCAyNTZjMCA5MC4yIDM5LjkgMTc5LjkgODcuNyAyNDMuMmMxNS4xIDE5LjcgMzkuOCAzMS4yIDY0LjMgMzEuMmczNC4yLTExLjUgNDkuMy0zMS4xem0tODAuOC0xNjEuNWMwIDQ0LjEgMzUuNyA4MCA4MCA4MHM4MC0zNS45IDgwLTgwLTM1LjctODAtODAtODAtODAgMzUuOS04MCA4MHptODAtNzJjMzkuNyAwIDcyIDMyLjMgNzIgNzJzLTMyLjMgNzItNzIgNzItNzItMzIuMy03Mi03MiAzMi4zLTcyIDcyLTcyeiIvPjwvc3ZnPg==',
      time: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjMjU2M2ViIj48cGF0aCBkPSJNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptMCA0NDhjLTExMC41IDAtMjAwLTg5LjUtMjAwLTIwMFMxNDUuNSA1NiAyNTYgNTZzMjAwIDg5LjUgMjAwIDIwMC04OS41IDIwMC0yMDAgMjAwem02MS44LTI0NS4zbC04NC45LTYxLjdjLTMuMS0yLjItNi45LTMuNS0xMC43LTMuNS0xMS4zIDAtMjAuNCA5LjEtMjAuNCAyMC40djE0NGMwIDcuOCA0LjIgMTQuOSAxMC41IDE4LjcgNi4zIDMuOCAxNC4xIDMuMSAxOS44LTEuN2w4NC45LTYxLjdjNC4yLTMuMSA2LjgtOC4yIDYuOC0xMy43cy0yLjYtMTAuNi02LjgtMTMuN3oiLz48L3N2Zz4=',
      user: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIiBmaWxsPSIjMjU2M2ViIj48cGF0aCBkPSJNMjI0IDI1NmM3MC43IDAgMTI4LTU3LjMgMTI4LTEyOFMyOTQuNyAwIDIyNCAwUzk2IDU3LjMgOTYgMTI4czU3LjMgMTI4IDEyOCAxMjh6bTg5LjYgMzJoLTE3OS4yQzU5LjEgMjg4IDAgMzQ3LjEgMCA0MTkuMnY0NC42QzAgNDkwLjcgMjEuMyA1MTIgNDguMiA1MTJoMzUxLjZjMjYuOCAwIDQ4LjItMjEuMyA0OC4yLTQ4LjJ2LTQ0LjZjMC03Mi4xLTU5LjEtMTMxLjItMTMxLjItMTMxLjJ6Ii8+PC9zdmc+',
      phone: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjMjU2M2ViIj48cGF0aCBkPSJNNDkzLjQgMjQuNmMtMTEuNC0xMS40LTI5LjktMTEuNC00MS4zIDBsLTgxLjMgODEuM0MzMzkuNiA4NS4zIDMwMS4xIDgwIDI1NiA4MGMtMTI3LjQgMC0yMzIgMTA0LjYtMjMyIDIzMnMxMDQuNiAyMzIgMjMyIDIzMkM0MDcuNCA1NDQgNTEyIDQzOS40IDUxMiAzMTJjMC00NS4xLTUuMy04My42LTI1LjktMTE0LjdsODEuMy04MS4zYzExLjQtMTEuNCAxMS40LTI5LjkgMC00MS4zTDM2Mi4zIDEyLjNjLTExLjQtMTEuNC0yOS45LTExLjQtNDEuMyAwTDI5OC42IDc0LjNjLTIuNyAyLjctMy4yIDYuOS0xLjIgMTAuMUMzMjMuOCAxMTQuOCAzMzYgMTYwLjcgMzM2IDMxMmMwIDE1MC43LTEyMi4yIDI3Mi0yNzIgMjcyUy0xNiA0NjIuNy0xNiAzMTJzMTIyLjItMjcyIDI3Mi0yNzJjNTEuMyAwIDk3LjEgMTIuMiAxMjcuNyAzOC41YzMuMiAyIDcuNCAxLjUgMTAuMS0xLjJsNjEuOC02MS44eiIvPjwvc3ZnPg==',
      legal: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjMjU2M2ViIj48cGF0aCBkPSJNNDQ4IDM4NHY2NGMwIDE3LjctMTQuMyAzMi0zMiAzMkg5NmMtMTcuNyAwLTMyLTE0LjMtMzItMzJ2LTY0YzAtMTcuNyAxNC4zLTMyIDMyLTMyaDMyMGMxNy43IDAgMzIgMTQuMyAzMiAzMnptLTMyLTEyOEg5NmMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2NjRjMCAxNy43IDE0LjMgMzIgMzIgMzJoMzIwYzE3LjcgMCAzMi0xNC4zIDMyLTMydi02NGMwLTE3LjctMTQuMy0zMi0zMi0zMnptLTY0LTE2MHYzMmMwIDguOC03LjIgMTYtMTYgMTZoLTk2Yy04LjggMC0xNi03LjItMTYtMTZ2LTMyYzAtOC44IDcuMi0xNiAxNi0xNmg5NmM4LjggMCAxNiA3LjIgMTYgMTZ6TTI1NiAwYzUzIDAgOTYgNDMgOTYgOTZzLTQzIDk2LTk2IDk2LTk2LTQzLTk2LTk2IDQzLTk2IDk2LTk2eiIvPjwvc3ZnPg=='
    };

    // Email to SettleSmart team (HTML version)
    const teamHtml = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
        <!-- Header with gradient and logo -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%); color: white; padding: 32px 24px; text-align: center; position: relative;">
          <div style="position: absolute; top: 24px; left: 24px;">
            <img src="${logoBase64}" alt="SettleSmart Logo" style="height: 36px;"/>
          </div>
          <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; display: flex; align-items: center; justify-content: center; gap: 12px;">
            <img src="${icons.contact}" width="28" height="28" style="vertical-align: middle; filter: brightness(0) invert(1);" />
            New Client Inquiry
          </h1>
          <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9; font-weight: 500;">SettleSmart Resolution Services</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 32px 24px; background-color: #ffffff;">
          <!-- Contact Details Card -->
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #2563eb; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
            <h2 style="color: #1e293b; font-size: 18px; margin-top: 0; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; font-weight: 600;">
              <img src="${icons.user}" width="22" height="22" style="vertical-align: middle;" />
              Contact Details
            </h2>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; width: 35%; font-weight: 500; color: #475569; display: flex; align-items: center; gap: 8px;">
                  <img src="${icons.user}" width="18" height="18" style="vertical-align: middle;" />
                  Name:
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #475569; display: flex; align-items: center; gap: 8px;">
                  <img src="${icons.phone}" width="18" height="18" style="vertical-align: middle;" />
                  Phone:
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
                  <a href="tel:${number}" style="color: #2563eb; text-decoration: none;">${number}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #475569; display: flex; align-items: center; gap: 8px;">
                  <img src="${icons.message}" width="18" height="18" style="vertical-align: middle;" />
                  Email:
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #475569; display: flex; align-items: center; gap: 8px;">
                  <img src="${icons.location}" width="18" height="18" style="vertical-align: middle;" />
                  Location:
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${location}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: 500; color: #475569; display: flex; align-items: center; gap: 8px;">
                  <img src="${icons.time}" width="18" height="18" style="vertical-align: middle;" />
                  Preferred Time:
                </td>
                <td style="padding: 12px 0; font-weight: 600; color: #1e293b; display: flex; align-items: center; gap: 8px;">
                  <img src="${icons.calendar}" width="18" height="18" style="vertical-align: middle;" />
                  ${preferredTime}
                </td>
              </tr>
            </table>
          </div>

          <!-- Priority & Message Grid -->
          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 16px; margin-bottom: 24px;">
            <!-- Priority Card -->
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; border-left: 4px solid ${urgency === 'Urgent' ? '#dc2626' : '#16a34a'}; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
              <h3 style="color: #1e293b; font-size: 16px; margin-top: 0; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; font-weight: 600;">
                <img src="${icons.urgent}" width="20" height="20" style="vertical-align: middle;" />
                Priority Level
              </h3>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="background-color: ${urgency === 'Urgent' ? '#fee2e2' : '#dcfce7'}; color: ${urgency === 'Urgent' ? '#b91c1c' : '#166534'}; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                  ${urgency}
                </span>
                ${urgency === 'Urgent' ? `<img src="${icons.urgent}" width="16" height="16" style="vertical-align: middle;" />` : `<img src="${icons.check}" width="16" height="16" style="vertical-align: middle;" />`}
              </div>
            </div>

            <!-- Message Card -->
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; border-left: 4px solid #2563eb; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
              <h3 style="color: #1e293b; font-size: 16px; margin-top: 0; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; font-weight: 600;">
                <img src="${icons.message}" width="20" height="20" style="vertical-align: middle;" />
                Client Message
              </h3>
              <div style="white-space: pre-line; font-size: 15px; line-height: 1.6; color: #334155; background-color: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
                ${message}
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 8px;">
            <a href="tel:${number}" style="display: flex; align-items: center; justify-content: center; gap: 8px; background-color: #f8fafc; color: #2563eb; padding: 12px; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 14px; border: 1px solid #e2e8f0; transition: all 0.2s;">
              <img src="${icons.phone}" width="16" height="16" style="vertical-align: middle;" />
              Call Client
            </a>
            <a href="mailto:${email}" style="display: flex; align-items: center; justify-content: center; gap: 8px; background-color: #2563eb; color: white; padding: 12px; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 14px; transition: all 0.2s;">
              <img src="${icons.message}" width="16" height="16" style="vertical-align: middle; filter: brightness(0) invert(1);" />
              Email Reply
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0 0 8px;">This inquiry was submitted via SettleSmart contact form</p>
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
            <img src="${logoBase64}" alt="SettleSmart Logo" style="height: 20px; opacity: 0.8;"/>
            <p style="margin: 0; font-weight: 500;">© ${new Date().getFullYear()} SettleSmart Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;

    // Confirmation email to the user (HTML version)
    const userHtml = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
        <!-- Header with gradient and logo -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%); color: white; padding: 32px 24px; text-align: center; position: relative;">
          <div style="position: absolute; top: 24px; left: 24px;">
            <img src="${logoBase64}" alt="SettleSmart Logo" style="height: 36px;"/>
          </div>
          <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; display: flex; align-items: center; justify-content: center; gap: 12px;">
            <img src="${icons.check}" width="28" height="28" style="vertical-align: middle; filter: brightness(0) invert(1);" />
            Thank You, ${name}!
          </h1>
          <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9; font-weight: 500;">We've received your inquiry</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 32px 24px; background-color: #ffffff;">
          <p style="margin-top: 0; margin-bottom: 24px; font-size: 15px; line-height: 1.6; color: #334155;">
            Dear ${name},<br><br>
            Thank you for contacting <strong style="color: #2563eb;">SettleSmart Solutions</strong>. 
            We've received your inquiry and one of our resolution specialists will review it shortly.
          </p>
          
          <!-- Reference Card -->
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #2563eb; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
            <h2 style="color: #1e293b; font-size: 18px; margin-top: 0; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; font-weight: 600;">
              <img src="${icons.legal}" width="22" height="22" style="vertical-align: middle;" />
              Your Case Details
            </h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 15px;">
              <div>
                <p style="margin: 0 0 6px; color: #475569; font-weight: 500; display: flex; align-items: center; gap: 8px; font-size: 14px;">
                  <img src="${icons.check}" width="16" height="16" style="vertical-align: middle;" />
                  Reference Number
                </p>
                <p style="margin: 0; font-weight: 600; color: #1e293b; letter-spacing: 0.5px;">SS-${Math.floor(100000 + Math.random() * 900000)}</p>
              </div>
              <div>
                <p style="margin: 0 0 6px; color: #475569; font-weight: 500; display: flex; align-items: center; gap: 8px; font-size: 14px;">
                  <img src="${icons.calendar}" width="16" height="16" style="vertical-align: middle;" />
                  Submission Date
                </p>
                <p style="margin: 0; font-weight: 600; color: #1e293b;">${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div>
                <p style="margin: 0 0 6px; color: #475569; font-weight: 500; display: flex; align-items: center; gap: 8px; font-size: 14px;">
                  <img src="${icons.phone}" width="16" height="16" style="vertical-align: middle;" />
                  Contact Number
                </p>
                <p style="margin: 0; font-weight: 600; color: #1e293b;">${number}</p>
              </div>
              <div>
                <p style="margin: 0 0 6px; color: #475569; font-weight: 500; display: flex; align-items: center; gap: 8px; font-size: 14px;">
                  <img src="${icons.location}" width="16" height="16" style="vertical-align: middle;" />
                  Service Location
                </p>
                <p style="margin: 0; font-weight: 600; color: #1e293b;">${location}</p>
              </div>
              <div>
                <p style="margin: 0 0 6px; color: #475569; font-weight: 500; display: flex; align-items: center; gap: 8px; font-size: 14px;">
                  <img src="${icons.time}" width="16" height="16" style="vertical-align: middle;" />
                  Preferred Time
                </p>
                <p style="margin: 0; font-weight: 600; color: #1e293b; display: flex; align-items: center; gap: 6px;">
                  <img src="${icons.calendar}" width="16" height="16" style="vertical-align: middle;" />
                  ${preferredTime}
                </p>
              </div>
              <div>
                <p style="margin: 0 0 6px; color: #475569; font-weight: 500; display: flex; align-items: center; gap: 8px; font-size: 14px;">
                  <img src="${icons.urgent}" width="16" height="16" style="vertical-align: middle;" />
                  Priority Level
                </p>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="background-color: ${urgency === 'Urgent' ? '#fee2e2' : '#dcfce7'}; color: ${urgency === 'Urgent' ? '#b91c1c' : '#166534'}; padding: 4px 8px; border-radius: 20px; font-size: 13px; font-weight: 600;">
                    ${urgency}
                  </span>
                  ${urgency === 'Urgent' ? `<img src="${icons.urgent}" width="14" height="14" style="vertical-align: middle;" />` : `<img src="${icons.check}" width="14" height="14" style="vertical-align: middle;" />`}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Message Preview -->
          <div style="margin-bottom: 24px;">
            <h3 style="color: #1e293b; font-size: 16px; margin-top: 0; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; font-weight: 600;">
              <img src="${icons.message}" width="20" height="20" style="vertical-align: middle;" />
              Your Message Summary
            </h3>
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; font-size: 15px; line-height: 1.6; color: #334155; border: 1px solid #e2e8f0; white-space: pre-line;">
              ${message}
            </div>
          </div>
          
          <!-- Next Steps -->
          <div style="background-color: #f0fdf4; border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #16a34a; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
            <h3 style="color: #166534; font-size: 16px; margin-top: 0; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; font-weight: 600;">
              <img src="${icons.check}" width="20" height="20" style="vertical-align: middle;" />
              What Happens Next?
            </h3>
            <ul style="margin: 0; padding-left: 0; list-style-type: none; font-size: 14px; color: #166534;">
              <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;">
                <img src="${icons.check}" width="18" height="18" style="margin-top: 2px; flex-shrink: 0;" />
                <div>
                  <strong style="display: block; margin-bottom: 2px;">Case Review</strong>
                  Our team will review your inquiry within 24 hours (or sooner for urgent matters)
                </div>
              </li>
              <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;">
                <img src="${icons.contact}" width="18" height="18" style="margin-top: 2px; flex-shrink: 0;" />
                <div>
                  <strong style="display: block; margin-bottom: 2px;">Initial Contact</strong>
                  We'll reach out at the provided contact details to discuss next steps
                </div>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 10px;">
                <img src="${icons.urgent}" width="18" height="18" style="margin-top: 2px; flex-shrink: 0;" />
                <div>
                  <strong style="display: block; margin-bottom: 2px;">Urgent Matters</strong>
                  For immediate assistance, call our team directly at <strong>+1 (555) 789-1234</strong>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- Contact Info -->
          <div style="background-color: #eff6ff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #2563eb; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
            <h3 style="color: #1e40af; font-size: 16px; margin-top: 0; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; font-weight: 600;">
              <img src="${icons.contact}" width="20" height="20" style="vertical-align: middle;" />
              Need Immediate Help?
            </h3>
            <p style="margin: 0; font-size: 14px; color: #1e40af;">
              Call us directly at <strong>+1 (555) 789-1234</strong> or email <a href="mailto:support@settlesmart.com" style="color: #2563eb; text-decoration: none; font-weight: 500;">support@settlesmart.com</a>
            </p>
          </div>
          
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #334155;">
            Thank you for choosing <strong style="color: #2563eb;">SettleSmart Solutions</strong>. We look forward to helping you achieve a favorable resolution.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0 0 8px;">SettleSmart Resolution Services | 500 Resolution Way, Suite 200 | New York, NY 10001</p>
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
            <img src="${logoBase64}" alt="SettleSmart Logo" style="height: 20px; opacity: 0.8;"/>
            <p style="margin: 0; font-weight: 500;">© ${new Date().getFullYear()} SettleSmart Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;

    // Send emails
    await transporter.sendMail({
      from: `"SettleSmart Solutions" <${process.env.EMAIL_FROM}>`,
      to: process.env.COMPANY_EMAIL,
      subject: `📋 New Case Inquiry: ${name} (${urgency}) | SS-${Math.floor(100000 + Math.random() * 900000)}`,
      text: `New client inquiry received:\n\nName: ${name}\nPhone: ${number}\nEmail: ${email}\nLocation: ${location}\nPreferred Time: ${preferredTime}\nUrgency: ${urgency}\n\nMessage:\n${message}`,
      html: teamHtml
    });

    await transporter.sendMail({
      from: `"SettleSmart Solutions" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "✅ We've received your inquiry | SettleSmart Solutions",
      text: `Dear ${name},\n\nThank you for contacting SettleSmart Solutions.\n\nReference Number: SS-${Math.floor(100000 + Math.random() * 900000)}\n\nWe've received your inquiry and will respond within 24 hours. For urgent matters, please call +1 (555) 789-1234.\n\nYour Message:\n"${message}"\n\nBest regards,\nThe SettleSmart Team`,
      html: userHtml
    });

    return new Response(
      JSON.stringify({ 
        message: "Emails sent successfully!",
        reference: `SS-${Math.floor(100000 + Math.random() * 900000)}`
      }), 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send email",
        details: error.message 
      }), 
      { status: 500 }
    );
  }
}