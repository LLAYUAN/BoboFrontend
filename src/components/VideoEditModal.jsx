import React, { useState } from 'react';
import { Modal, Button, Form, Input, Upload, notification, Image, Select, Progress } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {uploadFile} from '../service/uploadFile'
import {deleteFile} from '../service/deleteFile'
import {RECORDVIDEO_PREFIX} from "../service/common";
import {saveRecordVideo} from "../service/recordVideo"
import axios from 'axios';
const { Option } = Select;

const VideoEditModal = ({ isVisible, onOk, onCancel, changeState }) => {
    const [form] = Form.useForm();
    //imageUrl和videoUrl是用来更新前端显示的
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [imageProgress, setImageProgress] = useState(0);
    const [videoProgress, setVideoProgress] = useState(0);
    const [imageCancelTokenSource, setImageCancelTokenSource] = useState(null);
    const [videoCancelTokenSource, setVideoCancelTokenSource] = useState(null);
    const navigate = useNavigate();

    const transUrltoFileName = (url) => {
        const urlParts = url.split('/'); // 使用 '/' 分割字符串
        const filename = urlParts[urlParts.length - 1]; // 获取最后一个元素
        return filename;
    }
    
    const cleanAllFormInfo = () => {
        setImageUrl('');
        setVideoUrl('');
        setImageProgress(0);
        setVideoProgress(0);
        setImageCancelTokenSource(null);
        setVideoCancelTokenSource(null);
        form.resetFields();
    }

    const handleImageUpload = async(file) => {
        console.log("点击handleImageUpload");
        console.log("经过if");
        // 创建FormData对象
        const formData = new FormData();
        formData.append('file', file);
        console.log("formData:",formData);
        // axios取消令牌
        const cancelTokenSource = axios.CancelToken.source();
        setImageCancelTokenSource(cancelTokenSource);
            try {
                // 发送请求到服务器端
                const response = await uploadFile(formData, setImageProgress, cancelTokenSource);

                // 上传成功后，更新图片URL
                console.log("response");
                const newImageUrl = response.data;
                console.log(newImageUrl);
                console.log("图片上传成功");
                setImageUrl(newImageUrl);
            } catch (error) {
                if (axios.isCancel(error)) {
                    notification.info({
                        message: '上传已取消',
                    });
                } else {
                    notification.error({
                        message: '上传失败',
                    });
                }
            }
    };
    
    const handleVideoUpload = async(file) => {
        console.log("点击handleVideoUpload");
        console.log("经过if");
        // 创建FormData对象
        const formData = new FormData();
        formData.append('file', file);
        // axios取消令牌
        const cancelTokenSource = axios.CancelToken.source();
        setVideoCancelTokenSource(cancelTokenSource);
            try {
                // 发送请求到服务器端
                const response = await uploadFile(formData, setVideoProgress, cancelTokenSource);
                
                // 上传成功后，更新图片URL
                console.log("response");
                const newVideoUrl = response.data;
                console.log(newVideoUrl);
                console.log("视频上传成功");
                setVideoUrl(newVideoUrl);
            } catch (error) {
                if (axios.isCancel(error)) {
                    notification.info({
                        message: '上传已取消',
                    });
                } else {
                    notification.error({
                        message: '上传失败',
                    });
                }
            }
    }

    const beforeImageUpload = async (file) => {
        handleImageUpload(file);
        return false; // 阻止默认上传行为
    };
    
    const beforeVideoUpload = async (file) => {
        handleVideoUpload(file);
        return false;
    }

    const handleImageProgress = ({ percent }) => {
        setImageProgress(percent);
    };

    const handleVideoProgress = ({ percent }) => {
        setVideoProgress(percent);
    };


    const handleCheck = async () => {
        console.log("点击上传按钮")
        console.log("imageUrl:",imageUrl);
        console.log("videoUrl:",videoUrl);
        const title = form.getFieldValue('title');
        const description = form.getFieldValue('description');
        console.log('视频名称:', title);
        console.log('简介:', description);
        if (!imageUrl || !videoUrl || !title || !description) {
            notification.error({
                message: '上传失败',
                description: '请确保上传内容完整',
            });
            return;
        }
        const videoInfoToSave = {
            videoName: title,
            videoIntro: description,
            videoUrl: videoUrl,
            imageUrl: imageUrl
        }
        const isSaveSuccess = await saveRecordVideo(videoInfoToSave);
        if (isSaveSuccess) {
            notification.success({
                message: '上传成功',
            })
        } else {
            notification.error({
                message: '上传失败',
            })
        }
        cleanAllFormInfo();
        changeState();
        onCancel();
    };
    
    const handleCancel = () => {
        console.log("关闭");
        if (imageUrl !== '') {
            console.log("关闭时imageUrl不为空,需要从文件夹中删除");
            const imageFileName = transUrltoFileName(imageUrl);
            if (deleteFile(imageFileName)) {
                console.log("删除image成功")
            } else {
                console.log("删除image失败")
            }
        }
        if (videoUrl !== '') {
            console.log("关闭时videoUrl不为空,需要从文件夹中删除");
            const videoFileName = transUrltoFileName(videoUrl);
            if (deleteFile(videoFileName)) {
                console.log("删除video成功")
            } else {
                console.log("删除video失败")
            }
        }
        if (imageCancelTokenSource) {
            console.log("取消image上传");
            imageCancelTokenSource.cancel();
        }
        if (videoCancelTokenSource) {
            console.log("取消video上传");
            videoCancelTokenSource.cancel();
        }
        cleanAllFormInfo();
        navigate('/profile')
        onCancel();
    }


    return (
        <Modal
            title="上传视频"
            visible={isVisible}
            onOk={() => onOk(form)}
            onCancel={handleCancel}
            maskClosable={false}
            footer={[
                <Button key="back" type="default" onClick={handleCancel}>
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
                            <Image src={imageUrl} alt="cover" width={160} height={90} style={{borderRadius: '10px'}}/>
                        ) : (
                            <Upload
                                name="cover"
                                listType="picture-card"
                                className="cover-uploader"
                                showUploadList={false}
                                action={`${RECORDVIDEO_PREFIX}/uploadFile`} // Adjust the upload URL as needed
                                accept="image/*"
                                //onChange={handleImageUpload}
                                beforeUpload={beforeImageUpload}
                                onProgress={handleImageProgress}
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
                        {imageProgress > 0 && <Progress percent={imageProgress} />}
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
                                //onChange={handleVideoUpload}
                                beforeUpload={beforeVideoUpload}
                                onProgress={handleVideoProgress}
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
                        {videoProgress > 0 && <Progress percent={videoProgress} />}
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default VideoEditModal;
