# **HabitHound: a habit tracker for dog lovers**

![Main Page Screenshot](assets/screenshots/mainpage.png)  
*The main page of the habit tracker, where your pet grows as you complete tasks.*

---

## Why make this? 
I know, I know—a habit tracker is one of the most standardized starting projects out there. But I wanted to take the idea and gamify it for the new year of 2025. We are a quarter of the way to a new century! So let's actually stick to our New Year goals through a habit tracker.

But the only way I can motivate myself is if there are cute things involved. So I wanted to create a habit tracker that rewards you with dogs. 

---

## Ok, so what is this? 

To keep it short: a simple, gamified habit tracker where completing tasks earns points that help your selected dog grow.  

Like those plant apps where your plant grows as you do things, but better. Now you get a whole dog.

---

## Features  

### Pet System  
- Choose a virtual dog to take care of.  
- Dogs evolve as you complete tasks and earn points!  

### Task Management  
- Add tasks, mark them as complete, and watch your pet grow.  
- Every new day, your task list resets for a fresh start.  

### Chat Onboarding  
- First-time users get an intro chat explaining everything.  
- After the first visit, you go straight to tasks without re-picking your pet.  
- But if you want to replay the intro or choose a different pet, you can just click reset.  

### Live Date & Time  
- The date and time update dynamically so you can see the time ticking to get your tasks done.

---

## How It Works  

### 1️⃣ First Time Setup  
- A chatbox **introduces you to your pet** and the habit tracker.  
- Pick a pet (they’re all cute, no wrong choices).  
- Start your first day with an empty task list.  

### 2️⃣ Daily Task Cycle  
- Add tasks using the input field.  
- Check off tasks to earn +10 points each.  
- Uncheck a task to remove -10 points.  

### 3️⃣ Pet Evolution  
- **Stage 1:** (0–99 points)  
- **Stage 2:** (100–499 points) (Your pet grows!)  
- **Stage 3:** (500+ points) (Final evolution!)  

### 4️⃣ Automatic Daily Reset  
- Every new calendar date, the task list clears itself for a fresh start.  
---

## What I Learned  

### Key Skills  
- `localStorage` to save tasks and pet preferences across sessions.  
- Event listeners to track task completion and pet evolution.  
- Fixing broken pet images after reloads (surprisingly harder than expected).  
- CSS animations & styling (because the UI should also be cute).  

### Challenges  
- Debugging why the pet image wouldn’t persist after refreshing, along with a million other small bugs. Everytime I fixed one thing, another would seem to break.  
- Making sure the onboarding logic doesn’t break when skipping vs. resetting.
---

## What I hope to add

### More pet options 
- Maybe seasonal pets or customizable ones?
- And the ability to decorate your pets with accessories!
   
### Streak tracking with your Google Calendar 
- Sync and add your tasks with your Google Calendar
- Also keeps track of how consistent you are with your tasks. On days you are consistent, that specific calendar box is marked green. 

### Habit insights 
- A dashboard to visualize progress, trends, and stats over time.

---

## Want to try it out? (I know you do)

Run locally on your own computer by 
1️⃣ Clone the repository:  
```bash
git clone https://github.com/yourusername/habits.git
```
2️⃣ Navigate into the project folder:
cd habits

3️⃣ Open the website in your browser
Easiest: Just double-click index.html, and it will open in your default browser.
Recommended for VS Code Users: Right-click index.html → "Open with Live Server" (requires the Live Server extension).

Enjoy!
