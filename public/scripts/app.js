// SPA --> Single Page Application
// Client side 
// IIFE --> Immediately Invoked Function Expression
(function () {
    function Start() {
      console.log("Movie Watchlist App Started");
  
      // Add confirmation dialog to delete buttons
      let deleteButtons = document.querySelectorAll('.btn-danger');
      for (let button of deleteButtons) {
        button.addEventListener('click', (event) => {
          if (!confirm("Are you sure you want to delete this movie?")) {
            event.preventDefault(); // Prevent the default delete action
            window.location.assign('/movies'); // Redirect back to the movie list
          }
        });
      }
    }
  
    // Attach Start function to the 'load' event of the window
    window.addEventListener("load", Start);
  })();
  
  // jQuery Script to Handle Navigation Click State
  $(document).ready(function () {
    $('.nav-link-clicked').on('click', function () {
      // Remove 'clicked' class from all links
      $('.nav-link-clicked').removeClass('clicked');
      // Add 'clicked' class to the clicked link
      $(this).addClass('clicked');
    });
  });
  