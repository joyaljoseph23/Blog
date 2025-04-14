window.onload=function(){
    // Select form elements
    const addPostForm = document.getElementById("addPostForm");
    const titleInput = document.getElementById("titleInput");
    const contentInput = document.getElementById("contentInput");
    const postList = document.getElementById("postList");


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
     // titleInput.value = "";
      //contentInput.value = "";
  
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


};

