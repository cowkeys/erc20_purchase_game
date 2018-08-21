import React from 'react';
import {connect} from "dva/index";
import MonacoEditor from 'react-monaco-editor';

class TokenContract extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code:"pragma solidity ^0.4.24;\n" +
      "\n" +
      "// File: contracts/zeppelin-solidity/contracts/ownership/Ownable.sol\n" +
      "\n" +
      "/**\n" +
      " * @title Ownable\n" +
      " * @dev The Ownable contract has an owner address, and provides basic authorization control\n" +
      " * functions, this simplifies the implementation of \"user permissions\".\n" +
      " */\n" +
      "contract Ownable {\n" +
      "  address public owner;\n" +
      "\n" +
      "\n" +
      "  event OwnershipRenounced(address indexed previousOwner);\n" +
      "  event OwnershipTransferred(\n" +
      "    address indexed previousOwner,\n" +
      "    address indexed newOwner\n" +
      "  );\n" +
      "\n" +
      "\n" +
      "  /**\n" +
      "   * @dev The Ownable constructor sets the original `owner` of the contract to the sender\n" +
      "   * account.\n" +
      "   */\n" +
      "  constructor() public {\n" +
      "    owner = msg.sender;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "   * @dev Throws if called by any account other than the owner.\n" +
      "   */\n" +
      "  modifier onlyOwner() {\n" +
      "    require(msg.sender == owner);\n" +
      "    _;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "   * @dev Allows the current owner to relinquish control of the contract.\n" +
      "   * @notice Renouncing to ownership will leave the contract without an owner.\n" +
      "   * It will not be possible to call the functions with the `onlyOwner`\n" +
      "   * modifier anymore.\n" +
      "   */\n" +
      "  function renounceOwnership() public onlyOwner {\n" +
      "    emit OwnershipRenounced(owner);\n" +
      "    owner = address(0);\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "   * @dev Allows the current owner to transfer control of the contract to a newOwner.\n" +
      "   * @param _newOwner The address to transfer ownership to.\n" +
      "   */\n" +
      "  function transferOwnership(address _newOwner) public onlyOwner {\n" +
      "    _transferOwnership(_newOwner);\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "   * @dev Transfers control of the contract to a newOwner.\n" +
      "   * @param _newOwner The address to transfer ownership to.\n" +
      "   */\n" +
      "  function _transferOwnership(address _newOwner) internal {\n" +
      "    require(_newOwner != address(0));\n" +
      "    emit OwnershipTransferred(owner, _newOwner);\n" +
      "    owner = _newOwner;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// File: contracts/zeppelin-solidity/contracts/lifecycle/Pausable.sol\n" +
      "\n" +
      "/**\n" +
      " * @title Pausable\n" +
      " * @dev Base contract which allows children to implement an emergency stop mechanism.\n" +
      " */\n" +
      "contract Pausable is Ownable {\n" +
      "  event Pause();\n" +
      "  event Unpause();\n" +
      "\n" +
      "  bool public paused = false;\n" +
      "\n" +
      "\n" +
      "  /**\n" +
      "   * @dev Modifier to make a function callable only when the contract is not paused.\n" +
      "   */\n" +
      "  modifier whenNotPaused() {\n" +
      "    require(!paused);\n" +
      "    _;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "   * @dev Modifier to make a function callable only when the contract is paused.\n" +
      "   */\n" +
      "  modifier whenPaused() {\n" +
      "    require(paused);\n" +
      "    _;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "   * @dev called by the owner to pause, triggers stopped state\n" +
      "   */\n" +
      "  function pause() public onlyOwner whenNotPaused {\n" +
      "    paused = true;\n" +
      "    emit Pause();\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "   * @dev called by the owner to unpause, returns to normal state\n" +
      "   */\n" +
      "  function unpause() public onlyOwner whenPaused {\n" +
      "    paused = false;\n" +
      "    emit Unpause();\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// File: contracts/zeppelin-solidity/contracts/math/SafeMath.sol\n" +
      "\n" +
      "/**\n" +
      " * @title SafeMath\n" +
      " * @dev Math operations with safety checks that throw on error\n" +
      " */\n" +
      "library SafeMath {\n" +
      "\n" +
      "  /**\n" +
      "  * @dev Multiplies two numbers, throws on overflow.\n" +
      "  */\n" +
      "  function mul(uint256 _a, uint256 _b) internal pure returns (uint256 c) {\n" +
      "    // Gas optimization: this is cheaper than asserting 'a' not being zero, but the\n" +
      "    // benefit is lost if 'b' is also tested.\n" +
      "    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522\n" +
      "    if (_a == 0) {\n" +
      "      return 0;\n" +
      "    }\n" +
      "\n" +
      "    c = _a * _b;\n" +
      "    assert(c / _a == _b);\n" +
      "    return c;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "  * @dev Integer division of two numbers, truncating the quotient.\n" +
      "  */\n" +
      "  function div(uint256 _a, uint256 _b) internal pure returns (uint256) {\n" +
      "    // assert(_b > 0); // Solidity automatically throws when dividing by 0\n" +
      "    // uint256 c = _a / _b;\n" +
      "    // assert(_a == _b * c + _a % _b); // There is no case in which this doesn't hold\n" +
      "    return _a / _b;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).\n" +
      "  */\n" +
      "  function sub(uint256 _a, uint256 _b) internal pure returns (uint256) {\n" +
      "    assert(_b <= _a);\n" +
      "    return _a - _b;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "  * @dev Adds two numbers, throws on overflow.\n" +
      "  */\n" +
      "  function add(uint256 _a, uint256 _b) internal pure returns (uint256 c) {\n" +
      "    c = _a + _b;\n" +
      "    assert(c >= _a);\n" +
      "    return c;\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// File: contracts/zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol\n" +
      "\n" +
      "/**\n" +
      " * @title ERC20Basic\n" +
      " * @dev Simpler version of ERC20 interface\n" +
      " * See https://github.com/ethereum/EIPs/issues/179\n" +
      " */\n" +
      "contract ERC20Basic {\n" +
      "  function totalSupply() public view returns (uint256);\n" +
      "  function balanceOf(address _who) public view returns (uint256);\n" +
      "  function transfer(address _to, uint256 _value) public returns (bool);\n" +
      "  event Transfer(address indexed from, address indexed to, uint256 value);\n" +
      "}\n" +
      "\n" +
      "// File: contracts/zeppelin-solidity/contracts/token/ERC20/BasicToken.sol\n" +
      "\n" +
      "/**\n" +
      " * @title Basic token\n" +
      " * @dev Basic version of StandardToken, with no allowances.\n" +
      " */\n" +
      "contract BasicToken is ERC20Basic {\n" +
      "  using SafeMath for uint256;\n" +
      "\n" +
      "  mapping(address => uint256) internal balances;\n" +
      "\n" +
      "  uint256 internal totalSupply_;\n" +
      "\n" +
      "  /**\n" +
      "  * @dev Total number of tokens in existence\n" +
      "  */\n" +
      "  function totalSupply() public view returns (uint256) {\n" +
      "    return totalSupply_;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "  * @dev Transfer token for a specified address\n" +
      "  * @param _to The address to transfer to.\n" +
      "  * @param _value The amount to be transferred.\n" +
      "  */\n" +
      "  function transfer(address _to, uint256 _value) public returns (bool) {\n" +
      "    require(_value <= balances[msg.sender]);\n" +
      "    require(_to != address(0));\n" +
      "\n" +
      "    balances[msg.sender] = balances[msg.sender].sub(_value);\n" +
      "    balances[_to] = balances[_to].add(_value);\n" +
      "    emit Transfer(msg.sender, _to, _value);\n" +
      "    return true;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "  * @dev Gets the balance of the specified address.\n" +
      "  * @param _owner The address to query the the balance of.\n" +
      "  * @return An uint256 representing the amount owned by the passed address.\n" +
      "  */\n" +
      "  function balanceOf(address _owner) public view returns (uint256) {\n" +
      "    return balances[_owner];\n" +
      "  }\n" +
      "\n" +
      "}\n" +
      "\n" +
      "// File: contracts/zeppelin-solidity/contracts/token/ERC20/ERC20.sol\n" +
      "\n" +
      "/**\n" +
      " * @title ERC20 interface\n" +
      " * @dev see https://github.com/ethereum/EIPs/issues/20\n" +
      " */\n" +
      "contract ERC20 is ERC20Basic {\n" +
      "  function allowance(address _owner, address _spender)\n" +
      "    public view returns (uint256);\n" +
      "\n" +
      "  function transferFrom(address _from, address _to, uint256 _value)\n" +
      "    public returns (bool);\n" +
      "\n" +
      "  function approve(address _spender, uint256 _value) public returns (bool);\n" +
      "  event Approval(\n" +
      "    address indexed owner,\n" +
      "    address indexed spender,\n" +
      "    uint256 value\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "// File: contracts/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol\n" +
      "\n" +
      "/**\n" +
      " * @title Standard ERC20 token\n" +
      " *\n" +
      " * @dev Implementation of the basic standard token.\n" +
      " * https://github.com/ethereum/EIPs/issues/20\n" +
      " * Based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol\n" +
      " */\n" +
      "contract StandardToken is ERC20, BasicToken {\n" +
      "\n" +
      "  mapping (address => mapping (address => uint256)) internal allowed;\n" +
      "\n" +
      "\n" +
      "  /**\n" +
      "   * @dev Transfer tokens from one address to another\n" +
      "   * @param _from address The address which you want to send tokens from\n" +
      "   * @param _to address The address which you want to transfer to\n" +
      "   * @param _value uint256 the amount of tokens to be transferred\n" +
      "   */\n" +
      "  function transferFrom(\n" +
      "    address _from,\n" +
      "    address _to,\n" +
      "    uint256 _value\n" +
      "  )\n" +
      "    public\n" +
      "    returns (bool)\n" +
      "  {\n" +
      "    require(_value <= balances[_from]);\n" +
      "    require(_value <= allowed[_from][msg.sender]);\n" +
      "    require(_to != address(0));\n" +
      "\n" +
      "    balances[_from] = balances[_from].sub(_value);\n" +
      "    balances[_to] = balances[_to].add(_value);\n" +
      "    allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);\n" +
      "    emit Transfer(_from, _to, _value);\n" +
      "    return true;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "   * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.\n" +
      "   * Beware that changing an allowance with this method brings the risk that someone may use both the old\n" +
      "   * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this\n" +
      "   * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:\n" +
      "   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\n" +
      "   * @param _spender The address which will spend the funds.\n" +
      "   * @param _value The amount of tokens to be spent.\n" +
      "   */\n" +
      "  function approve(address _spender, uint256 _value) public returns (bool) {\n" +
      "    allowed[msg.sender][_spender] = _value;\n" +
      "    emit Approval(msg.sender, _spender, _value);\n" +
      "    return true;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "   * @dev Function to check the amount of tokens that an owner allowed to a spender.\n" +
      "   * @param _owner address The address which owns the funds.\n" +
      "   * @param _spender address The address which will spend the funds.\n" +
      "   * @return A uint256 specifying the amount of tokens still available for the spender.\n" +
      "   */\n" +
      "  function allowance(\n" +
      "    address _owner,\n" +
      "    address _spender\n" +
      "   )\n" +
      "    public\n" +
      "    view\n" +
      "    returns (uint256)\n" +
      "  {\n" +
      "    return allowed[_owner][_spender];\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "   * @dev Increase the amount of tokens that an owner allowed to a spender.\n" +
      "   * approve should be called when allowed[_spender] == 0. To increment\n" +
      "   * allowed value is better to use this function to avoid 2 calls (and wait until\n" +
      "   * the first transaction is mined)\n" +
      "   * From MonolithDAO Token.sol\n" +
      "   * @param _spender The address which will spend the funds.\n" +
      "   * @param _addedValue The amount of tokens to increase the allowance by.\n" +
      "   */\n" +
      "  function increaseApproval(\n" +
      "    address _spender,\n" +
      "    uint256 _addedValue\n" +
      "  )\n" +
      "    public\n" +
      "    returns (bool)\n" +
      "  {\n" +
      "    allowed[msg.sender][_spender] = (\n" +
      "      allowed[msg.sender][_spender].add(_addedValue));\n" +
      "    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);\n" +
      "    return true;\n" +
      "  }\n" +
      "\n" +
      "  /**\n" +
      "   * @dev Decrease the amount of tokens that an owner allowed to a spender.\n" +
      "   * approve should be called when allowed[_spender] == 0. To decrement\n" +
      "   * allowed value is better to use this function to avoid 2 calls (and wait until\n" +
      "   * the first transaction is mined)\n" +
      "   * From MonolithDAO Token.sol\n" +
      "   * @param _spender The address which will spend the funds.\n" +
      "   * @param _subtractedValue The amount of tokens to decrease the allowance by.\n" +
      "   */\n" +
      "  function decreaseApproval(\n" +
      "    address _spender,\n" +
      "    uint256 _subtractedValue\n" +
      "  )\n" +
      "    public\n" +
      "    returns (bool)\n" +
      "  {\n" +
      "    uint256 oldValue = allowed[msg.sender][_spender];\n" +
      "    if (_subtractedValue >= oldValue) {\n" +
      "      allowed[msg.sender][_spender] = 0;\n" +
      "    } else {\n" +
      "      allowed[msg.sender][_spender] = oldValue.sub(_subtractedValue);\n" +
      "    }\n" +
      "    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);\n" +
      "    return true;\n" +
      "  }\n" +
      "\n" +
      "}\n" +
      "\n" +
      "// File: contracts/zeppelin-solidity/contracts/token/ERC20/PausableToken.sol\n" +
      "\n" +
      "/**\n" +
      " * @title Pausable token\n" +
      " * @dev StandardToken modified with pausable transfers.\n" +
      " **/\n" +
      "contract PausableToken is StandardToken, Pausable {\n" +
      "\n" +
      "  function transfer(\n" +
      "    address _to,\n" +
      "    uint256 _value\n" +
      "  )\n" +
      "    public\n" +
      "    whenNotPaused\n" +
      "    returns (bool)\n" +
      "  {\n" +
      "    return super.transfer(_to, _value);\n" +
      "  }\n" +
      "\n" +
      "  function transferFrom(\n" +
      "    address _from,\n" +
      "    address _to,\n" +
      "    uint256 _value\n" +
      "  )\n" +
      "    public\n" +
      "    whenNotPaused\n" +
      "    returns (bool)\n" +
      "  {\n" +
      "    return super.transferFrom(_from, _to, _value);\n" +
      "  }\n" +
      "\n" +
      "  function approve(\n" +
      "    address _spender,\n" +
      "    uint256 _value\n" +
      "  )\n" +
      "    public\n" +
      "    whenNotPaused\n" +
      "    returns (bool)\n" +
      "  {\n" +
      "    return super.approve(_spender, _value);\n" +
      "  }\n" +
      "\n" +
      "  function increaseApproval(\n" +
      "    address _spender,\n" +
      "    uint _addedValue\n" +
      "  )\n" +
      "    public\n" +
      "    whenNotPaused\n" +
      "    returns (bool success)\n" +
      "  {\n" +
      "    return super.increaseApproval(_spender, _addedValue);\n" +
      "  }\n" +
      "\n" +
      "  function decreaseApproval(\n" +
      "    address _spender,\n" +
      "    uint _subtractedValue\n" +
      "  )\n" +
      "    public\n" +
      "    whenNotPaused\n" +
      "    returns (bool success)\n" +
      "  {\n" +
      "    return super.decreaseApproval(_spender, _subtractedValue);\n" +
      "  }\n" +
      "}\n" +
      "\n" +
      "// File: contracts/TestToken.sol\n" +
      "\n" +
      "/// @author reedhong\n" +
      "contract TestToken is PausableToken {\n" +
      "  using SafeMath for uint;\n" +
      "  \n" +
      "  /// Constant token specific fields\n" +
      "  string public constant name = \"TestToken\";\n" +
      "  string public constant symbol = \"Cows\";\n" +
      "  uint public constant decimals = 18;\n" +
      "  \n" +
      "  constructor()\n" +
      "  public\n" +
      "  {\n" +
      "    totalSupply_ = 100000000 ether;\n" +
      "    paused = false;\n" +
      "    balances[0xc0be69a5a0c1dce0d98649532f27cd3824f6061f] = totalSupply_;\n" +
      "  }\n" +
      "}\n"
    }
  }

  render() {
    const options = {
      selectOnLineNumbers: true
    };

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



export default connect()(TokenContract);
