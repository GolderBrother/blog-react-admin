import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Dropdown, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import screenfull from 'screenfull';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import SelectLang from '../SelectLang';
import styles from './index.less';
import UserAvatar from '../UserAvatar';
const MenuItemGroup = Menu.ItemGroup;

export default class GlobalHeaderRight extends PureComponent {
  state = {};
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  componentDidMount() {
    console.log(this.props.currentUser);
  }

  // 全屏切换
  screenFull() {
    let isFullscreen = !screenfull.isFullscreen;
    if (isFullscreen) {
      screenfull.request();
    } else {
      screenfull.exit();
    }
  }

  logout() {
    console.log('logout', this.props.currentUser);
    this.props.history.push("/user/login");
  }

  render() {
    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <MenuItemGroup title="用户中心">
          <Menu.Item key="setting:1">你好 - {currentUser.username}</Menu.Item>
          <Menu.Item key="setting:2"><Icon type="user" />个人信息</Menu.Item>
          <Menu.Item key="logout">
            <Icon type="logout" />
            <span>退出登录</span>
          </Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="设置中心">
          <Menu.Item key="userinfo">
            <Icon type="setting" />
            <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
          </Menu.Item>
        </MenuItemGroup>
        <Menu.Divider />
      </Menu>
    );
    const noticeData = this.getNoticeData();
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        <Menu
          mode="horizontal"
          style={{ lineHeight: '64px', float: 'left' }}
          onClick={this.menuClick}
        >
          <Menu.Item key="full" onClick={() => this.screenFull()}>
            <Icon type="arrows-alt" onClick={() => this.screenFull()} />
          </Menu.Item>
        </Menu>
        <NoticeIcon
          className={styles.action}
          count={currentUser.notifyCount}
          onItemClick={(item, tabProps) => {
            console.log(item, tabProps); // eslint-disable-line
          }}
          locale={{
            emptyText: formatMessage({ id: 'component.noticeIcon.empty' }),
            clear: formatMessage({ id: 'component.noticeIcon.clear' }),
          }}
          onClear={onNoticeClear}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
          popupAlign={{ offset: [20, -16] }}
        >
          <NoticeIcon.Tab
            list={noticeData.notification}
            title={formatMessage({ id: 'component.globalHeader.notification' })}
            name="notification"
            emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
            // emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            emptyImage="~@/assets/images/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIcon.Tab
            list={noticeData.message}
            title={formatMessage({ id: 'component.globalHeader.message' })}
            name="message"
            emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
            // emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            emptyImage="~@/assets/images/sAuJeJzSKbUmHfBQRzmZ.svg"
          />
          {/* <NoticeIcon.Tab
            list={noticeData.event}
            title={formatMessage({ id: 'component.globalHeader.event' })}
            name="event"
            emptyText={formatMessage({ id: 'component.globalHeader.event.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
          /> */}
        </NoticeIcon>
        <SelectLang className={styles.action} />
        {/* TODO:可以单独抽离成组件 */}
        <UserAvatar currentUser={currentUser}/>
        {/* {currentUser.username ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.username}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )} */}
      </div>
    );
  }
}
