"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const date_service_1 = __importDefault(require("./date.service"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});
const mailerService = {
    sendMail: async (email, message, name) => {
        const info = await transporter.sendMail({
            from: `"${process.env.USER}" <${process.env.APP_EMAIL}>`,
            to: `${process.env.APP_EMAIL}`,
            subject: `Message From: ${name}`,
            text: `User ${name}, having email as ${email},\n Says: ${message} :\n Date:${(0, date_service_1.default)("Asia/Kolkata")}`,
            html: "",
        });
        return info;
    },
};
exports.default = mailerService;
