const API_KEY = 'E0EqQOqcDrC0rK3BYlSC2aOU1sxwlrFo';
    const MODEL_ENDPOINT = 'https://api.deepinfra.com/v1/inference/lizpreciatior/lzlv_70b_fp16_hf';

    // Function to send the user's input to the AI
    async function sendMessage() {
      const userInput = document.getElementById('userInput').value;
      const responseOutput = document.getElementById('responseOutput');

      if (!userInput.trim()) {
        responseOutput.textContent = 'Please enter a message.';
        return;
      }

      // Clear previous response and show loading text
      responseOutput.textContent = 'Loading...';

      const input = {
        input: `A chat.\n\nUSER: ${userInput}\nASSISTANT: `,
        stop: ['USER:', '</s>']
      };

      try {
        const response = await fetch(MODEL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input)
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        const generatedText = data.results[0]?.generated_text || 'No response received.';

        responseOutput.textContent = generatedText;
      } catch (error) {
        responseOutput.textContent = `Error: ${error.message}`;
      }
    }
