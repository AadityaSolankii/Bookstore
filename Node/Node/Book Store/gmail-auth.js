const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost:3000/oauth2callback'
);

const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
    prompt: 'consent'
});

console.log('\nOpen this URL in your browser:\n');
console.log(authUrl);
console.log('\nAfter authorization, paste the code here:\n');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Code: ', async (code) => {
    try {
        const { tokens } = await oauth2Client.getToken(code.trim());

        console.log('\n✅ SUCCESS! Save these values:\n');
        console.log('REFRESH_TOKEN=' + tokens.refresh_token);
        console.log('\nAccess token generated successfully.');
    } catch (error) {
        console.error('\n❌ Error:', error.message);
    }

    rl.close();
});