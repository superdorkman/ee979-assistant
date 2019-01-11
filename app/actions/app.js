export const toggleDrawer = () => ({
  type: 'TOGGLE_DRAWER'
});

export const toggleOrderDetail = (info) => ({
  type: 'TOGGLE_ORDER_DETAIL',
  info
});

export const openSnack = (text) => ({
  type: 'OPEN_SNACK',
  text
});

export const openDialog = (text) => ({
  type: 'TOGGLE_DIALOG',
  text,
});

export const openToast = (text) => ({
  type: 'OPEN_TOAST',
  text,
});

export const setTitle = (title) => {
  document.title = title;
  return {
    type: 'SET_TITLE',
    title
  };
};

export const setNotices = (data) => ({
  type: 'SET_NOTICES',
  data,
});

export const login = (session) => ({
  type: 'LOGIN',
  session
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const updateToken = (id) => ({
  type: 'UPDATE_TOKEN',
  id
});

export const updateMyInfo = (info) => ({
  type: 'UPDATE_MYINFO',
  info
})

export const setTransition = (transition) => ({
  type: 'SET_TRANSITION',
  transition
});

export const setFooter = (sig) => ({
  type: 'SET_FOOTER',
  sig
});

export const setMsg = (msg) => ({
  type: 'SET_MSG',
  msg
});

export const toggleTotop = (status) => ({
  type: 'TOGGLE_TOTOP',
  status
});