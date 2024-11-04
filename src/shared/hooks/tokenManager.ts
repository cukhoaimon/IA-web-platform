import { ApiPath } from "@/shared/const"
import { postRequest } from "@/shared/utils/axios.utils.ts"
import { parseJwt } from "@/shared/utils/jwt.utils.ts"

const REFRESH_TOKEN_STORAGE = "REFRESH_TOKEN_STORAGE"

interface TokenManager {
  getToken: () => string
  setNewToken: (newAccessToken: string, newRefreshToken: string) => void
  eraseToken: VoidFunction
  checkAuth: () => Promise<void>
  getNewAccessToken: () => Promise<void>
}

const tokenManagerBase = () => {
  let refreshToken: string = localStorage.getItem(REFRESH_TOKEN_STORAGE) ?? ""
  let accessToken: string = ""

  const setNewToken = (newAccessToken: string, newRefreshToken: string) => {
    accessToken = newAccessToken
    refreshToken = newRefreshToken
    localStorage.setItem(REFRESH_TOKEN_STORAGE, newRefreshToken)
  }
  const eraseToken = () => {
    localStorage.removeItem(REFRESH_TOKEN_STORAGE)
    accessToken = ""
  }
  const getNewAccessToken = async () => {
    if (!refreshToken) {
      return Promise.reject()
    }

    try {
      const response = await postRequest({
        path: ApiPath.RefreshToken,
        data: { refreshToken: refreshToken, grantType: "refresh_token" }
      })

      if (!response.data.refreshToken) {
        return Promise.reject()
      }

      localStorage.setItem(REFRESH_TOKEN_STORAGE, refreshToken)
      accessToken = response.data.accessToken

      return Promise.resolve()
    } catch (error: unknown) {
      return Promise.reject()
    }
  }

  const checkAuth = async () => {
    if (!accessToken) {
      if (!refreshToken) {
        return Promise.reject()
      }

      return getNewAccessToken()
    }

    const decodedJwt = parseJwt(accessToken)

    if (!decodedJwt || decodedJwt.exp * 1000 < Date.now()) {
      eraseToken()
      return Promise.reject()
    }

    return Promise.resolve()
  }

  return {
    getToken: () => accessToken,
    setNewToken,
    eraseToken,
    getNewAccessToken,
    checkAuth
  }
}

export const tokenManager: TokenManager = tokenManagerBase()
