import React, { Component } from 'react';
import { Row, Col, Input, message } from 'antd';
let handleOnce = true;
const salaryList = [
  {
    addonBefore: '养老保险',
    addonAfter: '元',
    defaultValue: '100',
    type: 'old',
    value: 'old',
  },
  {
    addonBefore: '医疗保险',
    addonAfter: '元',
    defaultValue: '100',
    type: 'medical',
    value: 'medical',
  },
  {
    addonBefore: '失业保险',
    addonAfter: '元',
    defaultValue: '100',
    type: 'offwork',
    value: 'offwork',
  },
  {
    addonBefore: '住房公积',
    addonAfter: '元',
    defaultValue: '100',
    type: 'house',
    value: 'house',
  },
  {
    addonBefore: '税前工资',
    addonAfter: '元',
    defaultValue: '100',
    type: 'pretax',
    value: 'pretax',
  },
  ,
  {
    addonBefore: '个人税收',
    addonAfter: '元',
    defaultValue: '100',
    type: 'tax',
    value: 'tax',
  },
  {
    addonBefore: '税后工资',
    addonAfter: '元',
    defaultValue: '100',
    type: 'output',
    value: 'output',
  },
];
class Salary extends Component {
  constructor() {
    super();
    this.state = {
      title: 'salary',
      old: '', //养老保险
      medical: '', //医疗保险
      offwork: '', //失业保险
      house: '', //住房公积
      pretax: '', //税前工资
      tax: '', //个人税收
      output: '', //税后工资
    };
  }
  handleChange(e, field) {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
    if (value > 10000 && handleOnce) {
      handleOnce = false;
      message.success('哎呦不错哦！工资上万了！');
    }
    const old = (value * 8) / 100;
    const medical = (value * 2) / 100 + (value > 0 ? 3 : 0);
    const offwork = (value * 2) / 1000;
    const house = (value * 12) / 100;
    const pretax = value - old - medical - offwork - house;
    const tax = pretax - 3500;
    const diffAll = old + medical + offwork + house + pretax + tax;
    const output = value - diffAll;
    this.setState({
      old, //养老保险
      medical, //医疗保险
      offwork, //失业保险
      house, //住房公积
      pretax, //税前工资
      tax, //个人税收
      output, //税后工资
      [field]: value,
    });
  }
  render() {
    return (
      <div className="salary-box mar-t30" style={{ marginTop: '30px' }}>
        <Row type="flex" justify="center" className="rowItem" style={{ marginTop: '10px' }}>
          <Col>
            <h2>{this.state.title}</h2>
          </Col>
        </Row>
        {salaryList &&
          salaryList.map((item, index) => (
            <Row
              type="flex"
              justify="center"
              className="rowItem"
              style={{ marginTop: '10px' }}
              key={index + item}
            >
              <Col span={10}>
                <Input
                  addonBefore={item.addonBefore}
                  addonAfter={item.addonAfter}
                  defaultValue={item.defaultValue}
                  value={this.state[item.value]}
                  onChange={e => {
                    this.handleChange(e, item.type);
                  }}
                />
              </Col>
            </Row>
          ))}
      </div>
    );
  }
}
export default Salary;
