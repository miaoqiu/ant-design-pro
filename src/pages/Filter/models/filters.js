import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { GetSearchListApi, getBaseDataApi, resultDataListApi } from '@/services/api';
import router from 'umi/router';

export default {
  namespace: 'filters',
  state: {
    data: {},
  },

  effects: {
    *GetSearchList({ payload, callback }, { call }) {
      const response = yield call(GetSearchListApi, payload);
      if (String(response.code) === '00000') {
        if (callback && typeof callback === 'function') {
          callback(response);
        }
      } else {
        if (response.errcode === 6006) {
          router.push('/exception/403');
        } else {
          message.error(response.errmsg);
        }
      }
    },

    *getBaseData({ payload, callback }, { call }) {
      const response = yield call(getBaseDataApi, payload);
      if (String(response.code) === '00000') {
        if (callback && typeof callback === 'function') {
          callback(response);
        }
      } else {
        if (response.errcode === 6006) {
          router.push('/exception/403');
        } else {
          message.error(response.errmsg);
        }
      }
    },

    *resultDataList({ payload, callback }, { call }) {
      const response = yield call(resultDataListApi, payload);
      if (String(response.code) === '00000') {
        if (callback && typeof callback === 'function') {
          callback(response);
        }
      } else {
        if (response.errcode === 6006) {
          router.push('/exception/403');
        } else {
          message.error(response.errmsg);
        }
      }
    },
  },
};
