class Code {
  constructor(text){
    this.text = text

    this.dot = 200
    this.dash = 400
    this.pause = 60
    this.stop = 400

    console.log(text);

    this.morseCode = this.makeMorseCode()
  }

  morseRef(){
    return {
      "a": [this.dot, this.pause, this.dash, this.stop],
      "b": [this.dash, this.pause, this.dot, this.pause, this.dot, this.pause, this.dot, this.stop],
      "b": [this.dash, this.pause, this.dot, this.pause, this.dash, this.pause, this.dot, this.stop],
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
    document.body.append(this.text.toString());
    navigator.vibrate(morseArray)
  }
}
