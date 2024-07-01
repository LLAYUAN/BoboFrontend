import React from 'react';
import { Card, Avatar, Typography, Row, Col } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const PopularCard = ({title,author,rank,cover}) => {
    console.log(cover);
    return (
        <Card
            hoverable
            style={{ width: 500, border: '1px solid #e8e8e8', borderRadius: '8px' }} >
            <Row>
                <Col span={12} >
                    <div style={{ position: 'relative' }}>
                        <img
                            alt="example"
                            src={cover}
                            style={{ width: '100%', height: '100%', borderRadius: '8px 0 0 8px' }}
                        />
                        <div style={{ position: 'absolute', bottom: 8, left: 0, background: 'rgba(0, 0, 0, 0.5)', borderRadius: '4px', padding: '2px 8px' }}>
                            <Title level={5} style={{ margin: 0, color: '#fff' }}>{rank}</Title>
                        </div>
                    </div>
                </Col>
                <Col span={10} style={{paddingLeft:'20px'}}>
                    <div style={{ display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                        <Title level={4} style={{ marginBottom: '8px' }}>{title}</Title>
                        <Row align="middle" style={{paddingTop:'8px'}}>
                            <Col>
                                <Avatar src="path_to_avatar_image" />
                            </Col>
                            <Col flex="auto" style={{ paddingLeft: '8px'}}>
                                <Text>{author}</Text>
                            </Col>
                            {/*<Col>*/}
                            {/*    <YoutubeOutlined style={{ fontSize: '20px', color: '#ff4d4f' }} />*/}
                            {/*</Col>*/}
                            {/*<Col style={{ paddingLeft: '8px' }}>*/}
                            {/*    <Text>174.1万</Text>*/}
                            {/*</Col>*/}
                            {/*<Col style={{ paddingLeft: '8px' }}>*/}
                            {/*    <Text>3万</Text>*/}
                            {/*</Col>*/}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default PopularCard;
