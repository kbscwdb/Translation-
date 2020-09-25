import {Button, Table} from "antd";
import {ColumnProps} from "antd/lib/table";
import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {RootState} from "type/state";
import {actions} from "../index";

import ui from "conf/ui.json";

interface Props {
    languageList: any[];
    mergeLanguageList: any[];
    columns: string[];
}

const Welcome: React.FC<Props> = ({languageList, mergeLanguageList, columns}) => {
    // eslint-disable-next-line no-console
    console.log(mergeLanguageList, "languageList");
    const dataSource = mergeLanguageList.map(item => ({...item, key: item.title}));
    const tableColumns: Array<ColumnProps<any>> = [
        {
            title: "title",
            dataIndex: "title",
            key: "title",
            width: "30vw",
            ellipsis: true,
        },
    ];
    columns.forEach(column => {
        tableColumns.push({
            title: column,
            dataIndex: column,
            key: column,
        });
    });
    return (
        <div>
            <Table pagination={false} rowKey={record => record.title} columns={tableColumns} dataSource={dataSource} />
        </div>
    );
};

const mapStatsToProps = (state: RootState) => {
    const {mergeLanguageList, languageList, columns} = state.app.home;
    return {
        mergeLanguageList,
        languageList,
        columns,
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
    // importJSON: (file?: File) => {
    //     dispatch(actions.importJSON(file));
    // },
});

export default connect(mapStatsToProps, mapDispatchToProps)(Welcome);
