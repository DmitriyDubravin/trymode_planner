import React, {Component} from "react";
import {escapeHtml} from "./../functions";
import {tryLogin} from "./../serverInteractions";
import {Form, FormRow, Input, Button, FormError} from "./../forms";



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        const sss = (token) => {
            this.props.setToken(token);
            this.props.switchToPageMain();
        };
        let nickname = escapeHtml(this.nickname.value);
        let password = escapeHtml(this.password.value);
        tryLogin(nickname, password, sss);
    }



    render() {
        return (
            <div className='login-form'>
                <Form>
                    <FormRow>
                        <Input reference={nickname => this.nickname = nickname} placeholder='Nickname' />
                    </FormRow>
                    <FormRow>
                        <Input reference={password => this.password = password} type='password' placeholder='Password' />
                    </FormRow>
                    <FormRow>
                        <Button clickHandler={this.handleLogin} type='button' text='Log In' />
                    </FormRow>
                </Form>
            </div>
        );
    }
}