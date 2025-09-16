const User = require("../db-models/user-model");
const nodemailer = require("nodemailer");

const mail = async (req, res, next) => {
    const { useremail, phone, text } = req.body;
    try {
        const admins = await User.find({ isAdmin: true });
        console.log(admins);
        

        if (admins && admins.length > 0) {
            const adminEmails = admins.map(admin => admin.email).join(',');

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            let mailOptions = {
                from: process.env.EMAIL,
                to: adminEmails,
                subject: 'Emergency Alert',
                html: `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <style>
                            body {
                                font-family: 'Segoe UI', sans-serif;
                                background-color: #121212;
                                color: #e0e0e0;
                                padding: 0;
                                margin: 0;
                            }
                            .email-container {
                                max-width: 600px;
                                margin: 2rem auto;
                                background-color: #1e1e1e;
                                padding: 2rem;
                                border-radius: 10px;
                                box-shadow: 0 2px 10px rgba(255, 255, 255, 0.05);
                            }
                            .message {
                                font-size: 1rem;
                                margin: 1.5rem 0;
                                line-height: 1.6;
                                color: #cccccc;
                            }
                            .highlight {
                                color: #a093ff;
                                font-weight: 500;
                            }
                            .footer {
                                font-size: 0.85rem;
                                color: #888;
                                text-align: center;
                                margin-top: 2rem;
                                border-top: 1px solid #333;
                                padding-top: 1rem;
                            }
                            a {
                                color: #a093ff;
                                text-decoration: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="message">
                                <p>A user has requested <span class="highlight">Emergency support</span> and agreed to share their information.</p><br/>
                                <p><strong>Email:</strong> ${useremail}</p>
                                <p><strong>Phone:</strong> ${phone}</p>
                                <p><strong>Message:</strong> ${text}</p>
                                <p>Please reach out immediately to provide support.</p><br/>
                            </div>
                            <div class="footer">
                                This is an automated email. Please do not reply.<br/>
                                &copy; 2025 Campus Care. All rights reserved.
                            </div>
                        </div>
                    </body>
                </html>`
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: "Emergency email sent successfully." });
        } else {
            res.status(404).json({ message: "No admin users found." });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        next(error);
    }
}

module.exports = {mail};
