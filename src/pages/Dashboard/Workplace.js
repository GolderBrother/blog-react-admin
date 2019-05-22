import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, List, Avatar } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Local } from '@/utils/storage';

import styles from './Workplace.less';

@connect(({ user, activities, loading }) => ({
  currentUser: user.currentUser,
  activities,
  currentUserLoading: loading.effects['user/fetchCurrent'],
}))
class Workplace extends PureComponent {
  state = {
    keyword: '',
    type: '', // 1 :其他友情用户 2: 是管理员的个人用户 ,'' 代表所有用户
    pageNum: 1,
    pageSize: 10,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    // dispatch({
    //   type: 'user/saveCurrentUser',
    //   payload: Local.get('user'),
    // });
    this.getCurrentUser();
    console.log(this.props);
    // dispatch({
    //   type: 'activities/fetchList',
    // });
  }

  getCurrentUser() {
    const { dispatch } = this.props;
    let user = Local.get('user');
    const params = {
      keyword: this.state.keyword,
      type: this.state.type,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'otherUser/queryUser',
        payload: {
          resolve,
          params,
        },
      });
    })
      .then(res => {
        if (res.code === 0) {
          if (res.data && res.data.list) {
            let item = res.data.list.find(_user => _user.name === user.username);
            if (item) {
              user.roleType = item.type;
              user.name = item.type === 0 ? '管理员' : '普通用户';
            }
            dispatch({
              type: 'user/saveCurrentUser',
              payload: user,
            });
            Local.set('user', user);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {' '}
              {item[key].name}{' '}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}> {item.user.name} </a> & nbsp;{' '}
                <span className={styles.event}> {events} </span>{' '}
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {' '}
                {moment(item.updatedAt).fromNow()}{' '}
              </span>
            }
          />{' '}
        </List.Item>
      );
    });
  }

  render() {
    const { currentUser, currentUserLoading } = this.props;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />{' '}
          </div>{' '}
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              Hello， {currentUser.username}， 祝你开心每一天！{' '}
            </div>{' '}
            <div>
              {' '}
              {currentUser.title} | {currentUser.group}{' '}
            </div>{' '}
          </div>{' '}
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p> 项目数 </p> <p> 56 </p>{' '}
        </div>{' '}
        <div className={styles.statItem}>
          <p> 团队内排名 </p>{' '}
          <p>
            8 <span> / 24</span>
          </p>{' '}
        </div>{' '}
        <div className={styles.statItem}>
          <p> 项目访问 </p> <p> 2, 223 </p>{' '}
        </div>{' '}
      </div>
    );

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            内容{' '}
          </Col>{' '}
        </Row>{' '}
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
