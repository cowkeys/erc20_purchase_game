pragma solidity ^0.4.24;

interface SeeleToken {
  function totalSupply() external view returns (uint256);
  function balanceOf(address _who) external view returns (uint256);
  function transfer(address _to, uint256 _value) external returns (bool);
  function allowance(address _owner, address _spender) external view returns (uint256);
  function transferFrom(address _from, address _to, uint256 _value) external returns (bool);
  function approve(address _spender, uint256 _value) external returns (bool);
}

contract Seelelong {
  
  SeeleToken constant private Seele = SeeleToken(0xBf10E654146ca9EA3A7B5Bf6c6cB4446688e5476);
  
  struct Player {
    uint256 id;
    address addr;       // player address
    bytes32 name;       // player name
    uint256 gen;        // general vault
    uint256 aff;        // affiliate vault
    uint256 keys;
  }
  
  mapping (uint256 => Player) public plyr_;
  mapping (address => uint256) public pIDxAddr_;
  uint256 public pID_;        // total number of players
  uint256 public SeeleTotal_;
  uint256 public keyprice = 0.0001 ether;
  
  constructor (){
    pID_ = 0;
  }
  
  function()
  public
  payable
  {
    revert();
  }


  event log(uint256,uint256,uint256);
  // 用seele买key
  function BuyKeyFromSeele(uint256 _value)
  public
  payable
  {
    uint id = pIDxAddr_[msg.sender];
    if (id == 0) {
      pID_++;
      id = pID_;
      pIDxAddr_[msg.sender] = id;
    }
    
    plyr_[id].addr = msg.sender;
    
    // 需要先approve才能成功
    Seele.transferFrom(msg.sender,this,_value);
    SeeleTotal_+=_value;

    plyr_[id].keys += _value / keyprice * 10**18;
    plyr_[id].aff += _value / 2;
    emit log(_value,keyprice,_value / keyprice * 10**18);
  }
  
  function withdraw()
  public
  payable
  {
    uint id = pIDxAddr_[msg.sender];
    require( id > 0 );
    
    Seele.transfer(msg.sender, plyr_[id].aff);
    SeeleTotal_ -= plyr_[id].aff;
    plyr_[id].aff = 0;
    plyr_[id].keys = 0;
  }
  
  //测试分配规则 最后一个人50% 剩下的平分
  function endRound()
  public
  payable
  {
    require(pID_ > 0);
    if (pID_ == 1) {
      Seele.transfer(plyr_[pID_].addr, SeeleTotal_);
      plyr_[pID_].aff = 0;
      return;
    }
    
    address winner = plyr_[pID_].addr;
    uint256 winnerReward = SeeleTotal_ / 2;
    
    Seele.transfer(winner, winnerReward);
    
    uint256 leftRewardPer = (SeeleTotal_ - winnerReward) / (pID_ - 1);
    
    for( uint8 i=1; i< pID_; i++ ){
      Seele.transfer(plyr_[i].addr, leftRewardPer);
      plyr_[i].aff = 0;
    }
    
    SeeleTotal_ = 0;
  }
}
