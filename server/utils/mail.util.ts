// import { SMTP } from "../config/constants.config";
// import logger from "../config/logger.config";
// import { transporter } from "../config/mailer.config";

// interface SendMailOptions {
//   to: string;
//   subject: string;
//   html?: string;
//   text?: string;
// }

// export const sendMail = async ({ to, subject, html, text }: SendMailOptions) => {
//   try {
//     await transporter.sendMail({
//       from: `"AuthKit" <${SMTP.user}>`,
//       to,
//       subject,
//       text,
//       html,
//     });

//     logger.success("Mail sent successfully");
//   } catch (err) {
//     logger.error("Error sending mail " + (err instanceof Error ? err.message : String(err)));
//   }
// };

import { DOMAIN } from "../config/constants.config";
import logger from "../config/logger.config";
import resend from "../config/mailer.config";

interface SendMailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export const sendMail = async ({ to, subject, html }: Omit<SendMailOptions, "text">) => {
  try {
    await resend.emails.send({
      from: `AuthKit <noreply@${DOMAIN}>`,
      to,
      subject,
      html: html ?? "",
    });
    logger.success("Mail sent successfully");
  } catch (err) {
    logger.error("Error sending mail " + (err instanceof Error ? err.message : String(err)));
    throw err;
  }
};
