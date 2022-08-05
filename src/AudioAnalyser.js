import React, { Component } from 'react';
import AudioFreqVisualizer from './AudioFreqVisualizer';
import AudioVisualiser from './AudioVisualiser';


class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = { audioData: new Uint8Array(0), audioFreqData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.dataFreqArray = new Uint8Array(this.analyser.frequencyBinCount);

    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.analyser.getByteFrequencyData(this.dataFreqArray);

    this.setState({ audioData: this.dataArray, audioFreqData: this.dataFreqArray });
    //this.setState({ audioFreqData: this.dataFreqArray });

    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return (
      <React.Fragment>
        <AudioFreqVisualizer audioFreqData={this.state.audioFreqData} />
        <AudioVisualiser audioData={this.state.audioData} />
      </React.Fragment>
    )
  }
}

export default AudioAnalyser;