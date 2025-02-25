import md5 from "blueimp-md5";

export const state = () => ({
  bankId: null,
  branchId: null,
  user: null,
  name: null,
  password: null,
  isLogin: false,
});

export const getters = {
  bankId: state => state.bankId,
  branchId: state => state.branchId,
  user: state => state.user,
  name: state => state.name,
  isLogin: state => state.isLogin,
  password: state => state.password,
  initialAmount: () => 100000,
  account: (state, getters) => ({
    ...state,
    kind: "普通",
    num: Math.floor(Math.random() * 1000000),
    password: md5(state.password),
    total: getters.initialAmount,
  }),
  statement: (state, getters) => ({
    amount: getters.initialAmount,
    total: getters.initialAmount,
    kind: "入金",
    memo: "口座開設",
  }),
};

export const mutations = {
  bankId: (state, bankId) => (state.bankId = bankId),
  branchId: (state, branchId) => (state.branchId = branchId),
  name: (state, name) => (state.name = name),
  user: (state, user) => (state.user = user),
  isLogin: (state, isLogin) => (state.isLogin = isLogin),
  password: (state, password) => (state.password = password),
};

export const actions = {
  async signin({ getters, dispatch }) {
    const { id } = await dispatch("accounts/add", getters.account, {
      root: true,
    });
    dispatch(
      "statements/add",
      { ...getters.statement, accountId: id },
      { root: true },
    );
  },
};
