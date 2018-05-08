import {queryBasicProfile, queryAdvancedProfile} from '../services/api';

export default {
  namespace: 'profile',

  state: {
    basicGoods: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
    project: {},
    supporters: [],
  },

  effects: {
    *fetchBasic(_, {call, put}) {
      const response = yield call(queryBasicProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchAdvanced({payload}, {call, put}) {
      console.log(payload);
      const response = yield call(queryAdvancedProfile, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
