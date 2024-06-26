import { useState } from 'react';
import { notification } from 'antd';

const useLiveEditModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (onSuccess) => (values) => {
        // 处理提交表单后的逻辑
        console.log('Received values:', values);
        notification.success({
            message: '直播间创建成功',
            description: `直播间 ${values.title} 已创建`,
        });
        setIsModalVisible(false);
        if (onSuccess) {
            onSuccess(values);
        }
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
