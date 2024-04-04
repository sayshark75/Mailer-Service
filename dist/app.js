"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const service_routes_1 = __importDefault(require("./routes/service.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const allowedOrigins = [process.env.ORIGIN_GLOBAL, process.env.ORIGIN_LOCAL, process.env.ORIGIN_CLIENT];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use("/mail", service_routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`);
});
