import React, { Component } from 'react';
import styles from './index.less';
export default class UserAvatarInfo extends Component {
  render() {
    const { currentUser } = this.props;
    return currentUser.username ? (
        <div class="user-avatar">
            <Dropdown overlay={menu}>
                <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
                <span className={styles.name}>{currentUser.username}</span>
                </span>
            </Dropdown>
        </div>
    ) : (
      <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    );
  }
}
