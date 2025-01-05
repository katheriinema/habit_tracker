const chatMessages = [
    "Oh hi there! Welcome to your new home! I’m just here to hand over the keys to you. Cozy, isn’t it?",
    "But… oh dear, there’s something I need to tell you. It seems the previous tenant left behind a little friend—a tiny, shy creature who’s been waiting for someone to care for them.",
    "Here’s the thing: this little one isn’t just a pet—they grow as you grow! As you complete your daily habits and work to better yourself, you’ll see your new friend flourish too. Isn’t that exciting?",
    "Raise both your new friend and yourself well, and who knows? If you do an amazing job, more pets might come knocking at your door! Let’s create a cozy, happy space together."
  ];
  let currentChatIndex = 0;
  
  const chatbox = document.getElementById("chatbox");
  const chatMessage = document.getElementById("chat-message");
  const nextBtn = document.getElementById("next-btn");
  const petSelection = document.getElementById("pet-selection");
  const taskAndPet = document.getElementById("task-and-pet");
  
  nextBtn.addEventListener("click", () => {
    currentChatIndex++;
    if (currentChatIndex < chatMessages.length) {
      chatMessage.textContent = chatMessages[currentChatIndex];
    } else {
      chatbox.style.display = "none";
      petSelection.style.display = "block";
    }
  });
  
  document.querySelectorAll(".pet-option").forEach((pet) => {
    pet.addEventListener("click", () => {
      document.getElementById("current-pet").src = pet.src; // Ensure pet.src has a valid value
      petSelection.style.display = "none";
      taskAndPet.style.display = "block";
    });
  });
    
  // Task list logic
  const taskList = document.getElementById("task-list");
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  let points = 0;
  
  addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim()) {
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox"> ${taskInput.value}`;
      li.querySelector("input").addEventListener("change", () => {
        if (li.querySelector("input").checked) {
          points += 10;
          checkPetEvolution();
        }
      });
      taskList.appendChild(li);
      taskInput.value = "";
    }
  });
  
  function checkPetEvolution() {
    const petImage = document.getElementById("current-pet");
    if (points >= 300) {
      petImage.src = petImage.src.replace("1.png", "3.png");
    } else if (points >= 100) {
      petImage.src = petImage.src.replace("1.png", "2.png");
    }
  }
  