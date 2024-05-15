function emailTemplate(subject, content) {
  const companyName = process.env.COMPANY_NAME || "Donyati"; 

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f7fafc;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="500" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 20px; text-align: center;">
              <img src="https://yourcompany.com/logo.png" alt="Logo" style="height: 50px; width: 50px; margin-right: 10px;">
              <h1 style="font-size: 24px; font-weight: bold; margin: 0;">${subject}</h1>
            </td>
          </tr>         
          <tr>
            <td style="padding: 20px;">
              <p>${content}</p>
            </td>
          </tr>
          <tr>
          <td style="padding: 20px; text-align: center;">
            <a href="http://localhost:3000" style="display: inline-block; padding: 10px 20px; text-decoration: none; color: white; background-color: #6b46c1; border-radius: 5px;">Explore more</a>
          </td>
        </tr>
          <tr>
            <td style="padding: 20px; color: #666666; text-align: center;">
              <p>Best regards,<br />${companyName}</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
}

module.exports = {
  emailTemplate: emailTemplate,
};
