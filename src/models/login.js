import {
  routerRedux
} from 'dva/router';
import {
  stringify
} from 'qs';
import {
  fakeAccountLogin,
  getFakeCaptcha,
  loginAdmin
} from '@/services/api';
import {
  setAuthority
} from '@/utils/authority';
import {
  getPageQuery
} from '@/utils/utils';
import {
  reloadAuthorized
} from '@/utils/Authorized';
import message from '@/utils/message';
import {
  Icon,
  notification
} from 'antd';
import {
  Local
} from '@/utils/storage';
// 提醒框,弹出登陆成功信息框
const openNotificationWithIcon = (type, user, msg, des) => {
  return notification[type]({
    message: msg,
    description: `${des}：${user}!`,
    icon: ( <
      Icon type = "smile"
      style = {
        {
          fontSize: '22px',
          color: '#108ee9'
        }
      }
      />
    ),
    duration: 5,
  });
};

const initUserAuthInfo = () => {
  let userAuth = {
    "uid": 1,
    "permissions": ["auth", "auth/testPage", "auth/authPage", "auth/authPage/edit", "auth/authPage/visit"],
    "role": "系统管理员",
    "roleType": 1,
    "name": "系统管理员"
  }
  userAuth.avatar = 'http://p61te2jup.bkt.clouddn.com/WechatIMG8.jpeg';
  userAuth.notifyCount = 0;
  userAuth.address = '福建省';
  userAuth.country = 'China';
  userAuth.group = 'jamesZhang';
  userAuth.title = '交互专家';
  userAuth.signature = '海纳百川，有容乃大';
  userAuth.tags = [];
  userAuth.geographic = {
    province: {
      label: '福建省',
      key: '360000',
    },
    city: {
      label: '厦门市',
      key: '361000',
    },
  };
  return userAuth; 
}

// 登陆成功的处理函数
const handleLoginSuccess = (payload) => {
  // 初始化用户权限信息
  let userAuthInfo = initUserAuthInfo();
  userAuthInfo.username = payload.username;
  Local.set('user', userAuthInfo);
  openNotificationWithIcon('info', payload.username, '登陆成功', '欢迎回来');
}
export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    * loginAdmin({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(loginAdmin, payload);
      if (!response) {
        return
      }

      if (response.code === 0) {
        response.currentAuthority = response.data.name || 'admin';
        response.status = 'ok';
        response.type = 'account';
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
      }

      // Login successfully
      if (response.code === 0) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        handleLoginSuccess(payload);
        let {
          redirect
        } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        console.log('redirect :', redirect);
        yield put(routerRedux.replace(redirect || '/dashboard/workplace'));
      } else {
        message.error({
          content: response.message
        });
      }
    },

    * login({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log('response :', response);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();

        let {
          redirect
        } = params;
        console.log('redirect :', redirect, payload);

        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        console.log('redirect :', redirect);
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    * getCaptcha({
      payload
    }, {
      call
    }) {
      yield call(getFakeCaptcha, payload);
    },

    * logout(_, {
      put
    }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, {
      payload
    }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
