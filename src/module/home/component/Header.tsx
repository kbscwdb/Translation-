import {Button, Layout, Menu, Upload, message} from "antd";
import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {RootState} from "type/state";
import {actions} from "../index";

import "./header.less";

interface Props {
    importJSON: (file?: File) => void;
}

const Header: React.FunctionComponent<Props> = ({importJSON}) => {
    return (
        <Layout.Header className="header-header">
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Upload
                        action=""
                        accept=".json"
                        showUploadList={false}
                        beforeUpload={file => {
                            if (file) {
                                // message.success(`${info.file.name} file uploaded successfully`);
                                importJSON(file);
                            }
                            return false;
                        }}
                    >
                        <Button type="primary">Import JSON</Button>
                    </Upload>
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
    importJSON: (file?: File) => {
        dispatch(actions.importJSON(file));
    },
});
export default connect(mapStatsToProps, mapDispatchToProps)(Header);
