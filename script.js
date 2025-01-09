document.getElementById("submit-btn").addEventListener("click", async () => {
    const input = document.getElementById("totp-input").value;
    const resultEl = document.getElementById("result");
  
    // Clear previous result
    resultEl.textContent = "Validating...";
  
    try {
      const response = await fetch(`/.netlify/functions/validate-totp?code=${input}`);
      const data = await response.json();
  
      if (data.success) {
        resultEl.textContent = `Coordinates: ${data.coordinates}`;
      } else {
        resultEl.textContent = "Invalid TOTP code. Please try again.";
      }
    } catch (error) {
      resultEl.textContent = "An error occurred. Please try again.";
      console.error(error);
    }
  });
  