const initialSetting = {
  isLoggedIn: false,
  session: {},
  showDialog: false,
  showDrawer: false,
  snack: '',
  title: '易易游戏服务网',
  toast: '',
  showOd: false,
  orderSN: '',
  isWechat: false,
  message: '',
  myAllInfo: {
    fund: {},
    orderNum: {},
    sRole: {}
  },
  showToTop: false,
  chatSN: '',
  notices: null,
}

const session = sessionStorage.session && JSON.parse(sessionStorage.session);
if (session) {
  initialSetting.isLoggedIn = true;
  initialSetting.session = session;
}

const app = (state = initialSetting, action) => {
  // console.log(action)
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        session: action.session
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false
      }
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        showDrawer: !state.showDrawer
      }
    case 'TOGGLE_ORDER_DETAIL':
      return {
        ...state,
        ...action.info
      }
    case 'OPEN_SNACK':
      return {
        ...state,
        snack: action.text
      }
    case 'OPEN_TOAST':
      return {
        ...state,
        toast: action.text
      }
    case 'SET_CHATSN':
      return {
        ...state,
        chatSN: action.sn
      }
    case 'TOGGLE_DIALOG':
      return {
        ...state,
        showDialog: !state.showDialog,
        dialog: action.text
      }
    case 'SET_TITLE':
      return {
        ...state,
        title: action.title
      }
    case 'SET_MSG':
      return {
        ...state,
        message: action.msg
      }
    case 'SET_NOTICES':
      return {
        ...state,
        notices: action.data,
      }
    case 'SET_PERSONAL_INFO':
      return {
        ...state,
        myAllInfo: action.info
      }
    case 'TOGGLE_TOTOP':
      return {
        ...state,
        showToTop: action.status
      }
    case 'UPDATE_TOKEN':
      return {
        ...state,
        session: {
          ...state.session,
          id: action.id
        }
      }
    case 'UPDATE_MYINFO':
      return {
        ...state,
        myAllInfo: {
          ...state.myAllInfo,
          ...action.info,
        }
      }
    default:
      return state
  }
}

export default app;