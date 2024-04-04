"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCurrentDateInTimeZone(timeZone) {
    const currentDate = new Date();
    const options = {
        timeZone: timeZone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    };
    return currentDate.toLocaleString("en-US", options);
}
exports.default = getCurrentDateInTimeZone;
