import axios from 'axios'

type profile = {
  address: string
  nickname: string
  tel: string
  email: string
  gender: 'M' | 'F' | string
}

//초기 상태
interface userAuthProps {
  loading: boolean
  error: any
  token: string
  username: string
  password: string
  status: boolean
  profile: profile
}

const userState: userAuthProps = {
  token: '',
  username: '',
  password: '',
  error: '',
  loading: false,
  status: false,
  profile: {
    address: '',
    nickname: '',
    tel: '',
    email: '',
    gender: 'init',
  },
}

//함수 인터페이스
interface loginProps {
  username: string
  password: string
}
interface registerProps {
  username: string
  password: string
  navigation
}

interface setProfileProps {
  address: string
  nickname: string
  tel: string
  email: string
  gender: 'M' | 'F' | string
  token: string
}

interface logoutProps {
  token: string
}

// 액션 타입

// 로그인
const LOGIN = 'user/LOGIN'
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
const LOGIN_ERROR = 'user/LOGIN_ERROR'

const REGISTER = 'user/REGISTER'
const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS'
const REGISTER_ERROR = 'user/REGISTER_ERROR'

const SET_PROFILE = 'user/SET_PROFILE'
const SET_PROFILE_SUCCESS = 'user/SET_PROFILE_SUCCESS'
const SET_PROFILE_ERROR = 'user/SET_PROFILE_ERROR'

const LOGOUT = 'user/LOGOUT'
const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS'
const LOGOUT_ERROR = 'user/LOGOUT_ERROR'

//액션 생성함수
export const login =
  ({ username, password }: loginProps) =>
  async (dispatch) => {
    dispatch({ type: LOGIN })
    try {
      const {
        data: { profile, token },
      } = await axios.post('http://3.35.169.23:8000/account/auth/login/', {
        username,
        password,
      })
      dispatch({ type: LOGIN_SUCCESS, token, profile })
    } catch (e) {
      dispatch({ type: LOGIN_ERROR, error: e })
    }
  }

export const register =
  ({ username, password, navigation }: registerProps) =>
  async (dispatch) => {
    dispatch({ type: REGISTER })
    try {
      const {
        data: { profile, token },
      } = await axios.post('http://3.35.169.23:8000/account/auth/register/', {
        username,
        password,
      })
      dispatch({ type: REGISTER_SUCCESS, token, profile })
      navigation.push('SetProfile', { text: '가입하기' })
    } catch (e) {
      dispatch({ type: REGISTER_ERROR, error: e })
    }
  }
//prettier-ignore
export const setProfile = ({address, nickname,tel, email,gender,token}:setProfileProps) => async(dispatch) => {
  dispatch({type:SET_PROFILE})
  try{
    const {data} = await axios.put('http://3.35.169.23:8000/account/profile/',{address,nickname,tel,email,gender},{headers:{
      //prettier-ignore
      Authorization: `Token ${token}`
    }})
    dispatch({type: SET_PROFILE_SUCCESS,data})
  } catch(e){
    dispatch({type:SET_PROFILE_ERROR, error: e})
  }
}

export const logout =
  ({ token }: logoutProps) =>
  async (dispatch) => {
    dispatch({ type: LOGOUT })
    try {
      dispatch({ type: LOGOUT_SUCCESS })
      await axios.post(
        'http://3.35.169.23:8000/account/auth/logout/',
        {},
        {
          headers: {
            //prettier-ignore
            Authorization: `Token ${token}`,
          },
        }
      )
    } catch (e) {
      dispatch({ type: LOGOUT_ERROR, error: e })
    }
  }

function userAuth(state: userAuthProps = userState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        profile: action.profile,
        status: true,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case REGISTER:
      return {
        ...state,
        loading: true,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        token: action.token,
      }
    case SET_PROFILE:
      return {
        ...state,
        loading: true,
      }
    case SET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.data,
        status: true,
      }
    case SET_PROFILE_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case LOGOUT:
      return {
        ...state,
        loading: true,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: '',
        status: false,
      }
    case LOGOUT_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}
export default userAuth
