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

      new Code(text)
    })
  }
}
