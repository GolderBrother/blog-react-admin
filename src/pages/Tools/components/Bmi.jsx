import React, { Component } from 'react';
import { Button, Form, message, Row, Col, Input, Icon  } from 'antd';

// 使用这个装饰器后就可以获取到form对象 this.props.form，才能使用 form 对象上面的方法
@Form.create()
export default class Bmi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Bmi',
      bmi: '',
      level: '',
    };
  }
  handleSubmit(e) {
    e = e || window.event;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      err && message.error('error!');
    });
    const { weight: w, height: h } = this.props.form.getFieldsValue();
    // 四舍五入，转化成指定小数位
    const bmi = (w / (h / 100) ** 2).toFixed(1);
    let level = 0;
    switch (true) {
      case bmi < 18.5:
        level = 1;
        break;
      case bmi >= 18.5 && bmi <= 24.9:
        level = 2;
        break;
      case bmi == '25':
        level = 3;
        break;
      case bmi > '25' && bmi < 29:
        level = 4;
        break;
      default:
        level = 5;
        break;
    }
    console.log(level);
    this.setState({
      bmi,
      level,
    });
  }
  handleReset(e) {
    e = e || window.event;
    e.preventDefault();
    this.props.form.resetFields();
    this.setState({
      bmi: '',
      level: '',
    });
  }
  // 体重分类配置数据
  weightConfig = [
    {
      text: '偏瘦',
      range: '<18.5',
    },
    {
      text: '正常',
      range: '18.5-24.9',
    },
    {
      text: '超重',
      range: '18.5-24.9',
    },
    {
      text: '偏胖',
      range: '25.0-29.0',
    },
    {
      text: '肥胖',
      range: '18.5-24.9',
    },
  ];
  render() {
    let i = this.state.level;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="bmibox" style={{ marginTop: '80px' }}>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Row type="flex" justify="center">
            <Col span={10}>
              {/* weight 声明变量可获取值 */}
              {getFieldDecorator('weight', {
                rules: [{ required: true, message: 'Please input your weight!' }],
              })(
                <Input
                  prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  addonBefore="您的体重："
                  addonAfter="kg"
                />
              )}
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span={10}>
              {getFieldDecorator('height', {
                rules: [{ required: true, message: 'Please input your height!' }],
              })(
                <Input
                  prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  addonBefore="您的身高："
                  addonAfter="cm"
                />
              )}
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span={10}>
              {/* 设置 button 原生的 type 值 */}
              <Button style={{ width: '50%' }} type="primary" htmlType="submit">
                计算
              </Button>
              <Button style={{ width: '50%' }} type="primary" onClick={e => this.handleReset(e)}>
                重置
              </Button>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span={10}>
              <Card id="cardWrap">
                {/* <p className={i == 1 ? 'activeP' : ''}>
                  偏瘦
                  {'<18.5'}
                </p>
                <p className={i == 2 ? 'activeP' : ''}>
                  正常
                  {'18.5-24.9'}
                </p>
                <p className={i == 3 ? 'activeP' : ''}>
                  超重
                  {'18.5-24.9'}
                </p>
                <p className={i == 4 ? 'activeP' : ''}>
                  偏胖
                  {'25.0-29.0'}
                </p>
                <p className={i == 5 ? 'activeP' : ''}>
                  肥胖
                  {'18.5-24.9'}
                </p> */}
                {this.weightConfig.map((item, index) => (
                  <p className={i == index + 1 ? 'activeP' : ''}>
                    {item.text}
                    {item.range}
                  </p>
                ))}
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
