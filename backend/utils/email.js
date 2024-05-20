import nodemailer from "nodemailer";

export const sendEmail = async (option) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const emailOptions = {
        from: "maks14evo@yandex.ru",
        to: option.email,
        subject: option.subject,
        text: option.message
    };
    
    await transporter.sendMail(emailOptions);
};