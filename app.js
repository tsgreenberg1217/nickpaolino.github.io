class App {
  constructor(){
    this.addListener()
  }

  addForm(){
    const form = document.createElement('form')
    form.className = "vibrate"
    document.body.appendChild(form)

    const input = document.createElement('input')
    form.appendChild(input)

    const button = document.createElement('button')
    button.innerText = "Submit Word"
    button.type = "submit"
    form.appendChild(button)

    return form
  }

  addListener(){
    const form = this.addForm()
    const input = document.querySelector('form input')

    form.addEventListener('submit', (ev) => {
      ev.preventDefault()

      const text = input.value
      input.value = ""

      this.postToAPI(text)
    })
  }

  postToAPI(text){
    fetch('https://haptic-game.herokuapp.com/messages', {
    method: 'POST',
    body: JSON.stringify({content: text}),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }})
    .then(res => res.json())
    .then(json => console.log(json))
  }
}
