import {
  query as queryAdmin,
  queryCurrent
} from '@/services/user';
import {
  Local
} from '../utils/storage';
export default {
  // namespace model 的命名空间，同时也是他在全局 state 上的属性，只能用字符串；是 model state 在全局 state 所用的 key
  namespace: 'user',

  // state 初始值
  state: {
    list: [],
    currentUser: {},
  },

  // action 是改变 State 的唯一途径，但是它只描述了一个行为，而 dipatch 可以看作是触发这个行为的方式，而 Reducer 则是描述如何改变数据的。
  // effects 以 key/value 格式定义 effect。用于处理异步操作和业务逻辑，不直接修改 state。由 action 触发，可以触发 action，可以和服务器交互，可以获取全局 state 的数据等等。
  effects: {
    * fetch(_, {
      call,
      put
    }) {
      const response = yield call(queryAdmin);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * fetchCurrent(_, {
      call,
      put
    }) {
      // call 表示调用异步函数
      const response = yield call(queryCurrent);
      // put 表示 dispatch action
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    * saveCurrentUser({
      payload: {}
    }, {
      call,
      put
    }) {
      yield put({
        type: 'saveCurrentUser',
        payload: payload.data
      });
    },
    * delUser({
      payload
    }, {
      call,
      put
    }) {
      const {
        resolve,
        params
      } = payload;
      const response = yield call(delUser, params);
      !!resolve && resolve(response);
    },
  },

  // reducers 以 key/value 格式定义 reducer。用于处理同步操作，唯一可以修改 state 的地方。由 action 触发。
  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
    //   Local.set('user', action.payload);
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
    saveUserList(state, {
      payload
    }) {
      return {
        ...state,
        userList: payload,
      };
    },
    saveUserListTotal(state, {
      payload
    }) {
      return {
        ...state,
        total: payload,
      };
    },
  },
};
