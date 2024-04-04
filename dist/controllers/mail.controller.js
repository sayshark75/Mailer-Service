"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mail_service_1 = __importDefault(require("../services/mail.service"));
dotenv_1.default.config();
const MailController = {
    sendMail: async (req, res) => {
        const { email, name, message } = req.body;
        if (typeof email === "string" && typeof name === "string" && typeof message === "string") {
            const info = await mail_service_1.default.sendMail(email, message, name);
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
    },
};
exports.default = MailController;
