import { useState } from 'react';
import { notification } from 'antd';

const useUploadVideoModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (onSuccess) => (values) => {
        // 处理提交表单后的逻辑
        console.log('Received values:', values);
        notification.success({
            message: '上传成功',
            description: `视频 ${values.title} 已上传`,
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

export default useUploadVideoModal;
