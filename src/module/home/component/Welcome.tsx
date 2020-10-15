import {Button, Upload} from "antd";
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
    translate: (image: string) => void;
}

const Welcome: React.FC<Props> = ({languageList, mergeLanguageList, columns, translate}) => {
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
        <div style={{textAlign: "center"}}>
            <Upload
                action=""
                accept="image/*"
                showUploadList={false}
                beforeUpload={file => {
                    if (file) {
                        const reader = new FileReader();

                        reader.onload = result => {
                            try {
                                const imageStr = (result.target?.result || "") as string;
                                const imageBase64 = encodeURI(imageStr);
                                translate(imageBase64);
                            } catch (err) {
                                // eslint-disable-next-line no-console
                                console.error(err);
                            }
                        };
                
                        reader.readAsDataURL(file);
                    }
                    return false;
                }}
            >
                <Button type="primary">上传图片</Button>
            </Upload>
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
    translate: (image: string) => {
        dispatch(actions.translate(image));
    },
});

export default connect(mapStatsToProps, mapDispatchToProps)(Welcome);
