import React from 'react';
import {connect} from "dva/index";
import { Card, Col, Row, InputNumber,Button} from 'antd';

class MainPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      money : 100,
      seele : 0,
      buyseele:0
    }
  }

  componentDidMount () {
    this.props.dispatch({
      type: 'example/reloadinfo',
    });
  }

  approve = () => {
    console.log("approve:",this.state.money);
    this.props.dispatch({
      type: 'example/approve',
      payload: {value:+this.state.money},
    });
  };

  buykey = () => {
    console.log("buykey:",this.state.seele);
    this.props.dispatch({
      type: 'example/buykey',
      payload: {value:+this.state.seele},
    });
  };

  onAuthChange = (value) => {
    this.setState({
      money:value,
    })
  };

  onBuySeeleChange = (value) => {
    this.setState({
      buyseele:value,
    })
  };

  buyseele = () => {
    console.log("buyseele:",this.state.buyseele);
    this.props.dispatch({
      type: 'example/buyseele',
      payload: {value:+this.state.buyseele},
    });
  };

  onSeeleChange = (value) => {
    this.setState({
      seele:(value * 0.0001).toFixed(5),
    })
  };

  render() {
    /*<Row gutter={16}>
          <Col span={12}>
            <Card title="当前seele余额(kovan)" bordered={false}>{this.props.seelebalance}</Card>
          </Col>
          <Col span={12}>
            <Card title="购买seele" bordered={false}>
              <InputNumber style={{ width: '150px',marginLeft:'20px' }} min={0} defaultValue={0} onChange={this.onBuySeeleChange}/>
              (seele)<Button type="primary" onClick={this.approve}>购买</Button>
            </Card>
          </Col>
        </Row>*/
    return (
      <div style={{background: '#ECECEC', padding: '30px'}}>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="当前账户地址(kovan)" bordered={false}>{this.props.address}</Card>
          </Col>
          <Col span={12}>
            <Card title="当前账户余额(eth)" bordered={false}>{this.props.balance}</Card>
          </Col>
        </Row>
        ..
        <Row gutter={16}>
          <Col span={12}>
            <Card title="当前账户授权给游戏操作seele的剩余额度" bordered={false}>
              授权额度:{this.props.allowance} (seele) / 账户总额度:{this.props.seelebalance} (seele)
            </Card>
          </Col>
          <Col span={12}>
            <Card title="给游戏授权seele额度(直接覆盖剩余额度)" bordered={false}>
              <InputNumber style={{ width: '150px',marginLeft:'20px' }} min={0} defaultValue={0} onChange={this.onAuthChange}/>
              (seele)<Button type="primary" onClick={this.approve}>授权</Button>
            </Card>
          </Col>
        </Row>
..
        <Row gutter={16}>
          <Col span={12}>
            <Card title="购买游戏key" bordered={false}>
              已有：{this.props.gamekeys} (key)
              <InputNumber style={{ width: '150px',marginLeft:'20px'}} min={0} defaultValue={0} onChange={this.onSeeleChange}/>
               key<Button style={{ marginRight:'20px'}} type="primary" onClick={this.buykey}>通过seele购买key</Button> = {this.state.seele} seele
            </Card>
          </Col>
          <Col span={12}>
            <Card title="提款分红" bordered={false}>
              分红：{this.props.gamekeys} (seele)
              <Button style={{ marginRight:'20px'}} type="primary" onClick={this.approve}>提款(seele)</Button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};


function mapStateToProps(state) {
  const { address, balance,allowance, gamekeys, dividend,seelebalance } = state.example;
  return {
    address, balance,allowance, gamekeys, dividend,seelebalance
  };
}

export default connect(mapStateToProps)(MainPanel);
