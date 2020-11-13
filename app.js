const { google } = require("googleapis");
const dotenv = require("dotenv");

const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/calendar",
];

// Configure the environmental variables and
// Check for the right env variables
dotenv.config();
if (
    process.env.CLIENT_EMAIL === undefined ||
    process.env.PRIVATE_KEY === undefined ||
    process.env.FILE_ID === undefined ||
    process.env.RES_ID === undefined ||
    process.env.ACTION === undefined ||
    process.env.HOOK_ID === undefined ||
    process.env.URI === undefined
) {
    console.error("Please have the correct environmental variables defined");
    process.exit(1);
}

const jwt = new google.auth.JWT(process.env.CLIENT_EMAIL, null, process.env.PRIVATE_KEY, SCOPES);

jwt.authorize(async (err, res) => {
    if (process.env.ACTION.toLowerCase() === "create") makeHook();
    else deleteHook();
});

function makeHook() {
    google
        .drive("v3")
        .files.watch({
            fileId: process.env.FILE_ID,
            supportsAllDrives: true,
            requestBody: {
                id: process.env.HOOK_ID,
                type: "web_hook",
                address: process.env.URI,
            },
            auth: jwt,
        })
        .then(console.log)
        .catch(console.error);
}

function deleteHook() {
    google
        .drive("v3")
        .channels.stop({
            auth: jwt,
            requestBody: {
                id: process.env.HOOK_ID,
                resourceId: process.env.RES_ID,
            },
        })
        .then(console.log)
        .catch(console.error);
}
