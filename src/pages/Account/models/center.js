import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {GetTempListApi} from '@/services/api';
import router from 'umi/router';

export default {
  namespace: 'center',
  state: {
    data: {
    }
  },

  effects: {
    *GetTempList({ payload, callback }, { call }) {
      const response = yield call(GetTempListApi, payload);
      console.error(response)
      console.error('得到的数据')
      if (String(response.errcode) === '0') {
        if (callback && typeof callback === 'function') {
          callback(response)
        }
      } else {

        if(response.errcode=== 6006){
          router.push('/exception/403');
        }else {
          message.error(response.errmsg);
        }
      }
    },

  },

};
