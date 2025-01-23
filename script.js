// ---------------------------------------------------------
// 1) ONBOARDING MESSAGES & BASIC SETUP
// ---------------------------------------------------------

// Onboarding messages for the chatbox
const chatMessages = [ 
  "Oh hi there! Welcome to your new home! I’m just here to hand over the keys to you. Cozy, isn’t it?",
  "But... there’s something I need to tell you... It seems the previous tenant left behind a little friend who’s been waiting for someone to care for them.",
  "Here’s the thing: this little one isn't just a normal friend... They grow as you grow! As you complete your daily tasks and work to better yourself, you’ll see your new friend flourish too.",
  "Raise both your new friend and yourself well, and who knows? If you do an amazing job, more friends might come knocking at your door!"
];

// Keeps track of which sentence is being shown currently
let currentChatIndex = 0;

// Grab pointers to HTML elements with specific IDs
const chatbox       = document.getElementById("chatbox");
const chatMessage   = document.getElementById("chat-message");
const nextBtn       = document.getElementById("next-btn");
const petSelection  = document.getElementById("pet-selection");
const taskAndPet    = document.getElementById("task-and-pet");

// ---------------------------------------------------------
// 2) SKIP ONBOARDING IF ALREADY COMPLETED
// ---------------------------------------------------------

if (localStorage.getItem("onboardingComplete") === "true") {
  // User has completed onboarding in the past, so skip chat/pet selection
  chatbox.style.display      = "none";
  petSelection.style.display = "none";
  taskAndPet.style.display   = "block";

  // Restore the pet image from localStorage if it was saved
  const savedPetSrc = localStorage.getItem("chosenPetSrc");
  if (savedPetSrc) {
    document.getElementById("current-pet").src = savedPetSrc;
  }
} else {
  // User hasn't completed onboarding; show chat, hide others
  chatbox.style.display      = "block";
  petSelection.style.display = "none";
  taskAndPet.style.display   = "none";
}

// ---------------------------------------------------------
// 3) CHATBOX ANIMATION & NEXT BUTTON
// ---------------------------------------------------------

// Wait for chatbox's slide-in animation (2.5s), then start pulse animation
setTimeout(() => {
  // Only pulse if chatbox is actually shown (i.e., user not skipping)
  if (chatbox.style.display !== "none") {
    chatbox.style.animation = "pulse 3.5s infinite"; 
  }
}, 2500); 

// When "Next" button is clicked: move to next sentence of onboarding
nextBtn.addEventListener("click", () => {
  currentChatIndex++;
  if (currentChatIndex < chatMessages.length) {
    chatMessage.textContent = chatMessages[currentChatIndex];
  } else {
    // Hide chatbox after done with messages
    chatbox.style.display = "none";
    // Show pet selection
    petSelection.style.display = "block";
  }
});

// ---------------------------------------------------------
// 4) PET SELECTION
// ---------------------------------------------------------
document.querySelectorAll(".pet-option").forEach((pet) => {
  pet.addEventListener("click", () => {
    // Set the current pet's image
    document.getElementById("current-pet").src = pet.src; 

    // Store this pet's src in localStorage so we can restore later
    localStorage.setItem("chosenPetSrc", pet.src);

    // Hide pet selection, show the tasks
    petSelection.style.display = "none";
    taskAndPet.style.display   = "block";

    // Mark onboarding as complete so future visits skip chat
    localStorage.setItem("onboardingComplete", "true");
  });
});

// Grab the reset button
const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", () => {
  // Remove relevant items to reset
  localStorage.removeItem("onboardingComplete");
  localStorage.removeItem("chosenPetSrc");
  localStorage.removeItem("tasks");
  localStorage.removeItem("savedDate");
  
  // Or localStorage.clear(); // to remove ALL local storage keys from your site

  // Reload the page so the user sees the onboarding again
  location.reload();
});


// ---------------------------------------------------------
// 5) TASK LIST LOGIC WITH DAILY RESET
// ---------------------------------------------------------

