import React, { Component } from 'react';
import { Menu, Icon, Dropdown } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class SystemSet extends Component {
  logout() {
    console.log('logout', currentUser);
  }
  render() {
    // this.props.user.userName
    const userName = 'james;';
    return (
      <SubMenu
        title={
          <span className="avatar">
            <img src={avater} alt="头像" />
            <i className="on bottom b-white" />
          </span>
        }
      >
        <MenuItemGroup title="用户中心">
          <Menu.Item key="setting:1">你好 - {userName}</Menu.Item>
          <Menu.Item key="setting:2">个人信息</Menu.Item>
          <Menu.Item key="logout">
            <span onClick={this.logout}>退出登录</span>
          </Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="设置中心">
          <Menu.Item key="setting:3">个人设置</Menu.Item>
          <Menu.Item key="setting:4">系统设置</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    );
  }
}
