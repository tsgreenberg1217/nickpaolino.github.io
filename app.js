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
    button.innerText = "Vibrate"
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

      // new Code(text)
    })
  }

  postToAPI(text){
    fetch('http://localhost:3000/message', {
    method: 'POST',
    body: JSON.stringify({content: text}),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }})
  }
}
