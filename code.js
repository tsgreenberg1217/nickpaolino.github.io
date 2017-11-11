class Code {
  constructor(text){
    this.text = text

    this.dot = 100
    this.dash = 200
    this.pause = 30
    this.stop = 200

    this.morseCode = this.makeMorseCode()
  }

  morseRef(){
    return {
      "s": [this.dot, this.pause, this.dot, this.pause, this.dot, this.pause],
      "o": [this.dash, this.pause, this.dash, this.pause, this.dash, this.pause]
    }
  }

  makeMorseCode(){
    const ref = this.morseRef()
    console.log(ref["s"]);
  }
}
//
// // SOS
// navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]);
