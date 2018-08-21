import React from 'react';
import {connect} from "dva/index";
import MonacoEditor from 'react-monaco-editor';

class GameContract extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code:"pragma solidity ^0.4.24;\n" +
      "\n" +
      "interface SeeleToken {\n" +
      "  function totalSupply() external view returns (uint256);\n" +
      "  function balanceOf(address _who) external view returns (uint256);\n" +
      "  function transfer(address _to, uint256 _value) external returns (bool);\n" +
      "  function allowance(address _owner, address _spender) external view returns (uint256);\n" +
      "  function transferFrom(address _from, address _to, uint256 _value) external returns (bool);\n" +
      "  function approve(address _spender, uint256 _value) external returns (bool);\n" +
      "}\n" +
      "\n" +
      "contract Seelelong {\n" +
      "  \n" +
      "  SeeleToken constant private Seele = SeeleToken(0xBf10E654146ca9EA3A7B5Bf6c6cB4446688e5476);\n" +
      "  \n" +
      "  struct Player {\n" +
      "    uint256 id;\n" +
      "    address addr;       // player address\n" +
      "    bytes32 name;       // player name\n" +
      "    uint256 gen;        // general vault\n" +
      "    uint256 aff;        // affiliate vault\n" +
      "    uint256 keys;\n" +
      "  }\n" +
      "  \n" +
      "  mapping (uint256 => Player) public plyr_;\n" +
      "  mapping (address => uint256) public pIDxAddr_;\n" +
      "  uint256 public pID_;        // total number of players\n" +
      "  uint256 public SeeleTotal_;\n" +
      "  uint256 public keyprice = 0.0001 ether;\n" +
      "  \n" +
      "  constructor (){\n" +
      "    pID_ = 0;\n" +
      "  }\n" +
      "  \n" +
      "  function()\n" +
      "  public\n" +
      "  payable\n" +
      "  {\n" +
      "    revert();\n" +
      "  }\n" +
      "\n" +
      "\n" +
      "  event log(uint256,uint256,uint256);\n" +
      "  // 用seele买key\n" +
      "  function BuyKeyFromSeele(uint256 _value)\n" +
      "  public\n" +
      "  payable\n" +
      "  {\n" +
      "    uint id = pIDxAddr_[msg.sender];\n" +
      "    if (id == 0) {\n" +
      "      pID_++;\n" +
      "      id = pID_;\n" +
      "      pIDxAddr_[msg.sender] = id;\n" +
      "    }\n" +
      "    \n" +
      "    plyr_[id].addr = msg.sender;\n" +
      "    \n" +
      "    // 需要先approve才能成功\n" +
      "    Seele.transferFrom(msg.sender,this,_value);\n" +
      "    SeeleTotal_+=_value;\n" +
      "\n" +
      "    plyr_[id].keys += _value / keyprice * 10**18;\n" +
      "    plyr_[id].aff += _value / 2;\n" +
      "    emit log(_value,keyprice,_value / keyprice * 10**18);\n" +
      "  }\n" +
      "  \n" +
      "  function withdraw()\n" +
      "  public\n" +
      "  payable\n" +
      "  {\n" +
      "    uint id = pIDxAddr_[msg.sender];\n" +
      "    require( id > 0 );\n" +
      "    \n" +
      "    Seele.transfer(msg.sender, plyr_[id].aff);\n" +
      "    SeeleTotal_ -= plyr_[id].aff;\n" +
      "    plyr_[id].aff = 0;\n" +
      "    plyr_[id].keys = 0;\n" +
      "  }\n" +
      "  \n" +
      "  //测试分配规则 最后一个人50% 剩下的平分\n" +
      "  function endRound()\n" +
      "  public\n" +
      "  payable\n" +
      "  {\n" +
      "    require(pID_ > 0);\n" +
      "    if (pID_ == 1) {\n" +
      "      Seele.transfer(plyr_[pID_].addr, SeeleTotal_);\n" +
      "      plyr_[pID_].aff = 0;\n" +
      "      return;\n" +
      "    }\n" +
      "    \n" +
      "    address winner = plyr_[pID_].addr;\n" +
      "    uint256 winnerReward = SeeleTotal_ / 2;\n" +
      "    \n" +
      "    Seele.transfer(winner, winnerReward);\n" +
      "    \n" +
      "    uint256 leftRewardPer = (SeeleTotal_ - winnerReward) / (pID_ - 1);\n" +
      "    \n" +
      "    for( uint8 i=1; i< pID_; i++ ){\n" +
      "      Seele.transfer(plyr_[i].addr, leftRewardPer);\n" +
      "      plyr_[i].aff = 0;\n" +
      "    }\n" +
      "    \n" +
      "    SeeleTotal_ = 0;\n" +
      "  }\n" +
      "}\n"
    }
  }

  render() {
    return (
      <MonacoEditor
    width="100%"
    height={1000}
    value={this.state.code}
    language="javascript"
    options={{ lineNumbersMinChars: 0, selectOnLineNumbers: true }}
    >
      </MonacoEditor>
    );
  }
};



export default connect()(GameContract);
