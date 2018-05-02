import { getParamDtl } from '../services/param';

export default {
  namespace: 'param',

  state: {
    project: [],
    product: [],
    department: [],
  },

  effects: {
    *fectchParam(_,{ call, put }) {
      const response = yield call(getParamDtl);
      yield put({
        type: 'queryDepartment',
        payload: response,
      });

    },

  },

  reducers: {
    queryDepartment(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

};
