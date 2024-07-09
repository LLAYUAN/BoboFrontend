import { useState } from 'react';
import { notification } from 'antd';
import {startLive} from "../service/user";

const useLiveEditModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => async(values) => {
        // 处理提交表单后的逻辑
        console.log('Received values:', values);
        notification.success({
            message: '直播间创建成功',
            description: `直播间 ${values.title} 已创建`,
        });
        console.log()
        let res = await startLive(values.title,values.tags,values.cover_image);
        setIsModalVisible(false);
        if(res.code === 200){
            // TODO: 跳转到对应的开启直播页面
        }
        // if (onSuccess) {
        //     onSuccess(values);
        // }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return {
        isModalVisible,
        showModal,
        handleOk,
        handleCancel,
    };
};

export default useLiveEditModal;
