interface UserProfile {
    nickname: string
    gender: 'M' | 'F' 
    address: string
    tel: string
    email: string
}

export interface UserProps {
    token: string
    username: string
    profile: UserProfile
}

export const LOGIN = "LOGIN" as const;
export const LOGOUT = "LOGOUT" as const;
export const SET_PROFILE = "SET_PROFILE" as const;

type authActionType = "LOGIN" | "LOGOUT" | "SET_PROFILE"
export interface AuthActionProps {
    type: authActionType
    userData?: UserProps
    profile?: UserProfile
}

function authState(state: UserProps|null = null, {type, userData, profile}:AuthActionProps) {
    switch (type) {
        case LOGIN:
            if(userData) return userData;
            else {
                console.log("Need User Data")
                return state
            }
        case LOGOUT:
            return null
        case SET_PROFILE:
            return (state && profile) ? {
                ...state,
                profile
            } : state
        default:
            return state
    }
  }
  export default authState;