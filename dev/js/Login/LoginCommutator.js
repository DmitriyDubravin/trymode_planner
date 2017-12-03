import React from "react";
import {connect} from "react-redux";
import LoginContainer from "./LoginContainer";

const mapStateToProps = state => {
    return {
        canBeShown: state.layout.login
    };
};

export default connect(mapStateToProps)(
    ({canBeShown}) => (<div>{
        canBeShown &&
		<LoginContainer />
    }</div>)
);