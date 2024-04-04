"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const date_service_1 = __importDefault(require("./date.service"));
// create and configure a nodemailer Transporter
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // Generate this credentials from google account, in env file
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});
const mailerService = {
    sendMail: async (email, message, name) => {
        const info = await transporter.sendMail({
            // from your email or any other persons email, format must same.
            from: `"${process.env.USER}" <${process.env.APP_EMAIL}>`,
            // to the user email
            to: `${process.env.APP_EMAIL}`,
            // subject line
            subject: `Message From: ${name}`,
            // Whatever text you want to send,
            text: `User ${name}, having email as ${email},\n Says: ${message} :\n Date:${(0, date_service_1.default)("Asia/Kolkata")}`,
            // Whatever HTML you want to send
            html: "",
        });
        return info;
    },
};
exports.default = mailerService;
