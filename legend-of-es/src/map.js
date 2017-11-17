class Map {
  constructor(board){
    this.height = 15
    this.width = 15

    this.path = []

    this.board = board
    this.number = this.board.mapNumber

    this.constructor.count += 1

    this.barrierCount = 40 + (this.constructor.count * 5)
    console.log("THIS IS THE BARRIER COUNT", this.barrierCount);
    this.itemCount = 2

    // 4 is the limit for the monsters right now
    this.monsterCount = 2

    this.map = []

    this.createTiles()
    // this.boundary = 14
    this.createPath([7, 14])
    this.createMonsters()
    this.generateItems()

    console.log(this);
  }

  createMonsters(){
    this.monsterCoordinates = []
    let count = this.monsterCount

    let positionArray = [
      [4, 3],
      [9, 7],
      [3, 8],
      [1, 9]
    ]

    while (count > 0){
      let point = positionArray.pop()
      this.monsterCoordinates.push(point)
      count -= 1
    }

    return this.monsterCoordinates
  }

  createTiles(){
    this.generateEmptyBoard()
    this.generateBarriers()
  }

  generateEmptyBoard(){
    for (var i = 0; i < this.height; i++){
      let rowArray = []
      for (var j = 0; j < this.width; j++){
        rowArray.push(0)
      }
      this.map.push(rowArray)
    }
    return this.map
  }

  generateCoordinatesList(){
    let coordinatesArray = []
    for (var x = 0; x < this.height; x++){
      for (var y = 0; y < this.width; y++){
        coordinatesArray.push([x, y])
      }
    }
    return coordinatesArray
  }

  generateBarriers(){
    this.generateSpecialTiles(1, this.barrierCount)
  }

  generateItems(){
    let itemTiles = this.generateSpecialTiles(2, this.itemCount)
    // for (var tile of itemTiles){
    //   this.boundary = tile[1]
    //   console.log(tile, this.boundary);
    //   this.createPath(tile);
    // }
  }

  coordinatesTaken(coordinate){
    // // Starting Position for Character
    // this.monsterCoordinates.push([7, 0])
    // // Ending Position for Character
    // this.monsterCoordinates.push([7, 14])

    let takenCoordinates = [
      [4, 3],
      [9, 7],
      [3, 8],
      [1, 9],
      [7, 0],
      [7, 14]
    ]

    for (var item of takenCoordinates){
      if (item[0] === coordinate[0] && item[1] === coordinate[1]){
        return true
      }
    }

    return false
  }

  generateSpecialTiles(item, count){
    let tileNumber = this.height * this.width
    let coordinates = this.generateCoordinatesList()
    let tileArray = []

    while (count > 0){
      let randomCoordinate = Math.floor(Math.random() * tileNumber)
      let randomPoint = coordinates[randomCoordinate]
      if (!this.coordinatesTaken(randomPoint)){
        tileArray.push(randomPoint)
        // console.log(randomPoint);
        this.dropTile(randomPoint, item)
        count -= 1
      }
    }
    return tileArray
  }

  dropTile(coordinates, item){
    this.map[coordinates[0]][coordinates[1]] = item
  }

  right(coordinates){
    if (coordinates[1] !== 14){
      coordinates[1] += 1
    }

    return coordinates
  }

  left(coordinates){
    if (coordinates[1] !== 0){
      coordinates[1] -= 1
    }

    return coordinates
  }

  down(coordinates){
    if (coordinates[0] !== 14){
      coordinates[0] += 1
    }

    return coordinates
  }
  up(coordinates){
    if (coordinates[0] !== 0){
      coordinates[0] -= 1
    }

    return coordinates
  }

  createPath(endpoint){
    let directions =
    [
      this.right,
      this.down,
      this.up
    ]

    let currentTile = [7, 0]
    let path = []
    // console.log(this.boundary);
    while (currentTile.toString() !== endpoint.toString()){
      // console.log(currentTile)
      let random = Math.floor(Math.random() * 3)
      this.dropTile(currentTile, 0)
      currentTile = directions[random](currentTile)
    }
  }

  returnMap(){
    return this.map
  }
}

Map.count = 0
