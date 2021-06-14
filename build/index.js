"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 1992;
app.get("/", (req, res) => {
    res.send("hello from simple server :)");
});
app.listen(port);
console.log(`[app]: http://localhost:${port}`);
