import Eth from 'ethjs-query';
import EthContract from 'ethjs-contract';
import tokenAbi from './contract/tokenAbi';
import gameAbi from './contract/gameAbi';
//var BigNumber = require('big-number');
//var BigNumber = require('big-number');
import {BigNumber} from 'bignumber.js'


const { web3 } = window;
var eth = new Eth(web3.currentProvider);
var CoinBase = '';
var tokenAddr = '0xBf10E654146ca9EA3A7B5Bf6c6cB4446688e5476';
var gameAddr = '0x0Fc6eb03AC93EdaBA749EDbC87DdaBC2B221C86E';
var TokenContract;
var GameContract;

if (typeof web3 === 'undefined') {
    alert("failed to un");
}

function NewTokenContract() {
  var contract = new EthContract(eth);
  var tokenCtr = contract(tokenAbi);
  TokenContract = tokenCtr.at(tokenAddr);
  console.log(TokenContract);
}

function NewGameContract() {
  var contract = new EthContract(eth);
  var tokenCtr = contract(gameAbi);
  GameContract = tokenCtr.at(gameAddr);
  console.log(GameContract);
}

NewTokenContract();
NewGameContract();

export function getCoinbase() {
  return new Promise(function(resolve, reject){
    web3.eth.getCoinbase((err, coinbase) => {
      if (err) {
        reject(err);
      } else {
        CoinBase = coinbase;
        resolve(coinbase);
      }
    });
  })
}

export function getBalance({coinbase}) {
  return new Promise(function(resolve, reject){
    web3.eth.getBalance(coinbase,(err, balance) => {
      if (err) {
        reject(err);
      } else {
        resolve(web3.fromWei(balance.toNumber(), "ether" ));
      }
    });
  })
}

function formatBN(bn){
  return new BigNumber(bn).div('1000000000000000000').toFormat(18);
}

export function getLeftAuthSeele() {
  return new Promise(function(resolve, reject){
    TokenContract.allowance(CoinBase,gameAddr,function(error,result){
      if (error) {
        console.log(error)
        reject(error);
        return
      }
      resolve(new BigNumber(result[0]).div('1000000000000000000').toNumber());
    })
  })
}

export function allocateSeele({value}) {
  return new Promise(function(resolve, reject){
    TokenContract.approve(gameAddr,new BigNumber(value).times('1000000000000000000'),{from:CoinBase},function(error,result){
      if (error) {
        console.log(error)
        reject(error);
        return
      }
      console.log(result)
      resolve(true);
    })
  })
}

export function buyKeyFromSeele({value}) {
  return new Promise(function(resolve, reject){
    GameContract.BuyKeyFromSeele(new BigNumber(value).times('1000000000000000000'),{from:CoinBase},function(error,result){
      if (error) {
        console.log(error)
        reject(error);
        return
      }
      console.log(result)
      resolve(true);
    })
  })
}

export function seeleBalance() {
  return new Promise(function(resolve, reject){
    TokenContract.balanceOf(CoinBase,function(error,result){
      if (error) {
        console.log(error)
        reject(error);
        return
      }
      resolve(new BigNumber(result[0]).div('1000000000000000000').toString())
    })
  })
}

export function buyseele() {

}

export function currentPlayer() {
  return new Promise(function(resolve, reject){
    console.log("coinbase:",CoinBase);
    GameContract.pIDxAddr_(CoinBase,function(error,result){
      if (error) {
        console.log(error)
        reject(error);
        return
      }

      GameContract.plyr_(result[0],function(error2,result2){
        if (error2) {
          console.log(error2)
          reject(error2);
          return
        }
        console.log(result2);
        resolve(new BigNumber(result2.keys).div('1000000000000000000').toNumber())
      })
    })
  })
}
