import React, { useState } from 'react';
import { Modal, Button, Form, Input, Upload, notification, Image, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {uploadFile} from '../service/uploadFile'
import {RECORDVIDEO_PREFIX} from "../service/common";
const { Option } = Select;

const VideoEditModal = ({ isVisible, onOk, onCancel }) => {
    const [form] = Form.useForm();
    const [video, setVideo] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const navigate = useNavigate();

    const handleImageUpload = async(info) => {
        console.log("点击handleUploadImgChange");
        if (info.file.status === 'done') {
            console.log("经过if");
            try {
                // 创建FormData对象
                const formData = new FormData();
                formData.append('file', info.file.originFileObj);

                // 发送请求到服务器端
                const response = await uploadFile(formData);

                // 上传成功后，更新图片URL
                console.log("response");
                const newImageUrl = response.data;
                console.log(newImageUrl);
                console.log("图片上传成功");
                setImageUrl(newImageUrl);
                const newVideodata = {
                    ...video,
                    recordVideoCoverUrl: newImageUrl,
                }
                setVideo(newVideodata);
            } catch (error) {
                console.log('图片上传失败');
            }
        }
    };
    
    const handleVideoUpload = async(info) => {
        console.log("点击handleVideoUpload");
        if (info.file.status === 'done') {
            console.log("经过if");
            try {
                // 创建FormData对象
                const formData = new FormData();
                formData.append('file', info.file.originFileObj);

                // 发送请求到服务器端
                const response = await uploadFile(formData);

                // 上传成功后，更新图片URL
                console.log("response");
                const newVideoUrl = response.data;
                console.log(newVideoUrl);
                console.log("视频上传成功");
                setVideoUrl(newVideoUrl);
                const newVideodata = {
                    ...video,
                    recordVideoAddress: newVideoUrl,
                }
                setVideo(newVideodata);
            } catch (error) {
                console.log('视频上传失败');
            }
        }
    }
    const handleCheck = () => {
        console.log("点击上传按钮")
        console.log("imageUrl:",imageUrl);
        console.log("videoUrl:",videoUrl);
    };


    return (
        <Modal
            title="上传视频"
            visible={isVisible}
            onOk={() => onOk(form)}
            onCancel={onCancel}
            footer={[
                <Button key="back" type="default" onClick={onCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={handleCheck}>
                    上传
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="title" label="视频名称" rules={[{ required: true, message: '请输入名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="简介" rules={[{ required: true,  message: '请输入视频简介'}]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="cover_image" label="上传视频封面" rules={[{required: true, message: '请上传视频封面'}]}>
                    <div className="flex flex-row justify-center items-center mb-3">
                        {imageUrl ? (
                            <Image src={imageUrl} alt="cover" width={200}/>
                        ) : (
                            <Upload
                                name="cover"
                                listType="picture-card"
                                className="cover-uploader"
                                showUploadList={false}
                                action={`${RECORDVIDEO_PREFIX}/uploadFile`} // Adjust the upload URL as needed
                                accept="image/*"
                                onChange={handleImageUpload}
                            >
                                {imageUrl ? (
                                    <Image src={imageUrl} alt="cover" width={200}/>
                                ) : (
                                    <div>
                                        <PlusOutlined/>
                                        <div style={{marginTop: 8}}>Upload</div>
                                    </div>
                                )}
                            </Upload>
                        )}
                    </div>
                </Form.Item>
                <Form.Item name="video" label="上传视频" rules={[{required: true, message: '请上传视频内容'}]}>
                    <div className="flex flex-row justify-center items-center mb-3">
                        {videoUrl ? (
                            <video src={videoUrl} controls width={200}/>
                        ) : (
                            <Upload
                                name="video"
                                listType="picture-card"
                                className="video-uploader"
                                showUploadList={false}
                                action={`${RECORDVIDEO_PREFIX}/uploadFile`} // 后端接收视频的URL
                                accept="video/*" // 只接受视频文件
                                onChange={handleVideoUpload}
                            >
                                {videoUrl ? (
                                    <video src={videoUrl} controls width={200}/>
                                ) : (
                                    <div>
                                        <PlusOutlined/>
                                        <div style={{marginTop: 8}}>Upload</div>
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

export default VideoEditModal;
