// Function to toggle the inner circle color
function toggleInnerCircle(button) {
    const innerCircle = button.querySelector('.inner-circle');
    if (innerCircle.classList.contains('red')) {
      innerCircle.classList.remove('red');
      innerCircle.style.backgroundColor = 'grey';
    } else {
      innerCircle.classList.add('red');
      innerCircle.style.backgroundColor = 'red';
    }
  }

/* JavaScript to handle sidebar toggle */
function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

/* Append this script after the window.onload function */
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
});