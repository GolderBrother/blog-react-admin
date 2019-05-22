import { query as queryAdmin, queryCurrent } from '@/services/user';

export default {
	namespace: 'user1',

	state: {
		list: [],
		currentUser: {},
	},

	effects: {
		*fetch(_, { call, put }) {
			const response = yield call(queryAdmin);
			yield put({
				type: 'save',
				payload: response,
			});
		},
		*fetchCurrent(_, { call, put }) {
			const response = yield call(queryCurrent);
			yield put({
				type: 'saveCurrentUser',
				payload: response,
			});
		},
		*saveCurrentUser({ payload }, { call, put }){
			yield put({
				type: 'saveCurrentUser',
				payload: payload
			});
		},
		*delUser({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(delUser, params);
			!!resolve && resolve(response);
		},
	},

	reducers: {
		save(state, action) {
			return {
				...state,
				list: action.payload,
			};
		},
		saveCurrentUser(state, action) {
			console.log(state, action);
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
		saveUserList(state, { payload }) {
			return {
				...state,
				userList: payload,
			};
		},
		saveUserListTotal(state, { payload }) {
			return {
				...state,
				total: payload,
			};
		},
	},
};
