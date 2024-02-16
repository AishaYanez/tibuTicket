import React, { useState } from 'react';
import './menu.css';
import { Avatar, Menu, Form, Upload, Input, Modal, Button } from 'antd';
import MenuIcon from '../../assets/images/menu-square.svg';

const { Item, SubMenu } = Menu;

function MainMenu() {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [formVisible, setFormVisible] = useState(false);

    const handleChange = info => {
        if (info.fileList.length > 1) {
            info.fileList.shift();
        }
        setImageUploaded(info.fileList.length > 0);
    };

    const handleMenuClick = (e) => {
        console.log('click', e);
        if (e.key === 'form') {
            setFormVisible(true);
        }
    };

    const handleCancel = () => {
        setFormVisible(false);
    };
    console.error = () => { };

    return (
        <>
            <div className="menu-container">
                <div className='avatar'>
                    <Avatar size={64} type="picture-circle" />
                </div>
                <Menu
                    className="menuItem"
                    onClick={handleMenuClick}
                    mode="horizontal"
                >
                    <SubMenu key="sub1" title={<img src={MenuIcon} alt='' className='iconMenu' />}>
                        <Item key="1">Opción 1</Item>
                        <Item key="2">Opción 2</Item>
                        <Item key="form">Formulario</Item>
                    </SubMenu>
                </Menu>
            </div>

            <Modal
                title="Formulario"
                visible={formVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form layout="vertical" className='ListForm'>
                    <Form.Item label="Nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Imagen">
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            maxCount={1}
                            onChange={handleChange}
                        >
                            {imageUploaded ? null : (
                                <img alt="" />
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary'>Crear Lista</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default MainMenu;
