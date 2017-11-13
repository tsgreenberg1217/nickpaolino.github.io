class Code {
  constructor(text){
    this.text = text

    this.dot = 400
    this.dash = 800
    this.pause = 120
    this.stop = 1000

    console.log(text);

    this.morseCode = this.makeMorseCode()
  }

  morseRef(){
    return {
      "a": [this.dot, this.pause, this.dash, this.stop],
      "b": [this.dash, this.pause, this.dot, this.pause, this.dot, this.pause, this.dot, this.stop],
      "c": [this.dash, this.pause, this.dot, this.pause, this.dash, this.pause, this.dot, this.stop],
      "d": [this.dash, this.pause, this.dot, this.pause, this.dot, this.stop],
      "e": [this.dot, this.stop],
      "f": [this.dot, this.pause, this.dot, this.pause, this.dash, this.pause, this.dot, this.stop],
      "g": [this.dash, this.pause, this.dash, this.pause, this.dot, this.stop],
      "h": [this.dot, this.pause, this.dot, this.pause, this.dot, this.pause, this.dot, this.stop],
      "i": [this.dot, this.pause, this.dot, this.stop],
      "j": [this.dot, this.pause, this.dash, this.pause, this.dash, this.pause, this.dash, this.stop],
      "k": [this.dash, this.pause, this.dot, this.pause, this.dash, this.stop],
      "l": [this.dot, this.pause, this.dash, this.pause, this.dot, this.pause, this.dot, this.stop],
      "m": [this.dash, this.pause, this.dash, this.stop],
      "n": [this.dash, this.pause, this.dot, this.stop],
      "o": [this.dash, this.pause, this.dash, this.pause, this.dash, this.stop],
      "p": [this.dot, this.pause, this.dash, this.pause, this.dash, this.pause, this.dot, this.stop],
      "q": [this.dash, this.pause, this.dash, this.pause, this.dot, this.pause, this.dash, this.stop],
      "r": [this.dot, this.pause, this.dash, this.pause, this.dot, this.stop],
      "s": [this.dot, this.pause, this.dot, this.pause, this.dot, this.stop],
      "t": [this.dash, this.stop],
      "u": [this.dot, this.pause, this.dot, this.pause, this.dash, this.stop],
      "v": [this.dot, this.pause, this.dot, this.pause, this.dot, this.pause, this.dash, this.stop],
      "w": [this.dot, this.pause, this.dash, this.pause, this.dash, this.stop],
      "x": [this.dash, this.pause, this.dot, this.pause, this.dot, this.pause, this.dash, this.stop],
      "y": [this.dash, this.pause, this.dot, this.pause, this.dash, this.pause, this.dash, this.stop],
      "z": [this.dash, this.pause, this.dash, this.pause, this.dot, this.pause, this.dot, this.stop]
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
    document.body.append(this.text.toString());
    navigator.vibrate(morseArray)
  }
}
