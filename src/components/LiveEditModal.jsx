import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Upload, notification, Image, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { createRoom, getRoomInfo ,uploadFile} from '../service/user'; // 引入创建直播间的服务

const { Option } = Select;

const LiveEditModal = ({ isVisible, onOk, onCancel }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null); // 存储图片文件
    const navigate = useNavigate();

    const initModal = async () => {
        try {
            const response = await getRoomInfo();
            console.log('roomData:', response.data);
            const roomData = response.data;
            console.log('coverUrl:', roomData.coverUrl);
            form.setFieldsValue({
                title: roomData.roomName,
                tags: roomData.tags.map((tagIndex, index) => tagIndex === 1 ? index : null).filter(index => index !== null),
                cover_image: roomData.coverUrl ? roomData.coverUrl : undefined,
            });
            setImageUrl(roomData.coverUrl ? roomData.coverUrl : '');
        } catch (error) {
            console.error('Failed to fetch room information:', error);
            // Handle error, show notification, etc.
        }
    };

    useEffect(() => {
        if (isVisible) {
            initModal();
        }
    }, [isVisible]);

    const options = [
        { label: '学习', value: 0 },
        { label: '娱乐', value: 1 },
        { label: '其他', value: 2 },
    ];

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const beforeImageUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageUrl(e.target.result); // 预览图片
        reader.readAsDataURL(file);

        setImageFile(file); // 存储图片文件
        return false; // 阻止默认上传行为
    };

    const handleImageUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await uploadFile(formData);
            const newImageUrl = response.data;
            setImageUrl(newImageUrl); // 设置上传后的图片 URL
            console.log('Image URL:', newImageUrl);
            // notification.success({
            //     message: 'Upload Successful',
            //     description: 'Cover image uploaded successfully.',
            // });
            return newImageUrl; // 返回新的 imageUrl
        } catch (error) {
            notification.error({
                message: 'Upload Failed',
                description: 'Cover image upload failed.',
            });
            throw error; // 抛出错误以便外部处理
        }
    };

    const handleCheck = async () => {
        try {
            await form.validateFields();
            if (!imageFile && !imageUrl) {
                throw new Error('请上传封面图片');
            }
            let newImageUrl = imageUrl; // 保留当前的 imageUrl
            if (imageFile) {
                newImageUrl = await handleImageUpload(imageFile); // 更新 newImageUrl
            }
            const values = await form.getFieldsValue();
            const roomData = {
                title: values.title,
                tags: values.tags,
                cover_image: newImageUrl // 使用更新后的 newImageUrl
            };
            console.log("imageURL:", newImageUrl);
            let res = await createRoom(roomData); // 调用 createRoom 函数发送数据到后端
            if (res.code !== 200) {

                notification.error({
                    message: 'Error',
                    description: 'Room creation failed.',
                });
            } else {
                localStorage.setItem('isStreaming',true);
                onCancel();
                let roomID = res.data;
                navigate(`/liveAnchor/${roomID}`);
                // window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal
            title="创建直播间"
            visible={isVisible}
            onOk={onOk}
            onCancel={onCancel}
            footer={[
                <Button key="back" type="default" onClick={onCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={handleCheck}>
                    创建
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item name="title" label="直播间名称" rules={[{ required: true, message: '请输入名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="tags" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                        defaultValue={[]}
                        onChange={handleChange}
                        options={options}
                    />
                </Form.Item>
                <Form.Item name="cover_image" label="直播间封面" rules={[{ required: true, message: '请上传封面图片' }]}>
                    <div className="flex flex-row items-center mb-3">
                        {imageUrl ? (
                            <Image src={imageUrl} alt="cover" width={200} />
                        ) : (
                            <div style={{ width: 200, height: 200, border: '1px dashed #d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'center',  }}>
                                <span>图片预览</span>
                            </div>
                        )}
                        <div style={{ marginLeft: '10px'}}>
                            <Upload
                                name="cover"
                                showUploadList={false}
                                beforeUpload={beforeImageUpload}

                            >
                                <Button
                                    icon={<PlusOutlined />}
                                    style={{ marginTop: '10px' }}
                                >选择图片</Button>
                            </Upload>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LiveEditModal;
