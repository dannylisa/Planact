import axios, { AxiosError } from 'axios';
import { UserProfile, UserProps } from '@/modules/auth/reducer';
import { ITokenHeader } from '@/modules/auth/hooks';
import { HOST } from './host';

const AUTH_BASE_URL = HOST('account/auth/');
const ACCOUNT_BASE_URL = HOST('account/');
export interface LoginProps {
  username: string;
  password: string;
}

export interface SignUpProps {
  username: string;
  password: string;
  password2: string;
}

export interface SetProfileProps {
  profile: UserProfile;
  tokenHeader: ITokenHeader;
}
export const profile_api = ({ profile, tokenHeader }: SetProfileProps) => {
  return axios.put<UserProps>(
    ACCOUNT_BASE_URL + 'profile',
    { ...profile },
    { headers: tokenHeader }
  );
};

export const login_api = ({ username, password }: LoginProps) => {
  return axios.post<UserProps>(AUTH_BASE_URL + 'login', {
    username,
    password,
  });
};

export const signup_api = ({ username, password }: LoginProps) => {
  return axios.post(AUTH_BASE_URL + 'register', {
    username,
    password,
  });
};

export const logout_api = (tokenHeader: ITokenHeader) => {
  return axios.post(
    AUTH_BASE_URL + 'logout/',
    {},
    {
      headers: tokenHeader,
    }
  );
};

export const validate_api = (tokenHeader: ITokenHeader) => {
  return axios
    .get(AUTH_BASE_URL + 'user', {
      headers: tokenHeader,
    })
    .then((res) => res.status )
    .catch((err) => {
      if(err.response)
        return err.response.status
      else return 999
    });
};

export const kakao_api = async () => {
  let redirect:any = null;
  await axios.get(ACCOUNT_BASE_URL+"oauth/login/kakao")
    .then((res) => redirect = res.data)
    .catch((err) => console.log(err))

  return redirect
}