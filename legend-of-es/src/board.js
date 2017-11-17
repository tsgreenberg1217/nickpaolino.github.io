class Board {
  constructor(level){
    this.kickback = 1
    this.getHighScores()
    this.mapNumber = level
    // console.log(this.mapNumber);
    this.monsters = []
    this.itemCount = 0
    this.exitCoordinates = '7-14'
    this.generateMap()
    this.createCanvas(15, 15)
    this.createPointsDiv()
    // These will be created by the map class

    this.createCharacter(7,0)

    this.createMonster()
    this.pauseSwitch = false
    this.gameOverSwitch = false
    this.flagSwitch = false
    this.pause()
  }

  getHighScores(){
    let place = 1
    fetch('http://legendofes.herokuapp.com/users').then(res => res.json()).then(json =>{
      json.sort(function(a,b){return b.score - a.score}).slice(0,10).forEach((user) =>{
        let scoresDiv = document.getElementById('highScores')
        let div = document.createElement('div')
        div.innerText = `${place}- ${user.name}: ${user.score}`
        place += 1
        scoresDiv.appendChild(div)

      })
    })
  }

  nextLevel(){
    this.generateMap()
    this.itemCount = 0
    this.createCanvas(15, 15)
    this.createPointsDiv()
    // new Character(7,0, this)
    this.createCharacter(7,0)
    this.createMonster()
    this.pauseSwitch = false
    this.gameOverSwitch = false
    this.flagSwitch = false
    this.pause()
  }

  pause(){
    document.addEventListener('keydown', (ev) => {

      if(ev.which === 32){
        if (!this.gameOverSwitch){
          let canvas = document.querySelector('.canvas')
          if(this.pauseSwitch === false){
            this.pauseSwitch = !this.pauseSwitch
            canvas.style.filter = "brightness(50%)"
          }
          else{
            canvas.style.filter = "brightness(100%)"
            this.pauseSwitch = !this.pauseSwitch
          }
        }
      }
    })
  }

  createPointsDiv(){
    let existingH3 = document.querySelector('h3')
    if (existingH3){
      existingH3.remove()
    }
    let h3 = document.createElement('h3')
    h3.id = "score"
    h3.align = "center"
    document.body.appendChild(h3)
  }



  gameOver(){
    if (this.monsters.length>0 && this.character){
      for(let i = 0; i<this.monsters.length; i++){
        if(this.monsters[i].x === this.character.x && this.monsters[i].y === this.character.y){

          // let frame = document.createElement('div')
          // frame.className = "gameover"
          // frame.zIndex = 1
          // frame.backgroundColor = 'red'

          let canvas = document.querySelector('.canvas')
          this.pauseSwitch = true
          this.gameOver = true
          canvas.style.filter = "brightness(50%)"
          // let title = document.createElement('img')
          // title.src = `img/elements/GameOver.png`
          // title.style.width = '100%'
          // title.style.zIndex = 1
          // title.style.display = 'block'
          // title.style.margin = '0 auto'
          // title.style.position = 'absolute'
          // canvas.appendChild(title)
          // debugger
          this.setForm()
        }
      }
    }
  }

  generateMap(){
    this.map = new Map(this)
    this.currentMap = this.map.returnMap()
    this.mapNumber += 1
    this.score = (Map.count - this.kickback) * 100
    // console.log(this.currentMap);
  }

  createCanvas(width, height){
    var existingCanvas = document.querySelector('table')
    if (existingCanvas){
      existingCanvas.remove()
    }
    var canvas = document.createElement('table')
    canvas.style.backgroundImage = `url("img/elements/grass_2.png")`
    canvas.className = "canvas"
    canvas.position = "relative"
    document.body.appendChild(canvas)
    canvas.style.zIndex = -1

    for (var i = 0; i < height; i++){
      var row = document.createElement('tr')
      row.id = `${i}`
      canvas.appendChild(row)

      for (var j = 0; j < width; j++){
        var tileItem = this.currentMap[i][j]

        var cell = document.createElement('td')
        cell.className = "tile"
        cell.id = `${i}-${j}`

        if (tileItem === 1){
          let img = document.createElement('img')
          img.src = `img/elements/bush.png`
          img.style.width = '100%'
          cell.id = `${i}-${j}`
          cell.dataset.item = "barrier"
          cell.appendChild(img)
        }
        else if (tileItem === 2){
          this.itemCount += 1
          let img = document.createElement('img')
          img.src = `img/elements/coffee.png`
          img.style.width = '100%'
          cell.id = `${i}-${j}`
          cell.dataset.item = "item"
          cell.appendChild(img)
        }
        else {
          cell.dataset.item = "open"
        }
        row.appendChild(cell)
      }
    }
  }
  createCharacter(x,y){
    let character = new Character(x,y, this)
    this.character = character
  }

  createMonster(){
    let monsterCoordinates = this.map.createMonsters()
    this.monsters = []
    for (var position of monsterCoordinates){
      let monster = new Monster(position[0], position[1], this)
      this.monsters.push(monster);
    }
  }

  postAPI(username,points){
    const api = {method: 'POST',
    body: JSON.stringify({name: username, score:points}),
    headers:{'Content-Type': 'application/json', Accept: 'application/json'}}

    fetch('http://legendofes.herokuapp.com/users',api).then(res => res.json()).then(()=>location.reload(true) )
  }

  setForm(){
    // debugger
    let div = document.getElementById('formDiv')

    let f = document.createElement("form");
    f.setAttribute('method',"post");
    f.setAttribute('action',"");

    let i = document.createElement("input");
    i.setAttribute('type',"text");
    i.setAttribute('name',"username");
    f.appendChild(i);

    let s = document.createElement("input");
    s.setAttribute('type',"submit");
    s.setAttribute('value',"Submit");

    f.appendChild(s);

    div.appendChild(f)
    f.addEventListener('submit',(ev) => {

      ev.preventDefault()
      let name = i.value
      let score = this.score
      this.postAPI(name,score)
      // i.value = ""
    })
  }

}
