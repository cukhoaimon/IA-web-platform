import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios"
import applyCaseMiddleware from "axios-case-converter"
import { tokenManager } from "@/shared/hooks/tokenManager.ts"

export const axiosClient = applyCaseMiddleware(
  axios.create({ baseURL: import.meta.env.VITE_API_ENDPOINT })
)

interface GetParams {
  path: string
  config?: AxiosRequestConfig
  customHeader?: RawAxiosRequestHeaders
}

export const getRequest = ({ path, config, customHeader }: GetParams) => {
  const headers = {
    Accept: "application/json",
    ...customHeader
  }

  const accessToken = tokenManager.getToken()
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }
  return axiosClient
    .get(`/${path}`, {
      headers,
      ...config
    })
    .then((data) => data.data)
}

interface PostParams extends GetParams {
  data?: Record<string, unknown>
}

export const postRequest = ({ path, config, customHeader, data }: PostParams) => {
  const headers = {
    Accept: "application/json",
    ...customHeader
  }

  const accessToken = tokenManager.getToken()
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  return axiosClient.post(`/${path}`, data, {
    headers,
    ...config
  })
}
