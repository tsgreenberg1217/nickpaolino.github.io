class Receive {
  constructor(){
    this.fetchLastMessage()
  }

  fetchLastMessage(){
    fetch('http://localhost:3000/message')
    .then(res => res.json())
    .then(json => new Code(json.slice(-1)[0].content))
  }
}
