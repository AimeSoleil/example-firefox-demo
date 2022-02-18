// console.log('hello world')

(async () => {
  const sendChromeMessage = async message => {
    return new Promise(resolve => {
      chrome.runtime.sendMessage(message, response => resolve(response))
    })
  }
  
  const response = await sendChromeMessage('makeAxiosRequest')
  console.log('sendChromeMessage(message)=============', response)
})()