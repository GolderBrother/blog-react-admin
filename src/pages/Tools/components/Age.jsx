import React, { Component } from 'react';
import { DatePicker, Input, Row, Col } from 'antd';
import moment from 'moment';
export default class Age extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'How many days have you lived on Earth?',
      day: 0,
    };
  }
  // 从DatePicker接收一个date值
  handleChange(date) {
    console.log(this);
    console.log(this.state.title);
    const now = +new Date(),
      birthTime = +new Date(date._d);
    const diffDay = Math.ceil((now - birthTime) / 1000 / 60 / 60 / 24).toFixed(0);
    console.log(diffDay);
    this.setState({
      day: diffDay,
    });
  }
  disabledDate(current) {
    // Can not select days after today and today
    return current && current > moment().endOf('day');
  }
  render() {
    const nowTime = new Date().toISOString().substring(0, 10);
    return (
      <div className="age-box mar-t30" style={{marginTop:'30px'}}>
        <Row type="flex" justify="center" span={10}>
          <Col>
            <h2>{this.state.title}</h2>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={10}>
            <label htmlFor="" style={{ fontSize: '14px' }}>
              您的出生年月是：
            </label>
            <DatePicker
              disabledDate={value => this.disabledDate(value)}
              defaultValue={moment(nowTime, 'YYYY-MM-DD')}
              onChange={date => this.handleChange(date)}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }} type="flex" justify="center">
          <Col span={10}>
            <Input addonBefore="您已在地球上生活了" addonAfter="天" value={this.state.day} />
          </Col>
        </Row>
      </div>
    );
  }
}
