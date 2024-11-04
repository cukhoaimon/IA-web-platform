export const parseJwt = (token: string) => {
  try {
    if (!token) return null
    return JSON.parse(atob(token.split(".")[1]))
  } catch (e) {
    return null
  }
}
