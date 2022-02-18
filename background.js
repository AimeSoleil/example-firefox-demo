// Refresh Amazon pages, make requests to amazon pages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // for background call server api
  console.log('chrome.onMessage')
  const xhrResponse = getSampleData()
  if (requestOfApi instanceof Promise) {
    // NOTES: This is a successful case ======================
    // xhrResponse
    //   .then(response => {
    //     const res = _.omit(response, ['request', 'config']) // Omit result & config(Actually, it's related to config.cancelToken.Promise) in xhrResponse; 
    //     sendResponse(res)
    //   })
    //   .catch(error => {
    //     const err = { errorMsg: 'this is a error message'}
    //     sendResponse(err)
    //   })
    xhrResponse
      .then(response => {
        sendResponse(response) // It will return undefined response to content_script.js in firefox but good one in chrome.
      })
      .catch(error => {
        sendResponse(error) // It will return undefined error to content_script.js in firefox but empty object {} in chrome.
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
