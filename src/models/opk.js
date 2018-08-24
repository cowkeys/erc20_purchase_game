import * as opks from '../services/opk';
import * as longs from '../services/pklong';

export default {
  namespace: 'opk',
  state: {
    address:"0x",
    balance:0,
    opk:0,
    buyprice:0,
    sellprice:0,
    opkdividend:0,
    isico:true,
    isactive:false,
    keys:0,
    keybuyprice:0,
    vaults:{win:0,gen:0,aff:0},
    pid:0
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
       //dispatch({type:'reloadInfo'});
    },
  },

  effects: {
//========================opk
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

    // =================divieslong

    *distribute({ payload:{percent} }, { call, put }) {  // eslint-disable-line
      const result = yield call(longs.distribute,{percent});
      yield put({ type: 'save'});
    },
// ==========================long

    *buylongkey({ payload:{value} }, { call, put }) {  // eslint-disable-line
      const result = yield call(longs.buylongkey,{value});
      yield put({ type: 'save'});
    },

    *longwithdraw({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(longs.withdraw,{});
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

      //==============long

      const isactive = yield  call(longs.isActive,{});
      const keys = yield call(longs.mykeys,{coinbase});
      const keybuyprice = yield  call(longs.keybuyprice,{});
      const pid = yield  call(longs.currentPlayer,{});
      const vaults = yield  call(longs.vaults,{_pid:pid});

      //==============

      yield put(
        { type: 'save' ,
          payload:{
            address:coinbase,
            balance:balance,
            opk:+opk,
            buyprice:+buyprice,
            sellprice:+sellprice,
            isico:isico,
            opkdividend:+opkdividend,
            isactive:isactive,
            keys:keys,
            keybuyprice:keybuyprice,
            vaults:vaults,
            pid:+pid
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
