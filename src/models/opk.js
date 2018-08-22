import * as opks from '../services/opk';

export default {
  namespace: 'opk',
  state: {
    address:"0x",
    balance:0,
    opk:0,
    buyprice:0,
    sellprice:0,
    opkdividend:0,
    isico:true
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
       //dispatch({type:'reloadInfo'});
    },
  },

  effects: {

    *buyopk({ payload:{value} }, { call, put }) {  // eslint-disable-line
      const result = yield call(opks.buyOpk,{value});
      yield put({ type: 'save'});
    },

    *sellopk({ payload:{value} }, { call, put }) {  // eslint-disable-line
      const result = yield call(opks.sellOpk,{value});
      yield put({ type: 'save'});
    },

    *withdraw({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(opks.withdraw,{});
      yield put({ type: 'save'});
    },

    *reloadinfo({ payload }, { call, put }) {  // eslint-disable-line
      const coinbase = yield call(opks.getCoinbase,{});
      const balance = yield call(opks.getBalance,{coinbase});
      const opk = yield call(opks.opktokens,{});
      const buyprice = yield call(opks.buyprice,{});
      const sellprice = yield  call(opks.sellprice,{});
      const isico = yield  call(opks.isIco,{});
      const opkdividend = yield  call(opks.dividendsOf,{});

      yield put(
        { type: 'save' ,
          payload:{
            address:coinbase,
            balance:balance,
            opk:+opk,
            buyprice:+buyprice,
            sellprice:+sellprice,
            isico:isico,
            opkdividend:+opkdividend
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
