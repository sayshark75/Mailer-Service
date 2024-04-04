"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mail_service_1 = __importDefault(require("../services/mail.service"));
// for access ENV Variables
dotenv_1.default.config();
// A controller to send mail
const MailController = {
    sendMail: async (req, res) => {
        // we request email, name and message from client
        const { email, name, message } = req.body;
        // Modify As per your needs, Put HTML, send to other persons
        // I was sending to myself, for my portfolio contact section
        // Verify if all the fields exists, you can do different validation logic.
        if (typeof email === "string" && typeof name === "string" && typeof message === "string") {
            // everything is ok, then send the mail
            // we will get response of mail status in "info"
            const info = await mail_service_1.default.sendMail(email, message, name);
            // info contains arrays as "accepted" & "rejected"
            if (info.accepted.length > 0) {
                return res.send({ msg: "Mail Send Successfully", status: true });
            }
            if (info.rejected.length > 0) {
                return res.send({ msg: "Unable to Send Mail", status: false });
            }
        }
        else {
            // some property values missing
            res.send({
                msg: "Required Fields not present",
                status: false,
            });
        }
    },
};
exports.default = MailController;
