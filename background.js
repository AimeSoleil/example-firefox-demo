// Refresh Amazon pages, make requests to amazon pages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // for background call server api
  console.log('chrome.onMessage')
  const requestOfApi = getSampleData()
  if (requestOfApi instanceof Promise) {
    // NOTES: This is a successful case ======================
    // requestOfApi
    //   .then(result => {
    //     const res = _.omit(result, ['request', 'config'])
    //     sendResponse(res)
    //   })
    //   .catch(error => {
    //     const err = { errorMsg: 'this is a error message'}
    //     sendResponse(err)
    //   })
    requestOfApi
      .then(result => {
        sendResponse(result) // do not omit request/config
      })
      .catch(error => {
        const err = { errorMsg: 'this is a error message'}
        sendResponse(err)
      })
  }
  // async
  return true
})

const getSampleData = params => {
  const url = 'https://freegeoip.app/json/'
  return makeGet(url, { params: params })
}

const makeGet = async (url, params) => {
  return await axios.get(url, params)
}