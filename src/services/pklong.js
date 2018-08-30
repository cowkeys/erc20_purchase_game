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
//var pklongAddr = '0x12f494f55eEDd9f3fF0cc5DBdbe4d6e2382d25F0';//dev
//var divieslongAddr = '0x3654953d60f04b0091f0508A2d4baE3ae64e064B';//dev

var pklongContract;
var divieslongContract;

if (typeof web3 === 'undefined') {
  alert("failed to un");
}

//setTimeout(events(pklongAbi,pklongAddr),6000);
// function events(simpleStore) {
//   console.log("=====================$$$$$$$$");
//   // const Web3 = require("web3");
//   // console.log('in events',Web3);
//   const filter = simpleStore.onAffiliatePayout()
//     .new({ toBlock: 'latest' }, (error, result) => {
//       console.log('ininini',error,result);
//       // result null <BigNumber ...> filterId
//     }).then((result) => {
//     console.log(result)
//   })
//     .catch((error) => {
//       throw new Error(error)
//     });
//
//   console.log("filter:========",filter);
//   filter.watch((err, result) => {
//     console.log('wath',err,result)
//     // result null FilterResult {...}
//   });
//
//
//   // var web3ws = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws",[]));
//   // const instance = new web3ws.eth.Contract(_abi, _addr);
//   // console.log('con',instance);
//   //
//   // // instance.events.onAffiliatePayout({
//   // //   filter: {}, // Using an array means OR: e.g. 20 or 23
//   // //   fromBlock: 0
//   // // }, function(error, event){ console.log(event); })
//   // //   .on('data', function(event){
//   // //     console.log("===================");
//   // //     console.log(event); // same results as the optional callback above
//   // //   })
//   // //   .on('changed', function(event){
//   // //     // remove event from local database
//   // //   })
//   // //   .on('error', console.error);
//   //
//   // // console.log('instance',instance);
//   // // instance.getPastEvents(
//   // //   "onAffiliatePayout",
//   // //   { fromBlock: 0, toBlock: "latest" },
//   // //   (errors, events) => {
//   // //     console.log("#######################");
//   // //     if (!errors) {
//   // //       console.log('====events',events);
//   // //       // process events
//   // //     }
//   // //   }
//   // // );
//   //
//   //
//   // var event = instance.events.onAffiliatePayout({ fromBlock: 0, toBlock: "latest" },function (err,result) {
//   //   console.log("Event are as following:-------");
//   //
//   //   for(let key in result){
//   //     console.log(key + " : " + result[key]);
//   //     console.log(result["returnValues"]);
//   //   }
//   //
//   //   console.log("Event ending-------");
//   // });
// }

function NewpklongContract() {
  var contract = new EthContract(eth);
  var tokenCtr = contract(pklongAbi);
  pklongContract = tokenCtr.at(pklongAddr);
  console.log('long:',pklongContract);
  //events(pklongContract);

  // console.log("simplestorage",pklongContract);
  // var filter = pklongContract.onAffiliateDistribute()
  //   .new({ toBlock: 'latest' }, (error, result) => {
  //     // result null <BigNumber ...> filterId
  //   });
  // console.log("filter==",filter);
  // filter.watch((err, result) => {
  //   // result null FilterResult {...}
  // });
  // filter.uninstall()
  //   .then(function (result) {
  //     console.log(result);
  //   });
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

export function isRoundActive() {
  return new Promise(function(resolve, reject){
    pklongContract.isRoundActive(1,
      function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        console.log('isround active',result[0]);
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


export function getTimeLeft() {
  return new Promise(function(resolve, reject){
    pklongContract.getTimeLeft(
      function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        resolve(new BigNumber(result[0]).toString());
      });
  })
}

export function round() {
  return new Promise(function(resolve, reject){
    pklongContract.round_(1,
      function(error,result){
        if (error) {
          console.log(error)
          reject(error);
          return
        }
        resolve(new BigNumber(result[0]).toString());
      });
  })
}
//uint256 public airDropPot_;
//uint256 public airDropTracker_ = 0;
export function air(...param) {
  return new Promise(function(resolve, reject){
    console.log("param==",...param);
    pklongContract['round_'](...param,
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
    pklongContract.getPlayerVaults(135,function(error,result){
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
  return new Promise(function(resolve, reject){
    pklongContract.buyXid(0
      ,3, {from:CoinBase,value:toBigNumber(value)},
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

export function queryLaff({address}) {
  return new Promise(function(resolve, reject){
    pklongContract.pIDxAddr_(address,function(error,result){
      if (error) {
        console.log(error)
        reject(error);
        return
      }

      var id = new BigNumber(result[0]).toString();
      pklongContract.plyr_(id,function(error2,result2){
        if (error2) {
          console.log(error2)
          reject(error2);
          return
        }
        console.log('laff',new BigNumber(result2.laff).div('1000000000000000000').toNumber());
        resolve(new BigNumber(result2.laff).toNumber())
      })
    })
  })
}

export function CommonFunc() {
  return new Promise(function(resolve, reject){
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
