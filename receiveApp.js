class Receive {
  constructor(){
    this.fetchLastMessage()
  }

  fetchLastMessage(){
    fetch('https://haptic-game.herokuapp.com/messages')
    .then(res => res.json())
    .then(json => new Code(json.slice(-1)[0].content))
  }
}
