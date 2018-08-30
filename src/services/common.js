import Eth from 'ethjs-query';
import EthContract from "ethjs-contract";
import request from '../utils/request';
import {BigNumber} from "bignumber.js/bignumber";
var urlprefix = "api";
const {web3} = window;
var eth = new Eth(web3.currentProvider);
var CoinBase = '';
var Contracts = {};

export function getCoinbase() {
  return new Promise(function (resolve, reject) {
    web3.eth.getCoinbase((err, coinbase) => {
      if (err) {
        alert(err);
        resolve(err);
      } else {
        console.log('coinbase', coinbase);
        CoinBase = coinbase;
        resolve(coinbase);
      }
    });
  })
}

export async function ChangeNetwork({network}) {
  urlprefix = network+"";
  return true;
}

export function getBalance({coinbase}) {
  return new Promise(function (resolve, reject) {
    web3.eth.getBalance(coinbase, (err, balance) => {
      if (err) {
        resolve(err);
      } else {
        resolve(web3.fromWei(balance.toNumber(), "ether"));
      }
    });
  })
}

export function NewContract({name, address}) {
  var url = "http://"+urlprefix+".etherscan.io/api?module=contract&action=getabi&address=" + address;
  console.log(url);
  return new Promise(function (resolve, reject) {
    request(url, {}).then(function (data) {
      if (data.data.result =="Contract source code not verified") {
        alert('Contract source code not verified')
        var res = {};
        res.error = "data.data.result";
        resolve(res);
        return
      }
      var contract = new EthContract(eth);
      var abi = JSON.parse(data.data.result);
      //var aaa = "[{\"constant\":false,\"inputs\":[],\"name\":\"aFunc\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"cFunc\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"bFunc\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"fallback\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"\",\"type\":\"uint8\"}],\"name\":\"log\",\"type\":\"event\"}]"
      //var abi = JSON.parse(aaa);
      var Ctr = contract(abi);
      var item = {};
      item.contract = Ctr.at(address);
      item.abi = abi;

      Contracts[address] = item.contract;
      resolve(item);
    }).catch(function (err) {
      reject(err);
    })
  })
}

function toBigNumber(value) {
  if (value == 0) {
    return 0
  }
  return new BigNumber(value).times('1000000000000000000');
}

export function calling(ctr, fn,pay, ...param) {
  return new Promise(function (resolve, reject) {
    Contracts[ctr][fn](...param,{from:CoinBase,value:toBigNumber(pay)},
      function (error, result) {
        if (error) {
          console.log(error)
          var res = {};
          res.error = error;
          resolve(res);
          return
        }

        console.log("result:",result);
        resolve(result);
      })
  })
}
