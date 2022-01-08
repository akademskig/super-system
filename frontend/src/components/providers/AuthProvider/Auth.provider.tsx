import React, {
  createContext,
  ReactElement,
  useState,
  SetStateAction,
  useMemo,
  Dispatch,
  useEffect,
  useCallback,
} from 'react'

interface IAuthProvider {
  children: ReactElement | ReactElement[]
}

interface IAuthProviderContextValue {
  user: TUser | null
  accessToken: string | undefined
  setAuthData: Dispatch<SetStateAction<any | null>>
  isAuth: boolean
  logout: () => void
}

export type TUser = {
  id: string
  username: string
  email: string
  role: string
}
const TOKEN_KEY = 'accessToken'
const USER_KEY = 'user'

export const cacheToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || ''
}
export const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY)
}

export const cacheUser = (user: TUser) => {
  return localStorage.setItem(USER_KEY, JSON.stringify(user))
}
export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
}
export const hasUser = () => {
  return !!getUser()
}

export const hasToken = () => {
  return !!getToken()
}

const initialValue = {
  user: null,
  accessToken: '',
  setAuthData: (v: SetStateAction<any | null>) => (value: any | null) => value,
  isAuth: false,
}

export const AuthCtx = createContext<IAuthProviderContextValue>(
  initialValue as unknown as IAuthProviderContextValue
)

export default function AuthProvider({ children }: IAuthProvider): JSX.Element {
  const [user, setUser] = useState<TUser | null>(null)
  const [isAuth, setIsAuth] = useState(hasToken())

  const setAuthData = useCallback((authData) => {
    const { user, accessToken } = authData
    user && cacheUser(user) && setUser(user)
    accessToken && cacheToken(accessToken)
    user && accessToken && setIsAuth(true)
  }, [])

  const accessToken = useMemo(() => {
    return getToken()
  }, [])

  const logout = useCallback(() => {
    removeToken()
    setIsAuth(false)
  }, [])

  useEffect(() => {
    if (hasUser()) {
      setUser(getUser())
    }
  }, [])

  useEffect(() => {
    if (hasToken()) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [])

  const ctxValue = useMemo(
    () => ({
      user,
      setAuthData,
      logout,
      accessToken,
      isAuth,
    }),
    [user, setAuthData, accessToken, isAuth, logout]
  )

  return <AuthCtx.Provider value={ctxValue}>{children}</AuthCtx.Provider>
}
