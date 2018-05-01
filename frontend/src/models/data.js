import { getDepartment } from '../services/api';

export default {
  namespace: 'data',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *getDepartment({ call, put }) {
      const data = yield call(getDepartment);
      yield put({
        type: 'queryDepartment',
        payload: Array.isArray(response) ? response : [],
      });

    },

  },

  reducers: {
    queryDepartment(state, { payload }) {
      return {
        ...state,
        departments: payload,
      };
    },
  },

};
