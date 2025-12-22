    const helpForm = document.getElementById('helpForm');
    const helpMessage = document.getElementById('helpMessage');

    helpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const description = document.getElementById('helpDescription').value.trim();

      if (!name || !description) {
        helpMessage.textContent = 'Please fill in all fields.';
        helpMessage.style.color = 'red';
        return;
      }

      helpMessage.textContent = 'Thank you! Your message has been submitted.';
      helpMessage.style.color = 'green';
      helpForm.reset();
    });