import * as examples from '../services/example';
import {BigNumber} from "bignumber.js/bignumber";

export default {

  namespace: 'example',

  state: {
    address:"0x",
    balance:0,
    allowance:0,
    gamekeys:0,
    dividend:0,
    seelebalance:0.0
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
       //dispatch({type:'reloadInfo'});
    },
  },

  effects: {
    *approve({ payload:{value} }, { call, put }) {  // eslint-disable-line
      const result = yield call(examples.allocateSeele,{value});
      yield put(
        { type: 'save'}
        );
    },

    *buykey({ payload:{value} }, { call, put }) {  // eslint-disable-line
      const result = yield call(examples.buyKeyFromSeele,{value});
      const keys = yield  call(examples.currentPlayer,{});
      yield put({ type: 'save',
        payload:{
          gamekeys:+keys
        }
      });
    },

    *buyseele({ payload:{value} }, { call, put }) {  // eslint-disable-line
      const result = yield call(examples.buyKeyFromSeele,{value});
      const keys = yield  call(examples.currentPlayer,{});
      yield put({ type: 'save',
        payload:{
          gamekeys:+keys
        }
      });
    },

    *reloadinfo({ payload }, { call, put }) {  // eslint-disable-line
      const coinbase = yield call(examples.getCoinbase,{});
      const balance = yield call(examples.getBalance,{coinbase});
      const allowance = yield call(examples.getLeftAuthSeele,{});
      const keys = yield  call(examples.currentPlayer,{});
      const seelebalance = yield  call(examples.seeleBalance,{});

      yield put(
        { type: 'save' ,
          payload:{
            address:coinbase,
            balance:balance,
            allowance:+allowance,
            gamekeys:+keys,
            seelebalance:+seelebalance
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
