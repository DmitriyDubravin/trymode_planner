import React, {Component} from 'react';



export default class Header extends Component {
	redirect = () => {
		this.props.setToken(null);
		this.props.switchToPageLogin();
	}
	render() {
		return (
			<header className='header'>
				{/* <button onClick={() => this.redirect()}>logout</button> */}
				<img className="main-logo" src="../images/accorn.svg" alt="Trymode" />
			</header>
		);
	}
};