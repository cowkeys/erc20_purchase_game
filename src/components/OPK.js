import React from 'react';
import {connect} from "dva/index";
import { Card, Col, Row, InputNumber,Button,Input} from 'antd';

class OPK extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      money : 100,
      eth : 0,
      opk:0,
      longeth:0,
      longselleth:0,
      percent:0,
      affaddress:"0x"
    }
  }

  componentDidMount () {
    // this.props.dispatch({
    //   type: 'opk/reloadinfo',
    // });
    // var params = [10,2,3];
    this.props.dispatch({
      type: 'opk/reloadinfo',
      payload:{value:[1]}
    });

    // setInterval(() => {
    //   this.props.dispatch({
    //     type: 'opk/reloadinfo',
    //   });
    // }, 5000);
  }
//=======================opk=====================
  withdraw = () => {
    this.props.dispatch({
      type: 'opk/withdraw',
      payload: {},
    });
  };

  buyopk = () => {
    console.log("buyopk:",this.state.eth);
    this.props.dispatch({
      type: 'opk/buyopk',
      payload: {value:+this.state.eth},
    });
  };

  onEthChange = (value) => {
    this.setState({
      eth:value,
    })
  };

  onOpkChange = (value) => {
    this.setState({
      opk:value,
    })
  };

  sellopk = () => {
    console.log("sellopk:",this.state.opk);
    this.props.dispatch({
      type: 'opk/sellopk',
      payload: {value:+this.state.opk},
    });
  };

  //=======================long=====================
  longwithdraw = () => {
    this.props.dispatch({
      type: 'opk/longwithdraw',
      payload: {},
    });
  };

  onlongEthChange = (value) => {
    this.setState({
      longeth:value,
    })
  };

  buylongkey = () => {
    console.log("buy long key:",this.state.longeth);
    this.props.dispatch({
      type: 'opk/buylongkey',
      payload: {value:+this.state.longeth},
    });
  };

  onlongsellEthChange = (value) => {
    this.setState({
      longselleth:value,
    })
  };

  //=========divieslong
  onDistribute = () => {
    this.props.dispatch({
      type: 'opk/distribute',
      payload: {percent:+this.state.percent},
    });
  };

  onDistributeChange = (value) => {
    this.setState({
      percent:value,
    })
  };

  queryLaff = () => {
    console.log('got',this.state.affaddress)
    this.props.dispatch({
      type: 'opk/querylaff',
      payload: {address:this.state.affaddress},
    });
  };

  onlongLaffChange = (e) => {
    this.setState({
      affaddress:e.target.value,
    })
  };

  test = () => {
    var people = 1;
    var result = 0;
    for (var i = 0;i++;i<1000) {
      result += 1 / people;
      people++;
      if (result>50){
        console.log('人数:',i);
        break;
      }
    }
  }

  //=======================================
  render() {
    return (
      <div style={{background: '#ECECEC', padding: '30px'}}>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="当前账户地址" bordered={false}>{this.props.address}</Card>
          </Col>
          <Col span={12}>
            <Card title="当前账户余额(eth)" bordered={false}>{this.props.balance}</Card>
          </Col>
        </Row>
        -------------------opk------------------
        <Row gutter={16}>
          <Col span={12}>
            <Card title={'统计'+ ' | ico状态: ' + this.props.isico} bordered={false}>
              opk 持有数量 ：{this.props.opk} (opk) / 买价：{this.props.buyprice} (eth) /卖价：{this.props.sellprice} (eth)
            </Card>
          </Col>
          <Col span={12}>
            <Card title="提款" bordered={false}>
              分红：{this.props.opkdividend} (eth)
              <Button style={{ marginRight:'20px'}} type="primary" onClick={this.withdraw}>提款(eth)</Button>
            </Card>
          </Col>
        </Row>
        ..
        <Row gutter={16}>
          <Col span={12}>
            <Card title="购买opk" bordered={false}>
              <InputNumber style={{ width: '150px',marginLeft:'20px'}} min={0} defaultValue={0} onChange={this.onEthChange}/>
              (eth)<Button style={{ marginRight:'20px'}} type="primary" onClick={this.buyopk}>买入token</Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="卖出opk" bordered={false}>
              <InputNumber style={{ width: '150px',marginLeft:'20px' }} min={0} defaultValue={0} onChange={this.onOpkChange}/>
              (opk)<Button type="primary" onClick={this.sellopk}>卖出token</Button>
            </Card>
          </Col>
        </Row>
        -------------------opklong-------------------
        <Row gutter={16}>
          <Col span={24}>
            <Card title={'统计 id='+this.props.pid + ' | active状态: ' + this.props.isactive + ' | round_active状态: ' + this.props.roundactive } bordered={false} >
              <InputNumber style={{ width: '150px',marginLeft:'20px'}} min={0} defaultValue={0} onChange={this.onDistributeChange}/>
              <Button style={{ marginRight:'20px'}} type="primary" onClick={this.onDistribute}>Distribute</Button><br/>
              key 持有数量 ：{this.props.keys} (key) / 买价：{this.props.keybuyprice} (eth) / win({this.props.vaults.win}) | gen({this.props.vaults.gen}) | aff({this.props.vaults.aff})
            </Card>
          </Col>
        </Row>
        ..
        <Row gutter={16}>
          <Col span={12}>
            <Card title="购买" bordered={false}>
              <InputNumber style={{ width: '150px',marginLeft:'20px'}} min={0} defaultValue={0} onChange={this.onlongEthChange}/>
              (eth)<Button style={{ marginRight:'20px'}} type="primary" onClick={this.buylongkey}>买入key</Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="提款(eth)" bordered={false}>
              <InputNumber style={{ width: '150px',marginLeft:'20px' }} min={0} defaultValue={0} onChange={this.onlongsellEthChange}/>
              <Button style={{ marginRight:'20px'}} type="primary" onClick={this.longwithdraw}>提款(eth)</Button>
            </Card>
          </Col>
        </Row>
        ..
        <Row gutter={16}>
          <Col span={12}>
            <Card title="查询" bordered={false}>
              <Input style={{ width: '300px',marginLeft:'20px'}} onChange={this.onlongLaffChange}/>
              <Button style={{ marginRight:'20px'}} type="primary" onClick={this.queryLaff}>query</Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="" bordered={false}>
              {this.props.laff}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};


function mapStateToProps(state) {
  const { address, balance,opk,buyprice,sellprice,opkdividend,isico,
    isactive,keys,keybuyprice,vaults,pid,laff, roundactive } = state.opk;

  return {
    address, balance,opk,buyprice,sellprice,opkdividend,isico,
    isactive,keys,keybuyprice,vaults,pid,laff,roundactive
  };
}

export default connect(mapStateToProps)(OPK);
