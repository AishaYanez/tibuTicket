import React from 'react';
import './menu.css';
import { Avatar, Menu, message } from 'antd';
import MenuIcon from '../../assets/images/menu-square.svg';
import AuthService from '../../services/AuthService/auth.service';
import { useNavigate } from 'react-router-dom';
import ReportsViews from '../../services/jsreports.service.list';
import ReportsGraphic from '../../services/jsreports.service.Graphic';
import ReportsUsers from '../../services/jsreports.service.Users';
import ReportsCalc from '../../services/jsreports.service.Calc';

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

    const logoutActions = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_image');
        localStorage.removeItem('email');
        localStorage.removeItem('lastLoginTime');
        nav('/');
    };

    const deleteAccount = () => {
        AuthService.deleteAccount().then(res => {
            message.warning(res.data.status.message);
            logoutActions();
        }
        ).catch(err => {
            const mess =  err.response ? err.response.data.message : err.message;
            message.error(mess);
            err.response && logoutActions();
            
        })
    }

    const logOut = () => {
        AuthService.logoutUser().then(r => {
            message.success(r.data.message);
            logoutActions();
        }).catch(err => {
            const mess =  err.response ? err.response.data.message : err.message;
            message.error(mess);
            err.response && logoutActions();
        });

    }

    const items = [
        getItem('', 'sub1', <img src={MenuIcon} alt='Icono de menu' className='iconMenu' />, [
            getItem('Cuenta', null, null, [getItem('Cerrar sesión', '1'), getItem('Borrar cuenta', '2')], 'group'),
            getItem('Ayuda', null, null, [getItem('Helper', '3')], 'group'),
            getItem('Reports', null, null, [getItem('Report Lista', '4'), getItem('Report Usuarios', '5'), getItem('Report Grafico', '6'), getItem('Report Calculado', '7')],'group')
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

            case "3":
                window.open('/Helper/TibuTicket.html', '_blank')
                break;

            case "4":
                ReportsViews(localStorage.getItem('email'));
                break;
                
            case "5":
                ReportsUsers(localStorage.getItem('email'));
                break;
            
            case "6":
                ReportsGraphic(localStorage.getItem('email'));
                break;
            case "7":
                ReportsCalc(localStorage.getItem('email'));
                break;
            default:
        }
    };

    return (
        <>
            <div className="menu-container">
                <div className='avatar'>
                    <Avatar src={localStorage.getItem('user_image')} size={64} type="picture-circle" />
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
