import { findLast, whereEq } from 'ramda';

class TextToSpeech {
  constructor(lang = 'fr-FR') {
    this.lang = lang;
    this.synth = this.initSynth(lang);
    this.synth.getVoices();
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

  // multiple language settings to force french
  speak(text) {
    const phrase = new SpeechSynthesisUtterance(text);
    phrase.lang = this.lang;
    phrase.voice = this.getVoice(this.lang);
    phrase.lang = this.lang;
    phrase.text = text;
    this.synth.speak(phrase);
  }
}

export default TextToSpeech;