document.addEventListener('DOMContentLoaded', () => {
  vibrateMobile()
})

const vibrateMobile = () => {
  const button = document.createElement('button')
  button.innerText = "Vibrate"
  document.body.appendChild(button)

  button.addEventListener('click', (ev) => {
    navigator.vibrate(1000);
  })
}
