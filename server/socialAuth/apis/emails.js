// Configurations
import { emailName, emailUsername, emailPassword, emailHost, emailPort, emailSecure, url } from '../config/const.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: emailSecure,
  auth: {
    user: emailUsername,
    pass: emailPassword
  }
});

export async function sendSignInKey(toEmail, socketId, key) {
  return new Promise((resolve) => {
    try {
      const mailOptions = {
        from: `${emailName} <${emailUsername}>`,
        to: toEmail,
        subject: `${emailName} | Confirm it's you`,
        html: `<body style="background-color: #f9f9f9;">
             <div style="padding: 20px;">
                 <div style="max-width: 640px; margin: 0 auto; box-shadow: 0px 1px 5px rgba(0,0,0,0.1); border-radius: 4px; overflow: hidden;">
                    <div style="margin: 0px auto; max-width: 640px; background: #ffffff;">
                       <table style="font-size: 0px; width: 100%; background: #ffffff;" border="0" cellspacing="0" cellpadding="0" align="center">
                          <tbody>
                             <tr>
                                <td style="text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 40px 70px;">
                                   <div class="mj-column-per-100 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;">
                                      <table border="0" width="100%" cellspacing="0" cellpadding="0">
                                         <tbody>
                                            <tr>
                                               <td style="word-break: break-word; font-size: 0px; padding: 0px 0px 20px;" align="left">
                                                  <div style="cursor: auto; color: #737f8d; font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif; font-size: 16px; line-height: 24px; text-align: left;">
                                                     <h2 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif; font-weight: 500; font-size: 20px; color: #4f545c; letter-spacing: 0.27px;">Hi dear user,</h2>
                                                     <p>click the button below to confirm it's you.</p>
                                                     <p>Or enter the following code manually: <span style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif; font-weight: 500; font-size: 20px; color: #FFA351; letter-spacing: 0.27px;">${key}</span>.</p>
                                                  </div>
                                               </td>
                                            </tr>
                                            <tr>
                                               <td style="word-break: break-word; font-size: 0px; padding: 10px 25px;" align="center">
                                                  <table style="border-collapse: separate;" border="0" cellspacing="0" cellpadding="0" align="center">
                                                     <tbody>
                                                        <tr>
                                                           <td style="border: none; border-radius: 3px; color: white; cursor: auto; padding: 15px 19px;" align="center" valign="middle" bgcolor="#FFA351"><a style="text-decoration: none; line-height: 100%; background: #FFA351; color: white; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: normal; text-transform: none; margin: 0px;" href="${url}/verify-signin/${toEmail}/${socketId}/${key}" target="_blank"> It's me </a></td>
                                                        </tr>
                                                     </tbody>
                                                  </table>
                                               </td>
                                            </tr>
                                         </tbody>
                                      </table>
                                   </div>
                                </td>
                             </tr>
                          </tbody>
                       </table>
                    </div>
                 </div>
                 <div style="margin: 0px auto; max-width: 640px; background: transparent;">
                    <table style="font-size: 0px; width: 100%; background: transparent;" border="0" cellspacing="0" cellpadding="0" align="center">
                       <tbody>
                          <tr>
                             <td style="text-align: center; vertical-align: top; direction: ltr; font-size: 0px; padding: 0px;">
                                <div class="mj-column-per-100 outlook-group-fix" style="vertical-align: top; display: inline-block; direction: ltr; font-size: 13px; text-align: left; width: 100%;">
                                   <table border="0" width="100%" cellspacing="0" cellpadding="0">
                                      <tbody>
                                         <tr>
                                            <td style="word-break: break-word; font-size: 0px;">
                                               <div style="font-size: 1px; line-height: 12px;"> </div>
                                            </td>
                                         </tr>
                                      </tbody>
                                   </table>
                                </div>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
             </body>`
      };
      transporter.sendMail(mailOptions, function (error) {
        if (error) resolve(false);
        resolve(true);
      });
    } catch (err) {
      resolve(false);
    }
  });
}
