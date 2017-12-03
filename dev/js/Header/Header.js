import React, {Component} from "react";



export default class Header extends Component {
    constructor(props) {
        super(props);
        this.redirect = this.redirect.bind(this);
    }
    redirect() {
        this.props.setToken(null);
        this.props.switchToPageLogin();
    }
    render() {
        return (
            <header className='header'>
                <img className="main-logo" src="images/accorn.svg" alt="Trymode" />
            </header>
        );
    }
}