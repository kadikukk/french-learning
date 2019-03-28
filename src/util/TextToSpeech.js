import { findLast, whereEq } from 'ramda';

class TextToSpeech {
  constructor(lang = 'fr-FR') {
    this.lang = lang;
    this.synth = this.initSynth(lang);
  }

  initSynth(lang) {
    const synth = window.speechSynthesis;
    synth.lang = lang;
    synth.pitch = 1;
    synth.rate = 1;
    return synth;
  }

  getVoice = (lang) => {
    const voices = this.synth.getVoices();
    return findLast(whereEq({ lang: lang }), voices);
  };

  speak(text) {
    const phrase = new SpeechSynthesisUtterance(text);
    phrase.voice = this.getVoice(this.lang);
    this.synth.speak(phrase);
  }
}

export default TextToSpeech;