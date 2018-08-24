import Eth from 'ethjs-query';
import EthContract from 'ethjs-contract';
import pklongAbi from './contract/pklongAbi';
import diviesAbi from './contract/divieslongAbi';
import {BigNumber} from 'bignumber.js'


const { web3 } = window;
var eth = new Eth(web3.currentProvider);
var CoinBase = '';
var pid = '';
var pklongAddr = '0xc0c2D062306fe840e11F7FCf394DF831A09EF20C';//prod
var divieslongAddr = '0xD2344f06ce022a7424619b2aF222e71b65824975';//prod
// var pklongAddr = '0x1ABE8cf5859286B5E5245CD4a6667a73536f4F91';//dev
// var divieslongAddr = '0x3654953d60f04b0091f0508A2d4baE3ae64e064B';//dev
var pklongContract;
var divieslongContract;

if (typeof web3 === 'undefined') {
  alert("failed to un");
}

function NewpklongContract() {
  var contract = new EthContract(eth);
  var tokenCtr = contract(pklongAbi);
  pklongContract = tokenCtr.at(pklongAddr);
  console.log('pklong',pklongContract);
}

NewpklongContract();

function NewdivieslongContract() {
  var contract = new EthContract(eth);
  var tokenCtr = contract(diviesAbi);
  divieslongContract = tokenCtr.at(divieslongAddr);
  console.log('divieslong:',divieslongContract);
}

NewdivieslongContract()

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

function toBigNumber(value) {
  return new BigNumber(value).times('1000000000000000000');
}

function fromBigNumber(value) {
  return new BigNumber(value).div('1000000000000000000').toString()
}

var nulladdr = '0x0000000000000000000000000000000000000000';
//==================divieslong

export function distribute({percent}) {
  return new Promise(function(resolve, reject){
    divieslongContract.distribute(percent,
      {from:CoinBase},
      function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        console.log('isactive',result[0]);
        resolve(result[0])
      })
  })
}

//===================pklong
export function isActive() {
  return new Promise(function(resolve, reject){
    pklongContract.activated_(
      function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        console.log('isactive',result[0]);
        resolve(result[0])
      })
  })
}

export function mykeys({coinbase}) {
  CoinBase = coinbase;
  return new Promise(function(resolve, reject){
    pklongContract.getPlayerInfoByAddress(coinbase,
      function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        console.log('mykeys',fromBigNumber(result[2]));
        resolve(fromBigNumber(result[2]));
      });
  })
}

export function withdraw({value}) {
  console.log("withdraw value,")
  return new Promise(function(resolve, reject){
    pklongContract.withdraw({from:CoinBase},
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

export function keybuyprice() {
  return new Promise(function(resolve, reject){
    pklongContract.getBuyPrice(
      function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        resolve(fromBigNumber(result[0]));
      });
  })
}

export function vaults({_pid}) {
  return new Promise(function(resolve, reject){
    console.log(pid);
    pklongContract.getPlayerVaults(_pid,function(error,result){
      if (error) {
        console.log(error)
        reject(error);
        return
      }
      console.log("vaults",result);
      var v = {};
      v.win =fromBigNumber(result[0]);
      v.gen =fromBigNumber(result[1]);
      v.aff =fromBigNumber(result[2]);
      resolve(v);
    });
  })
}

export function buylongkey({value}) {
  console.log("buy long value",value);
  return new Promise(function(resolve, reject){
    pklongContract.buyXname('0x636f776b65797300000000000000000000000000000000000000000000000000'
      ,2, {from:CoinBase,value:toBigNumber(value)},
      function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        console.log(result);
        resolve(result)
      })
  })
}

export function currentPlayer() {
  return new Promise(function(resolve, reject){
    console.log('=====',CoinBase);
    pklongContract.pIDxAddr_(CoinBase,function(error,result){
      if (error) {
        console.log(error)
        reject(error);
        return
      }

      resolve(new BigNumber(result[0]).toString());
      // pklongContract.plyr_(result[0],function(error2,result2){
      //   if (error2) {
      //     console.log(error2)
      //     reject(error2);
      //     return
      //   }
      //
      //   resolve(new BigNumber(result2.keys).div('1000000000000000000').toNumber())
      // })
    })
  })
}

// export function mydividens() {
//   return new Promise(function(resolve, reject){
//     pklongContract.buyPrice(
//       function(error,result){
//         if (error) {
//           console.log(error)
//           reject(error);
//           return
//         }
//         resolve(fromBigNumber(result[0]));
//       });
//   })
// }

// export function isIco() {
//   return new Promise(function(resolve, reject){
//     pklongContract.inICO(function(error,result){
//       if (error) {
//         console.log(error)
//         reject(error);
//         return
//       }
//
//       resolve(result[0]);
//     });
//   })
// }
//
// export function dividendsOf() {
//   return new Promise(function(resolve, reject){
//     pklongContract.dividendsOf(CoinBase,function(error,result){
//       if (error) {
//         console.log(error)
//         reject(error);
//         return
//       }
//
//       resolve(fromBigNumber(result[0]));
//     });
//   })
// }
