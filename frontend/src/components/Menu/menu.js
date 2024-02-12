import React from 'react';
import './menu.css';
import { Avatar, Menu } from 'antd';
import MenuIcon  from '../../assets/images/menu-square.svg';

function Main() {
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            label,
            children,
            type,
        };
    }
    const items = [
        getItem('', 'sub1', <img src={MenuIcon} alt='' className='iconMenu' />, [
            getItem('Parte 1', null, null, [getItem('Opción 1', '1'), getItem('Opción 2', '2')], 'group'),
            getItem('Parte 2', null, null, [getItem('Opción 3', '3'), getItem('Opción 4', '4')], 'group'),
        ]),
    ];
    const onClick = (e) => {
        console.log('click', e);
    };

    return (
        <>
            <div className="menu-container">
                <div className='avatar'>
                    <Avatar size={64} type="picture-circle" />
                </div>
                <Menu
                    className="menuItem"
                    onClick={onClick}
                    mode="horizontal"
                    items={items}
                />

            </div>
        </>
    );
}

export default Main;
