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
  
// Wait for slide-in animation to complete (2.5 seconds)
setTimeout(() => {
  const chatbox = document.getElementById("chatbox");
  chatbox.style.animation = "pulse 3.5s infinite"; // Add pulse animation
}, 2500); // Matches the duration of the slide-in animation

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
let points = 0; // Total points earned
let nextStagePoints = 100; // Points needed for the next stage
let petStage = 1; // Current pet stage (1, 2, or 3)

// Function to update the progress bar and pet stage
function updateProgress() {
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const petImage = document.getElementById("current-pet");

// Calculate progress percentage
const progressPercent = Math.min((points / nextStagePoints) * 100, 100);
progressBar.style.width = `${progressPercent}%`; // Update progress bar width
progressText.textContent = `${points}/${nextStagePoints}`; // Update progress text

// Handle pet evolution
if (points >= 500 && petStage < 3) {
  petStage = 3;
  nextStagePoints = Infinity; // No further stages
  petImage.src = petImage.src.replace(`${petStage - 1}.png`, "3.png");
} else if (points >= 100 && petStage < 2) {
  petStage = 2;
  nextStagePoints = 500; // Points needed for Stage 3
  petImage.src = petImage.src.replace(`${petStage - 1}.png`, "2.png");
}};

// Add points and check progress when a task is completed
addTaskBtn.addEventListener("click", () => {
  if (taskInput.value.trim()) {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox"> <span>${taskInput.value}</span>`;
    const checkbox = li.querySelector("input");
    const taskText = li.querySelector("span");

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        points += 10; // Add 10 points for completing a task
        taskText.classList.add("completed"); // Style the task as completed
        updateProgress(); // Update the progress bar and pet
      } else {
        points -= 10; // Remove points if unchecked
        taskText.classList.remove("completed");
        updateProgress();
      }
    });

    taskList.appendChild(li);
    taskInput.value = "";
  }
});