import * as com from '../services/common';

export default {
  namespace: 'common',
  state: {
    address:"0x",
    balance:0,
    contract:{},
    abi:[],
    result:{},
    network:"api"
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      //dispatch({type:'reloadInfo'});
    },
  },

  effects: {

    //================common function============
    * callingfunc({payload: {ctr,func,value,pay}}, {call, put}) {  // eslint-disable-line
      console.log("ctr:",ctr,'func',func,"value:",...value,"| pay:",pay);
      const result = yield call(com.calling, ctr,func,pay,...value);
      if (result.error){
        yield put({type: 'save'});
      }else{
        yield put({
          type: 'save',
          payload:{
            result:result
          }
        });
      }

    },

    *changenetwork({ payload:{network} }, { call, put }) {  // eslint-disable-line
      const item = yield call(com.ChangeNetwork,{network});
      console.log("item",item);
      yield put({ type: 'save',
      payload:{
        network:network
      }
      });
    },

//================contract
    *getCtract({ payload:{address} }, { call, put }) {  // eslint-disable-line
      const item = yield call(com.NewContract,{address});

      if (item.error){
        yield put({type: 'save'});
      }else {
        yield put({
          type: 'save',
          payload: {
            contract: item.contract,
            abi: item.abi
          }
        });
      }
    },

    *reloadinfo({ payload }, { call, put }) {  // eslint-disable-line
      const coinbase = yield call(com.getCoinbase,{});
      const balance = yield call(com.getBalance,{coinbase});

      yield put(
        { type: 'save' ,
          payload:{
            address:coinbase,
            balance:balance
          }
        });
    },

    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
