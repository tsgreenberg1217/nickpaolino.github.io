document.addEventListener('DOMContentLoaded', () => {
  vibrateMobile()
})

const vibrateMobile = () => {
  const button = document.createElement('button')
  button.innerText = "Vibrate"
  document.body.appendChild(button)

  button.addEventListener('click', (ev) => {
    navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]);
  })
}

const morseCodePatterns = () => {
  // navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]);
}
