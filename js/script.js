window.onload=function(){
    // Select form elements
    const addPostForm = document.getElementById("addPostForm");
    const titleInput = document.getElementById("titleInput");
    const contentInput = document.getElementById("contentInput");
    const postList = document.getElementById("postList");
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    function savePosts() {
      localStorage.setItem("blogPosts", JSON.stringify(posts));
    }
  
    // Array to hold the posts
   
  
    // Function to render posts
    function renderPosts() {
      postList.innerHTML = "";  // Clear the current list
      posts.forEach((post, index) => {
        const postElement = document.createElement("li");
        postElement.innerHTML = `
          <h2>${post.title}</h2>
         
          <p>${post.content}</p>
        `;
        postList.appendChild(postElement);
      });
    }
  
    // Event listener for form submission
    addPostForm.addEventListener("submit", (e) => {
      e.preventDefault();  // Prevent page refresh
  
      // Get values from input fields
      const title = titleInput.value;
      console.log(title)
      const content = contentInput.value;
  
      // Add the new post to the posts array
      posts.push({ title, content });
      savePosts();
  
      // Clear the input fields
      titleInput.value = "";
      contentInput.value = "";
  
      // Re-render the posts list
      renderPosts();
  });


  function renderPosts(){
    postList.innerHTML = "";  // Clear the current list
    posts.forEach((post, index) => {
      const postElement = document.createElement("li");
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      postList.appendChild(postElement);
    });
    
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const indexToDelete = e.target.getAttribute("data-index");
        posts.splice(indexToDelete, 1);   // Remove the post
        renderPosts();                    // Re-render the list
      });
    });
  }

  const navBlog = document.getElementById("navBlog");
  const navFitness = document.getElementById("navFitness");
  const blogSection = document.getElementById("blogSection");
  const fitnessSection = document.getElementById("fitnessSection");

  
  navBlog.addEventListener("click", (e) => {
    e.preventDefault();
    blogSection.style.display = "block";
    fitnessSection.style.display = "none";
  });
  
  navFitness.addEventListener("click", (e) => {
    e.preventDefault();
    blogSection.style.display = "none";
    fitnessSection.style.display = "block";
  });


  const dayButtons = document.querySelectorAll(".day-selector button");
 
  const filteredWorkoutList = document.getElementById("filteredWorkoutList");

  
  // Function to get the weekday from a date
  function getDayOfWeek(dateString) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateString);
    console.log("days :",days[0])
    return days[date.getDay()];
  }
  // console.log("days :"getDayOfWeek(""))
  
  // Show workouts for a selected day
  function showWorkoutsForDay(selectedDay) {
    filteredWorkoutList.innerHTML = "";
  
    const workoutsForDay = workouts.filter(workout => {
      return getDayOfWeek(workout.date) === selectedDay;
    });
  
    if (workoutsForDay.length === 0) {
      filteredWorkoutList.innerHTML = `<li>No workouts logged for ${selectedDay}.</li>`;
      return;
    }
  
    workoutsForDay.forEach(workout => {
      const workoutItem = document.createElement("li");
      workoutItem.innerHTML = `
        <strong>${workout.date}</strong> — 
        <em>${workout.type}</em> for 
        <strong>${workout.duration} min</strong>
        ${workout.notes ? ` - ${workout.notes}` : ""}
      `;
      filteredWorkoutList.appendChild(workoutItem);
    });
  }
  
  // Add click events to day buttons
  dayButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedDay = button.getAttribute("data-day");
      showWorkoutsForDay(selectedDay);
    });
  });
  





};



// Navigation logic

