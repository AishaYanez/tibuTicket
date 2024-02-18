import React from 'react';
import './menu.css';
import { Avatar, Menu, message } from 'antd';
import MenuIcon from '../../assets/images/menu-square.svg';
import AuthService from '../../services/AuthService/auth.service';
import { useNavigate } from 'react-router-dom';

function Main() {
    const nav = useNavigate();

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            label,
            children,
            type,
        };
    }

    const deleteAccount = () => {
        AuthService.deleteAccount().then(res => {
            localStorage.removeItem('token');
            message.warning('Cuenta borrada')
            console.log(res.data);
            console.log('hola');
            nav('/');
        }
        ).catch(err => console.error(err))
    }

    const logoutActions = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('lastLoginTime');
        message.warning('Logout exitoso');
        nav('/');
    };

    const logOut = () => {
        if (localStorage.getItem('token') != null) {
            AuthService.logoutUser().then(r => {
                console.log(r);
                logoutActions();
            }).catch(e => console.error(e))
        } else {
            message.error('No hay una sesión iniciada');
        }
    }

    const items = [
        getItem('', 'sub1', <img src={MenuIcon} alt='' className='iconMenu' />, [
            getItem('Cuenta', null, null, [getItem('Cerrar sesión', '1'), getItem('Borrar cuenta', '2')], 'group'),
            getItem('Ayuda', null, null, [getItem('Helper', '3'), getItem('Report', '4')], 'group'),
        ]),
    ];

    const onClick = (btn) => {
        const key = btn.key;

        switch (key) {
            case "1":
                logOut();
                break;

            case "2":
                deleteAccount();
                break;

            default:
                console.log('No está implementado');
                break;
        }
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
