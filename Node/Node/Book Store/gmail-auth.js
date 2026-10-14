const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = '240511671334-u0uns5d0fh71l6tt5c9ifakcs89tg3n7.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

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