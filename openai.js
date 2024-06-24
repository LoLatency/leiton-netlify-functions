const fetch = require('node-fetch');
require('dotenv').config();

exports.handler = async function(event, context) {
    const { input } = JSON.parse(event.body);
    const response = await fetch('https://api.openai.com/v1/engines/gpt-4-2024-05-13/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            prompt: input,
            max_tokens: 150,
            temperature: 1,
            top_p: 1,
            n: 1,
            stream: false,
            stop: ["\n"]
        })
    });

    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify({ response: data.choices[0].text })
    };
};
