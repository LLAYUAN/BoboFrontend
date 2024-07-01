import React, { useState } from 'react';
import { Modal, Button, Form, Input, Upload, notification, Image, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const LiveEditModal = ({ isVisible, onOk, onCancel }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState('');

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const handleUpload = info => {
        if (info.file.status === 'done') {
            // Assuming the backend returns the URL of the uploaded image
            setImageUrl(info.file.response.url);
            notification.success({
                message: 'Upload Successful',
                description: `${info.file.name} file uploaded successfully.`,
            });
        } else if (info.file.status === 'error') {
            notification.error({
                message: 'Upload Failed',
                description: `${info.file.name} file upload failed.`,
            });
        }
    };

    const handleCheck = () => {
        form.validateFields().then(values => {
            if (!imageUrl) {
                notification.error({
                    message: 'Error',
                    description: 'Please upload a cover image.',
                });
                return;
            }
            onOk({ ...values, cover_image: imageUrl });
        });
    };


    return (
        <Modal
            title="创建直播间"
            visible={isVisible}
            onOk={() => onOk(form)}
            onCancel={onCancel}
            footer={[
                <Button key="back" type="default" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleCheck}>
                    Start
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="title" label="直播间名称" rules={[{ required: true, message: '请输入名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="author" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
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
                    <div className="flex flex-row justify-center items-center mb-3">
                        {imageUrl ? (
                            <Image src={imageUrl} alt="cover" width={200} />
                        ) : (
                            <Upload
                                name="cover"
                                listType="picture-card"
                                className="cover-uploader"
                                showUploadList={false}
                                action="/upload" // Adjust the upload URL as needed
                                onChange={handleUpload}
                            >
                                {imageUrl ? (
                                    <Image src={imageUrl} alt="cover" width={200} />
                                ) : (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                )}
                            </Upload>
                        )}
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LiveEditModal;
