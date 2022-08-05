import React, { Component } from 'react';

class AudioFreqVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw() {
        const { audioFreqData } = this.props; //same as BufferLength
        const dataArray = new Uint8Array(audioFreqData);
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');
        //let x = 0;
        const sliceWidth = (width * 1.0) / audioFreqData.length;

        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        context.clearRect(0, 0, width, height);

        context.fillStyle = "rgb(200, 200, 200)";
        context.fillRect(0, 0, width, height);
        //const bufferLength = analyser.frequencyBinCount;
        const bufferLength = 128;

        const barWidth = (width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;

            context.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
            context.fillRect(x, height - barHeight / 2, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    render() {
        return <canvas width="300" height="300" ref={this.canvas} />;
    }
}

export default AudioFreqVisualiser;