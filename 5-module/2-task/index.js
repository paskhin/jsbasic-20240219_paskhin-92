function toggleText() {
  let buttonToggle = document.querySelector('.toggle-text-button');
  buttonToggle.addEventListener('click', () => {
    text.hidden = !text.hidden;
  })
}
