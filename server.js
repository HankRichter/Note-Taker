const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();
let db = JSON.parse(fs.readFileSync("db/db.json"));

const PORT = process.env.PORT || 3000;

