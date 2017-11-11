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
      "a": [this.dot, this.pause, this.dash, this.stop],
      "e": [this.dot, this.stop],
      "o": [this.dash, this.pause, this.dash, this.pause, this.dash, this.stop],
      "s": [this.dot, this.pause, this.dot, this.pause, this.dot, this.stop],
      "t": [this.dash, this.stop]
    }
  }

  findMorseCode(){
    const textArray = this.text.split("")
    const morseArray = []

    const ref = this.morseRef()

    for (var char of textArray){
      morseArray.push(ref[char])
    }

    return morseArray
  }

  makeMorseCode(){
    const morseArray = []
    for (const item of this.findMorseCode()){
      for (const element of item){
        morseArray.push(element)
      }
    }

    document.body.append(morseArray.toString());
    navigator.vibrate(morseArray)
  }
}
