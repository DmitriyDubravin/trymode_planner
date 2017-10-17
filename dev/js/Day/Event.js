import React, {Component} from 'react';
import {setEventDone} from './../serverInteractions';


export default class Event extends Component {
	constructor(props) {
        super(props);
        this.state = {
            tools: false
        }
    }
    setStatusDone(id) {
        // setEventDone(id);
    }
    render() {

        if(this.props.event.status === 'done') {
            return (
                <div className="event done">
                    <span className="time">{this.props.start} - {this.props.end}</span> | {this.props.event.idea}
                    <div className="settings">
                        <button onClick={() => {}}><i className="icon-checkmark"></i></button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="event">
                    <span className="time">{this.props.start} - {this.props.end}</span> | {this.props.event.idea}
                    <div className="settings">
                        {!this.state.tools && <button onClick={() => {this.setState({tools: true})}}><i className="icon-cog"></i></button>}
                        {this.state.tools && <div className="tools">
                            <button onClick={() => {}}><i className="icon-bin"></i></button>
                            <button onClick={() => {}}><i className="icon-shuffle"></i></button>
                            <button onClick={() => {}}><i className="icon-checkmark"></i></button>
                            <button onClick={() => {}}><i className="icon-pencil"></i></button>
                            <button onClick={() => {this.setState({tools: false})}}><i className="icon-arrow-right2"></i></button>
                        </div>}
                    </div>
                </div>
            )
        }
        
    }
}