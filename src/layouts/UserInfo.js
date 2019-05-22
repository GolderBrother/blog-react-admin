import React, { Component } from 'react';
import './BasicLayout.scss';
import { List, Avatar } from 'antd';
export default class UserInfo extends Component {
  render() {
    const { list, handleView, handleEdit, pathname } = this.props;
    return (
      pathname.includes('account/settings') && <div>
        <List
          className="user-info-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item
              actions={[
                <a
                  onClick={() => {
                    handleView(item);
                  }}
                >
                  view
                </a>,
                <a
                  onClick={() => {
                    handleEdit(item);
                  }}
                >
                  edit
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatarImg} />}
                title={<a href="javascript:void(0);">{item.key}</a>}
                description={JSON.stringify(item.value)}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
