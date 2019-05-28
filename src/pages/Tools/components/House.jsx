import React, { Component } from 'react';
import { Row, Col, Card, Input } from 'antd';
export default class House extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '住房建议',
      rent: 0,
      year: 0,
      rentAll: 0,
      buyAll: 0,
      moneyDiff: 0,
      suggest: '',
    };
  }
  // 改变数据setState是异步的，因此会先执行后面的方法，可以把要执行的方法放在回掉函数中执行
  // 改变租金后，重新计算租金总额
  handleRent(e = window.event) {
    const rent = e.target.value;
    this.setState(
      {
        rent,
      },
      () => {
        this.handleRentAll();
      }
    );
  }
  // 年份变化后，重新几段租金总额
  handleYear(e = window.evente) {
    const year = e.target.value;
    this.setState(
      {
        year,
      },
      () => {
        this.handleRentAll();
      }
    );
  }
  // 计算租房的总金额
  handleRentAll() {
    const rentAll = (this.state.rent * 10 * this.state.year) / 10000;
    this.setState({
      rentAll,
    });
  }
  // 计算买房的总金额
  handleBuyAll(e = window.event) {
    const buyAll = e.target.value;
    this.setState({
      buyAll,
    });
    setTimeout(() => {
      const moneyDiff = this.state.buyAll - this.state.rentAll;
      this.setState(
        {
          moneyDiff,
        },
        () => {
          let suggest = '';
          if (moneyDiff >= 0) {
            if (moneyDiff > 2) {
              suggest = '租房更划算哦！';
            } else {
              suggest = '大兄弟，还是洗洗睡吧！';
            }
          } else {
            suggest = '可以，还是买房吧！';
          }
          this.setState({
            suggest,
          });
        }
      );
    });
  }
  render() {
    return (
      <div className="house-box mar-t30" style={{marginTop:'30px'}}>
        <Row type="flex" justify="center" className="rowItem">
          <Col>
            <h2>{this.state.title}</h2>
          </Col>
        </Row>
        <Row type="flex" justify="center" className="rowItem">
          <Col span={10}>
            <Input
              type="number"
              addonBefore="预计租金"
              addonAfter="万/月"
              onChange={e => this.handleRent(e)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="center" className="rowItem">
          <Col span={10}>
            <Input
              type="number"
              addonBefore="预计年份"
              addonAfter="年"
              onChange={e => this.handleYear(e)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="center" className="rowItem">
          <Col span={10}>
            <Input disabled addonBefore="租房合计：" addonAfter="万" value={this.state.rentAll} />
          </Col>
        </Row>
        <Row type="flex" justify="center" className="rowItem">
          <Col span={10}>
            <Input
              addonBefore="买房合计："
              addonAfter="万"
              value={this.state.buyAll}
              onChange={e => this.handleBuyAll(e)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="center" className="rowItem">
          <Col span={10}>
            <Input addonBefore="买房 - 租房" addonAfter="万" value={this.state.moneyDiff} />
          </Col>
        </Row>
        <Row type="flex" justify="center" className="rowItem">
          <Col span={10}>
            <Card bodyStyle={{ padding: '20px', fontSize: '14px' }}>
              <p>
                砖家建议：
                {this.state.suggest}
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
