import Eth from 'ethjs-query';
import EthContract from 'ethjs-contract';
import hourglassAbi from './contract/hourglassAbi';
import {BigNumber} from 'bignumber.js'


const { web3 } = window;
var eth = new Eth(web3.currentProvider);
var CoinBase = '';
var hourglassAddr = '0x97550CE17666bB49349EF0E50f9fDb88353EDb64';
var hourglassContract;

if (typeof web3 === 'undefined') {
    alert("failed to un");
}

function NewHourglassContract() {
  var contract = new EthContract(eth);
  var tokenCtr = contract(hourglassAbi);
  hourglassContract = tokenCtr.at(hourglassAddr);
  console.log(hourglassContract);
}

NewHourglassContract();

export function getCoinbase() {
  return new Promise(function(resolve, reject){
    web3.eth.getCoinbase((err, coinbase) => {
      if (err) {
        reject(err);
      } else {
        CoinBase = coinbase;
        console.log('coinbase:',coinbase);
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

function toBigNumber(value) {
  return new BigNumber(value).times('1000000000000000000');
}

function fromBigNumber(value) {
  return new BigNumber(value).div('1000000000000000000').toString()
}

var nulladdr = '0x0000000000000000000000000000000000000000';

//===================
export function buyOpk({value}) {
  console.log("buy value,",value)
  return new Promise(function(resolve, reject){
    hourglassContract.buy(nulladdr, {from:CoinBase,value:toBigNumber(value)},
      function(error,result){
      if (error) {
        console.log(error)
        reject(error);
        return
      }
      resolve(result)
    })
  })
}

export function sellOpk({value}) {
  console.log("sell value,",value)
  return new Promise(function(resolve, reject){
    hourglassContract.sell(toBigNumber(value), {from:CoinBase},
      function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        resolve(result);
      });
  })
}

export function withdraw() {
  console.log("withdraw value,")
  return new Promise(function(resolve, reject){
    hourglassContract.withdraw({from:CoinBase},
      function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        resolve(result);
      });
  })
}

export function opktokens() {
  return new Promise(function(resolve, reject){
    hourglassContract.tokenBalanceLedger_(CoinBase,
      function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        console.log('opktoken:',result)
        resolve(fromBigNumber(result[0]));
      });
  })
}

export function sellprice() {
  return new Promise(function(resolve, reject){
    hourglassContract.sellPrice(function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        console.log('sellprice:',result)
        resolve(fromBigNumber(result[0]));
    });
  })
}

export function buyprice() {
    return new Promise(function(resolve, reject){
      hourglassContract.buyPrice(
        function(error,result){
          if (error) {
            console.log(error)
            reject(error);
            return
          }
          console.log('buyprice:',result)
          resolve(fromBigNumber(result[0]));
        });
    })
}

export function isIco() {
  return new Promise(function(resolve, reject){
    hourglassContract.inICO(function(error,result){
      if (error) {
        console.log(error)
        reject(error);
        return
      }
      console.log('isico:',result);
      resolve(result[0]);
    });
  })
}

export function dividendsOf() {
  return new Promise(function(resolve, reject){
    hourglassContract.dividendsOf(CoinBase,function(error,result){
      if (error) {
        console.log(error)
        reject(error);
        return
      }
      console.log('dividendsOf:',result);
      resolve(fromBigNumber(result[0]));
    });
  })
}
