import React from 'react';
import {connect} from "dva/index";
import {Button, Card, Col, Input, Radio, Row, Select, Switch} from 'antd';
import {BigNumber} from 'bignumber.js'

const {Option, OptGroup} = Select;

var web3js = require('web3');
var utils = web3js.utils;

var {web3} = window;

class Common extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: "0x",
      searching: false,
      fn: {},
      fnname: [],
      req: {},
      reqvalue: 0,
      resultswitch: false
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'common/reloadinfo',
    });
  }

  getContract = () => {
    this.props.dispatch({
      type: 'common/getCtract',
      payload: {address: this.state.address},
    });
  };

  onAddressChange = (e) => {
    this.setState({
      address: e.target.value,
    })
  };

  onRequestChange = (e) => {
    var req = this.state.req;
    req[e.target.id] = e.target.value;
    this.setState({
      req: req
    })
  };

  onRequestValueChange = (e) => {
    this.setState({
      reqvalue: +e.target.value
    })
  };

  onSwitchChange = (checked) => {
    //console.log(`switch to ${checked}`);
    this.setState({
      resultswitch: checked
    })
  }

  parseReq = () => {
    var value = [];
    for (var index in this.state.fn.inputs) {
      var item = this.state.fn.inputs[index];
      var it = this.state.req[item.name];

      if (item.name == "") {
        it = index + "";
      }
      if (item.type.indexOf("uint") >= 0) {
        value.push(+it || 0);
        continue;
      }
      if (item.type == "bool") {
        value.push(it == "true");
        continue;
      }

      if (item.type == "string") {
        value.push(it || "");
        continue;
      }

      if (item.type == "address") {
        var addr = it || "0x0000000000000000000000000000000000000000";
        value.push(it);
        continue;
      }

      if (item.type.indexOf("bytes") >= 0) {
        var b = web3.fromAscii(it || "", 32);
        value.push(b);
        continue;
      }

      alert("unknown type ", item.type, it);
    }
    return value;
  }

  getValue = () => {
    var value = this.parseReq()
    console.log("request:", value);

    var pay = this.state.reqvalue;
    if (!this.state.fn.payable) {
      pay = 0;
    }

    this.props.dispatch({
      type: 'common/callingfunc',
      payload: {ctr: this.state.address, func: this.state.fn.name, value, pay},
    });
  };

  handleSelectChange = (value) => {
    if (value.length == 0) {
      return
    }
    if (value.length == 1) {
      value = value[0];
    } else {
      value = value[1];
    }

    for (var index in this.props.abi) {
      if (value == this.props.abi[index].name) {
        this.setState({
          fn: this.props.abi[index],
          fnname: [value],
          req: {}
        })
      }
    }
  }

  handleNetChange = (e) => {
    console.log("value:", e.target.value);

    this.props.dispatch({
      type: 'common/changenetwork',
      payload: {network:e.target.value},
    });
  }

  //=======================================
  render() {
    const children = [];
    const requestparam = [];
    const resultparam = [];
    var tip = "加载中"
    for (var index in this.props.contract.abi) {
      var item = this.props.contract.abi[index];
      if (item.name && item.name != "") {
        children.push(<Option key={item.name}>{item.name}</Option>);
        var tip = "加载成功"
      }
    }
    if (children.length == 0) {
      tip = "无数据"
    }

    var details = "";
    if (this.state.fn.name) {
      details = "类型" + this.state.fn.stateMutability + " |常量 " + this.state.fn.constant + " | 方法 " + this.state.fn.name + " | payable " + this.state.fn.payable;
    }

    for (var index in this.state.fn.inputs) {
      var item = this.state.fn.inputs[index];
      var title = item.name + ' (' + item.type + ')';
      if (item.name == "") {
        item.name = index;
      }
      switch (item.type) {
        case "string":
          requestparam.push(
            <Input placeholder={title} style={{width: '400px'}} key={item.name} id={item.name}
                   onChange={this.onRequestChange}/>
          );
          break;
        case "address":
          requestparam.push(
            <Input placeholder={title} style={{width: '400px'}} key={item.name} id={item.name}
                   onChange={this.onRequestChange}/>
          );
          break;
        case "bool":
          requestparam.push(
            <Input placeholder={title} style={{width: '400px'}} key={item.name} id={item.name}
                   onChange={this.onRequestChange}/>
          );
          break;
        default:
          if (item.type.indexOf("uint") >= 0) {
            requestparam.push(
              <Input type="number" placeholder={title} style={{width: '400px'}} key={item.name} id={item.name}
                     onChange={this.onRequestChange}/>
            );
            break;
          }
          if (item.type.indexOf("bytes") >= 0) {
            requestparam.push(
              <Input placeholder={title} style={{width: '400px'}} key={item.name} id={item.name}
                     onChange={this.onRequestChange}/>
            );
            break;
          }
          requestparam.push(
            <Input placeholder={title} style={{width: '400px'}} key={item.name} id={item.name}
                   onChange={this.onRequestChange}/>
          );
      }
    }

    function fromBigNumber(value) {
      return new BigNumber(value).div('1000000000000000000').toString()
    }


    for (var index in this.props.result) {
      if (!this.state.fn.outputs[index]) {
        break;
      }
      var item = this.state.fn.outputs[index];
      var res = this.props.result;
      if (item.name == "") {
        item.name = index;
      }
      switch (item.type) {
        case "string":
          resultparam.push(
            <div key={index}>{item.name + "  :  " + res[index]}</div>
          );
          break;
        case "address":
          resultparam.push(
            <div key={index}>{item.name + "  :  " + res[index]}</div>
          );
          break;
        case "bool":
          resultparam.push(
            <div key={index}>{item.name + "  :  " + res[index]}</div>
          );
          break;
        default:
          if (item.type.indexOf("uint") >= 0) {
            if (this.state.resultswitch) {
              resultparam.push(
                <div key={index}>{item.name + "  :  " + fromBigNumber(res[index])}</div>
              );
              break;
            }
            resultparam.push(
              <div key={index}>{item.name + "  :  " + new BigNumber(res[index]).toString()}</div>
            );
            break;
          }
          if (item.type.indexOf("bytes") >= 0) {
            resultparam.push(
              <div key={index}>{item.name + "  :  " + web3.toAscii(res[index])}</div>
            );
            break;
          }
          resultparam.push(
            <div key={index}>{item.name + "  :  " + res[index]}</div>
          );
      }

    }


    var showres = [];
    showres.push(
      <div key="abcshowres">
        {"结果显示"} <Switch checkedChildren="eth" unCheckedChildren="wei" onChange={this.onSwitchChange}/>
      </div>
    );

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
        ..
        <Row gutter={16}>
          <Col span={12}>
            <Card title={<div>
              {'合约地址    network:'}
              <Radio.Group value={this.props.network} onChange={this.handleNetChange}>
                <Radio.Button value="api">Main</Radio.Button>
                <Radio.Button value="api-kovan">Kovan</Radio.Button>
              </Radio.Group>
            </div>} bordered={false}>
              <Input style={{width: '400px', marginLeft: '20px'}} onChange={this.onAddressChange}/>
              <Button style={{marginRight: '20px'}} type="primary" onClick={this.getContract}>GET</Button><br/>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="合约方法" bordered={false}>
              <Select
                style={{paddingLeft: '30px'}}
                mode="tags"
                value={this.state.fnname}
                placeholder={tip}
                style={{width: '300px'}}
                onChange={this.handleSelectChange}
              >
                {children}
              </Select>,
            </Card>
          </Col>
        </Row>
        ..
        <Row gutter={16}>
          <Col span={12}>
            <Card title={'入参列表'} bordered={false} style={{testAlign: 'left'}}>
              {details}
              {requestparam}
              <br/>
              <Input type="number" placeholder="value(eth)" style={{width: '150px'}} key="fuckvalue"
                     onChange={this.onRequestValueChange}/>
              <Button type="primary" onClick={this.getValue}>Request</Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={showres} bordered={false}>

              {resultparam}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};


function mapStateToProps(state) {
  const {address, balance, contract, abi, result, network} = state.common;
  return {
    address, balance, contract, abi, result, network
  };
}

export default connect(mapStateToProps)(Common);
