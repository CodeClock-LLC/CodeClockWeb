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