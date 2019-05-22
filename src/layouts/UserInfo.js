import React, { Component } from 'react';
import './BasicLayout.scss';
import { List, Avatar } from 'antd';
export default class UserInfo extends Component {
  render() {
    const { list, handleView, handleEdit } = this.props;
    return (
      <div>
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
                title={<a href="https://ant.design">{item.key}</a>}
                description={JSON.stringify(item.value)}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
