import {Button, Layout, Menu, Upload, message} from "antd";
import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {RootState} from "type/state";
import {actions} from "../index";

import "./header.less";

interface Props {
}

const Header: React.FunctionComponent<Props> = ({}) => {
    return (
        <Layout.Header className="header-header">
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                </Menu.Item>
            </Menu>
        </Layout.Header>
    );
};

const mapStatsToProps = (state: RootState) => {
    return {
        // loggedIn: state.app.user.currentUser.loggedIn,
        // userName: state.app.user.currentUser.name,
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
});
export default connect(mapStatsToProps, mapDispatchToProps)(Header);
