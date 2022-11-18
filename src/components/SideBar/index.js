import React, { useState, useEffect } from 'react';
import sideMenuList from './../../static/sideBarMenu.json';
import { useHistory } from 'react-router-dom';
import useWindowsPathname from './../WindowPathname';
import { signOut } from "firebase/auth";

const SideBar = () => {
    let history = useHistory();
    const [getUrl] = useState(useWindowsPathname());
    const [windowUrl, setWindowUrl] = useState('');

    //handle click on menu item 
    const menuSelection = (e, data) => {
        e.preventDefault();
       
        
        if(data.redirectUrl ==="/"){
            sessionStorage.setItem(
                'token',
               ''
            );
            history.push(data.redirectUrl);

            return;
        }
        history.push(data.redirectUrl);
        setWindowUrl(data.redirectUrl);
    };

    useEffect(() => {
        setWindowUrl(getUrl.pathname.pathname);
    }, [getUrl]);

    return (
        <div className="sideMenuContentCls">
            {sideMenuList &&
                sideMenuList.map((menu, id) => {
                    return (
                        <div key={id}>
                            {menu.subMenus.map((data, index) => {
                                return (
                                    <p
                                        key={index}
                                        className={
                                            windowUrl === data.redirectUrl
                                                ? 'subTitle'
                                                : 'subTitle'
                                        }
                                        onClick={(e) => menuSelection(e, data)}
                                    >
                                        <img
                                            src={data.icons}
                                            alt={menu.title}
                                            className="iconCls"
                                        />
                                        {data.title}
                                    </p>
                                );
                            })}
                        </div>
                    );
                })}
        </div>
    );
};

export default SideBar;
