const axios = require('axios');
const readline = require('readline');

// Replace with your API key
const API_KEY = 'E0EqQOqcDrC0rK3BYlSC2aOU1sxwlrFo';

// Set the new API endpoint
const MODEL_ENDPOINT = 'https://api.deepinfra.com/v1/inference/lizpreciatior/lzlv_70b_fp16_hf';

// Create readline interface for console input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to send input to the AI
function sendMessageToAI(userMessage) {
  const input = {
    input: `A chat.\n\nUSER: ${userMessage}\nASSISTANT: `,
    stop: ["USER:", "</s>"]
  };

  axios.post(MODEL_ENDPOINT, input, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    // Log only the generated assistant message
    console.log(response.data.results[0].generated_text);
  })
  .catch(error => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Network or Other Error:", error.message);
    }
  });
}

// Prompt the user for input
rl.question('Enter your message to the AI: ', (userInput) => {
  sendMessageToAI(userInput);
  rl.close();
});