const taskList    = document.getElementById("task-list");
const taskInput   = document.getElementById("task-input");
const addTaskBtn  = document.getElementById("add-task-btn");
const dateTimeDiv = document.getElementById("date-time");

// Points & evolution for pet
let points          = 0;
let nextStagePoints = 100;
let petStage        = 1;

// Check today's date and see if we need to reset tasks
const today     = new Date().toLocaleDateString(); 
const savedDate = localStorage.getItem("savedDate") || "";

// If it's a new day compared to last time, reset the list
if (savedDate !== today) {
  localStorage.setItem("savedDate", today);
  localStorage.removeItem("tasks");
}

// Load existing tasks if the day hasn’t changed
let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ---------------------------------------------------------
// 6) UPDATE DATE/TIME CONTINUOUSLY
// ---------------------------------------------------------
function updateDateTime() {
  const now = new Date();
  dateTimeDiv.textContent = now.toLocaleString(); 
}

// Call once immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);

// ---------------------------------------------------------
// 7) RENDER EXISTING TASKS ON LOAD
// ---------------------------------------------------------
storedTasks.forEach((taskObj) => {
  createTaskElement(taskObj.text, taskObj.completed, taskObj.timestamp);
});

// ---------------------------------------------------------
// 8) CREATE A NEW TASK
// ---------------------------------------------------------
addTaskBtn.addEventListener("click", () => {
  const newTask = taskInput.value.trim();
  if (newTask) {
    const now = new Date();
    const taskObj = {
      text: newTask,
      completed: false,
      timestamp: now.toLocaleString()
    };

    // Add to the DOM
    createTaskElement(taskObj.text, taskObj.completed, taskObj.timestamp);

    // Push to storedTasks array & save to localStorage
    storedTasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    // Clear the input
    taskInput.value = "";
  }
});

// ---------------------------------------------------------
// 9) CREATE TASK ELEMENT
// ---------------------------------------------------------
function createTaskElement(text, completed, timestamp) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" ${completed ? 'checked' : ''}>
    <span>${text}</span>
    <small style="font-size: 12px; color: #666;">(Created: ${timestamp})</small>
  `;

  const checkbox = li.querySelector("input");
  const taskText = li.querySelector("span");

  // If it was completed previously, reflect that & add points
  if (completed) {
    taskText.classList.add("completed");
    addPoints(10); 
  }

  // Listen for checkbox changes
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      addPoints(10);
      taskText.classList.add("completed");
      updateTaskStatus(text, true);
    } else {
      addPoints(-10);
      taskText.classList.remove("completed");
      updateTaskStatus(text, false);
    }
  });

  taskList.appendChild(li);
}

// ---------------------------------------------------------
// 10) UPDATE TASK COMPLETION STATUS
// ---------------------------------------------------------
function updateTaskStatus(taskText, isCompleted) {
  // Loop through storedTasks and update the matching task
  storedTasks = storedTasks.map((t) => {
    if (t.text === taskText) {
      return { ...t, completed: isCompleted };
    }
    return t;
  });

  // Save updated array to localStorage
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

// ---------------------------------------------------------
// 11) POINTS & PET EVOLUTION
// ---------------------------------------------------------
function addPoints(value) {
  points += value;
  updateProgress();
}

function updateProgress() {
  const progressBar  = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const petImage     = document.getElementById("current-pet");

  // Calculate progress % for the bar
  const progressPercent = Math.min((points / nextStagePoints) * 100, 100);
  progressBar.style.width = `${progressPercent}%`;
  progressText.textContent = `${points}/${nextStagePoints}`;

  // Handle pet evolution thresholds
  if (points >= 500 && petStage < 3) {
    petStage = 3;
    nextStagePoints = Infinity;
    petImage.src = petImage.src.replace(`${petStage - 1}.png`, "3.png");
  } else if (points >= 100 && petStage < 2) {
    petStage = 2;
    nextStagePoints = 500;
    petImage.src = petImage.src.replace(`${petStage - 1}.png`, "2.png");
  }
}
