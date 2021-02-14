import React from "react";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            mode: "stop"
            };
    }

    start = () => {
        this.setState({
        seconds: 0,
        minutes: 0,
        hours: 0,
        mode: "start"
        });

        this.intervalID = setInterval(() => this.tick(), 1000);
    };
    stop = () => {
        this.setState({ mode: "stop" });
        clearInterval(this.intervalID);
    };

    componentDidMount() {
        this.start();
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }


    tick() {
        if(this.props.isStop)
        {
            this.stop();
            return;
        }

        let nextTick = this.state;

        if (nextTick.seconds >= 59) {
            nextTick.seconds = 0;
            nextTick.minutes++;
        } else {
            nextTick.seconds++;
        }
        if (nextTick.minutes >= 60) {
            nextTick.minutes = 0;
            nextTick.hours++;
        }
        this.setState(nextTick);
    }
    render() {
    return (
        <div>
            <p>
                {this.state.hours}:{this.state.minutes}:{this.state.seconds}
            </p>
        </div>
    );
    }
}
