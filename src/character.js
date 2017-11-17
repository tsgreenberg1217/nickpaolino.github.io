class Character{
  constructor(x,y, board){
    this.board = board
    this.level = this.board.mapNumber
    this.x = x
    this.y = y
    this.coordinates = [this.x, this.y]
    this.img = 'img/characters/ES/right/Es_01.png'

    this.constructor.currentInstance = this
    if (!this.constructor.listenersSet){
      this.constructor.eventListeners()
    }
    this.createCharacter(this.coordinates)
    this.itemCount = 0
    this.moveCharacter()
  }

  formatCoordinates(coordinatesArray){
    return `${coordinatesArray[0]}-${coordinatesArray[1]}`
  }

  createCharacter(coordinatesArray){
    let character = document.createElement('img')
    character.src = this.img
    character.style.width = '100%'
    character.id = "hero"
    let position = this.formatCoordinates(coordinatesArray)
    let tile = document.getElementById(position)
    tile.appendChild(character)
    return character
  }

  displayScore(){
    let score = document.getElementById("score")
    score.innerHTML = `Points: ${this.board.score}`
    // score.innerHTML = `Coffees Left: ${this.board.itemCount-this.itemCount}`
  }

  placeCharacter(coordinatesArray){
    // this.flagAlert()
    this.board.gameOver()
    this.displayScore()
    let character = document.getElementById('hero')
    character.src = this.img
    let position = this.formatCoordinates(coordinatesArray)
    let tile = document.getElementById(position)
    if (tile){
      tile.appendChild(character)
    }
  }

  moveCharacter(){
    this.moveDown()
    this.moveUp()
    this.moveRight()
    this.moveLeft()
  }

  moveConstraints(tile, axis, value){
    if(this.board.pauseSwitch === true){

      console.log('player paused')
    }
    else if (tile){
      if (tile.dataset.item === "open"){
        if(axis === 'x'){this.x += value}
        else{this.y += value}
        this.coordinates = [this.x, this.y]
        this.placeCharacter([this.x, this.y])
      }
      else if (tile.dataset.item === "item"){
        let coffeeImg = tile.children[0]
        coffeeImg.remove()
        tile.dataset.item = "open"
        if (axis === 'x'){this.x += value}
        else {this.y += value}
        this.coordinates = [this.x, this.y]
        this.itemCount++
        if (this.board.itemCount === this.itemCount && !(this.board.flagSwitch)){
          let flagTile = document.getElementById(this.board.exitCoordinates)
          flagTile.dataset.item = "flag"
          let img = document.createElement('img')
          img.src = `img/elements/flag.png`
          img.style.width = "100%"
          this.board.flagSwitch = true
          flagTile.appendChild(img)
        }

        this.placeCharacter([this.x, this.y])
      }
      else if (tile.dataset.item === "flag"){
        this.board.nextLevel()
      }
    }
  }

  static eventListeners(instance){
    let canvas = document.querySelector('.canvas')
    document.body.addEventListener('keydown', (ev) => {
      if (ev.which === 40){
        this.currentInstance.moveDown()
      }
      else if (ev.which === 38){
        this.currentInstance.moveUp()
      }
      else if (ev.which === 39){
        this.currentInstance.moveRight()
      }
      else if (ev.which === 37){
        this.currentInstance.moveLeft()
      }
      else {}
      this.listenersSet = true
    })
    // canvas.addEventListener('click', (ev) => {
    //   console.log();
    // })
  }

  moveDown(){
    let coord = this.formatCoordinates([this.x + 1, this.y])
    let tile = document.getElementById(coord)
    this.img = `img/characters/ES/down/Es_01.png`
    this.moveConstraints(tile,'x',1)
  }

  moveUp(){
    let coord = this.formatCoordinates([this.x - 1, this.y])
    let tile = document.getElementById(coord)
    this.img = `img/characters/ES/up/Es_01.png`
    this.moveConstraints(tile,'x',-1)
  }

  moveRight(){
    let coord = this.formatCoordinates([this.x, this.y + 1])
    let tile = document.getElementById(coord)
    this.img = `img/characters/ES/right/Es_01.png`
    this.moveConstraints(tile,'y',1)
  }
  moveLeft(){
    let coord = this.formatCoordinates([this.x, this.y - 1])
    let tile = document.getElementById(coord)
    this.img = `img/characters/ES/left/Es_01.png`
    this.moveConstraints(tile,'y',-1)
  }

}
