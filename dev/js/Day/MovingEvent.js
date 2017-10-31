import React, {Component} from 'react';


export default class MovingEvent extends Component {
	render() {
		return (
			<div className="moving-event">
				<div>{this.props.movingEvent.id}</div>
				<div>{this.props.movingEvent.key}</div>
			</div>
		)
	}
}