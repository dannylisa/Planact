import axios from 'axios'

//초기 상태
interface userAuthProps {
  loading: boolean
  error: any
  token: string
  username: string
  password: string

  address?: string
  nickname?: string
  tel?: string
  email?: string
  gender?: 'M' | 'F'
}

const userState: userAuthProps = {
  token: '',
  username: '',
  password: '',
  error: '',
  loading: false,
}

//함수 인터페이스
interface loginOrRegisterProps {
  username: string
  password: string
}

interface setProfileProps {
  address: string
  nickname: string
  tel: string
  email: string
  gender: 'M' | 'F'
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
const SET_PROFILE = 'user/SET_PROFILE'
const LOGOUT = 'user/LOGOUT'

//액션 생성함수
export const login =
  ({ username, password }: loginOrRegisterProps) =>
  async (dispatch) => {
    dispatch({ type: LOGIN })
    try {
      const token = await axios.post(
        'http://3.35.169.23:8000/account/auth/login/',
        {
          username,
          password,
        }
      )
      dispatch({ type: LOGIN_SUCCESS, token })
    } catch (e) {
      dispatch({ type: LOGIN_ERROR, error: e })
    }
  }

export const register = ({ username, password }: loginOrRegisterProps) => ({
  type: REGISTER,
  username,
  password,
})
//prettier-ignore
export const setProfile = ({address, nickname,tel, email,gender}:setProfileProps) => ({
  type: SET_PROFILE,
  body:{
    address,
    nickname,
    tel,
    email,
    gender
  }
})

export const logout = ({ token }: logoutProps) => ({
  type: LOGOUT,
  token,
})

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
      }
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case REGISTER:
      return state
    case SET_PROFILE:
      return state
    case LOGOUT:
      return state
    default:
      return state
  }
}
export default userAuth
