"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendingservice = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});
const sendingservice = async (req, res) => {
    const { email, name, message } = req.body;
    const date = new Date();
    // Modify As per your needs, Put HTML, send to other persons
    // I was sending to myself, for my portfolio contact section
    if (email && name && message) {
        const info = await transporter.sendMail({
            from: `"${process.env.USER}" <${process.env.APP_EMAIL}>`,
            to: `${process.env.APP_EMAIL}`,
            subject: `Message From: ${name}`,
            text: `User ${name}, having emails as ${email},\n Says: ${message} :\n Date:${date.toLocaleTimeString() + " - " + date.toLocaleDateString()}`,
            html: "",
        });
        if (info.accepted.length > 0) {
            return res.send({ msg: "Mail Send Successfully", status: true });
        }
        if (info.rejected.length > 0) {
            return res.send({ msg: "Unable to Send Mail", status: false });
        }
    }
    else {
        res.send({
            msg: "Required Fields not present",
            status: false,
        });
    }
};
exports.sendingservice = sendingservice;
