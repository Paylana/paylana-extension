export const LocalStorage = (function () {
  async function _setToken(accessToken: string) {
    if (accessToken) {
      // localStorage.setItem('accessToken', accessToken)
      await chrome.storage.local.set({ accessToken: accessToken })
    }
  }

  async function _getAccessToken() {
    // return localStorage.getItem('accessToken')
    const result = await chrome.storage.local.get(['accessToken'])
    return result.accessToken
  }

  async function _setRefreshToken(refreshToken: string) {
    if (refreshToken) {
      await chrome.storage.local.set({ refreshToken: refreshToken })
      // localStorage.setItem('refreshToken', refreshToken)
    }
  }

  async function _getRefreshToken() {
    // return localStorage.getItem('refreshToken')
    const refreshToken = await chrome.storage.local.get(['refreshToken'])
    return refreshToken?.refreshToken
  }



  function _clearToken() {
    chrome.storage.local.remove([
      'accessToken',
      'refreshToken',
      'currentAccount',
      'user_id',
      'chainId',
    ])
  }

  async function _getKey(accountId: string, chainId: string | number) {
    const result = await chrome.storage.local.get(`${accountId}-${chainId}-key`)
    return result[`${accountId}-${chainId}-key`]
  }
  async function _setSolanaAddress(solanaAddress: string) {
    await chrome.storage.local.set({ solanaAddress: solanaAddress })
  }
  async function _getSolanaAddress() {
    const result = await chrome.storage.local.get(['solanaAddress'])
    return result.solanaAddress
  }

  async function _setPoint(point: number) {
    await chrome.storage.local.set({ point: point })
  }

  async function _getPoint() {
    const result = await chrome.storage.local.get(['point'])
    return result.point
  }

  return {
    setPoint: _setPoint,
    getPoint: _getPoint,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    setRefreshToken: _setRefreshToken,
    clearToken: _clearToken,
    setSolanaAddress: _setSolanaAddress,
    getSolanaAddress: _getSolanaAddress,
  }
})()
