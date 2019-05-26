import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Card, Icon, List, Avatar, Timeline } from 'antd';

import EchartsProject from './Echarts/EchartsProject';
import EchartsView from './Echarts/EchartsView';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Local } from '@/utils/storage';
import b1 from '@/assets/images/b1.jpg';

import styles from './Workplace.less';
import '../../styles/imgs.less';
import '../../styles/global.less';

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
              {item[key].name}
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
                <a className={styles.username}> {item.user.name} </a> &nbsp;
                <span className={styles.event}> {events} </span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
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
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              Hello， {currentUser.username}， 祝你开心每一天！
            </div>
            <div>
              {currentUser.title} | {currentUser.group}
            </div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p> 项目数 </p> <p> 56 </p>
        </div>
        <div className={styles.statItem}>
          <p> 团队内排名 </p>
          <p>
            8 <span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p> 项目访问 </p> <p> 2, 223 </p>
        </div>
      </div>
    );

    return (
      <Fragment>
        <PageHeaderWrapper
          loading={currentUserLoading}
          content={pageHeaderContent}
          extraContent={extraContent}
        >
          {/* <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            123
            内容
          </Col>
        </Row> */}
        </PageHeaderWrapper>
        <div className={styles.pageBodyWrapper}>
          <Row gutter={12} className={styles.gutterRow}>
            <Col className={styles.gutterCow} lg={4} md={4} sm={12} xs={12}>
              <div className={styles.gutterBox}>
                <Card bordered={false}>
                  <div className="clear y-around-center">
                    <div className="pull-left mr-m">
                      <Icon type="heart" className="text-2x text-danger" />
                    </div>
                    <div className="clear">
                      <div className="text-muted">收藏</div>
                      <h2>301</h2>
                    </div>
                  </div>
                </Card>
              </div>
              <div className={styles.gutterBox}>
                <Card bordered={false}>
                  <div className="clear y-around-center">
                    <div className="pull-left mr-m">
                      <Icon type="cloud" className="text-2x" />
                    </div>
                    <div className="clear">
                      <div className="text-muted">云数据</div>
                      <h2>30122</h2>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
            <Col className={styles.gutterCow} md={4} sm={12} xs={12}>
              <div className={styles.gutterBox}>
                <Card bordered={false}>
                  <div className="clear y-around-center">
                    <div className="pull-left mr-m">
                      <Icon type="camera" className="text-2x text-info" />
                    </div>
                    <div className="clear">
                      <div className="text-muted">照片</div>
                      <h2>802</h2>
                    </div>
                  </div>
                </Card>
              </div>
              <div className={styles.gutterBox}>
                <Card bordered={false}>
                  <div className="clear y-around-center">
                    <div className="pull-left mr-m">
                      <Icon type="mail" className="text-2x text-success" />
                    </div>
                    <div className="clear">
                      <div className="text-muted">邮件</div>
                      <h2>102</h2>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
            <Col className={styles.gutterCow} md={16} sm={24} xs={24}>
              <div className={styles.gutterBox}>
                <Card bordered={false} className={'no-padding'}>
                  <EchartsProject />
                </Card>
              </div>
            </Col>
          </Row>
          <Row gutter={12} className={styles.gutterRow}>
            <Col className={styles.gutterCow} md={8} sm={24} xs={24}>
              <div className={styles.gutterBox}>
                <Card bordered={false}>
                  <div className="pb-m">
                    <h3>任务</h3>
                    <small>10个已经完成，2个待完成，1个正在进行中</small>
                  </div>
                  <a className="card-tool">
                    <Icon type="sync" />
                  </a>
                  <Timeline>
                    <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                    <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                    <Timeline.Item color="red">
                      <p>联调接口</p>
                      <p>功能验收</p>
                    </Timeline.Item>

                    <Timeline.Item color="#108ee9">
                      <p>登录功能设计</p>
                      <p>权限验证</p>
                      <p>页面排版</p>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </div>
            </Col>
            <Col className={styles.gutterCow} md={16} sm={24} xs={24}>
              <div className={styles.gutterBox}>
                <Card bordered={false}>
                  <div className="pb-m">
                    <h3>消息栏</h3>
                  </div>
                  <a className="card-tool">
                    <Icon type="sync" />
                  </a>
                  <ul className={styles.listGroup + ' no-border'}>
                    <li className={styles.listGroupItem}>
                      <a href="javascript:void(0);" className="mr-m">
                        <img src={b1} className={styles.imgResponsive + ' ' + styles.imgCircle} alt="test" />
                      </a>
                      <div className="clear">
                        <a href="javascript:void(0);" className={styles.name + " block"}>
                          鸣人
                        </a>
                        <span className="text-muted">终于当上火影了！</span>
                      </div>
                    </li>
                    <li className={styles.listGroupItem}>
                      <a href="javascript:void(0);" className="mr-m">
                        <img src={b1} className={styles.imgResponsive + ' ' + styles.imgCircle} alt="test" />
                      </a>
                      <div className="clear">
                        <a href="javascript:void(0);" className="block">
                          佐助
                        </a>
                        <span className="text-muted">吊车尾~~</span>
                      </div>
                    </li>
                    <li className={styles.listGroupItem}>
                      <a href="javascript:void(0);" className="mr-m">
                        <img src={b1} className={styles.imgResponsive + ' ' + styles.imgCircle} alt="test" />
                      </a>
                      <div className="clear">
                        <a href="javascript:void(0);" className="block">
                          小樱
                        </a>
                        <span className="text-muted">佐助，你好帅！</span>
                      </div>
                    </li>
                    <li className={styles.listGroupItem}>
                      <a href="javascript:void(0);" className="mr-m">
                        <img src={b1} className={styles.imgResponsive + ' ' + styles.imgCircle} alt="test" />
                      </a>
                      <div className="clear">
                        <a href="javascript:void(0);" className="block">
                          雏田
                        </a>
                        <span className="text-muted">鸣人君，那个我。。喜欢你</span>
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>
            </Col>
            <Col className={styles.gutterCow} md={16} sm={24} xs={24}>
              <div className={styles.gutterBox}>
                <Card bordered={false}>
                  <div className="pb-m">
                    <h3>访问量统计</h3>
                    <small>最近7天用户访问量</small>
                  </div>
                  <a className="card-tool">
                    <Icon type="sync" />
                  </a>
                  <EchartsView />
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default Workplace;
