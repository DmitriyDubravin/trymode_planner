import React from "react";
import {connect} from "react-redux";
import ToolbarConnector from "./ToolbarConnector";

const mapStateToProps = state => {
    return {
        timeSelected: state.date.selected,
        canBeShown: state.layout.toolbar
    };
};

export default connect(mapStateToProps)(
    ({canBeShown, timeSelected}) => (<div>{
        canBeShown &&
        timeSelected &&
        <ToolbarConnector />
    }</div>)
);