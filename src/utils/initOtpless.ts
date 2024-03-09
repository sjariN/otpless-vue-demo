export const initOTPless = (callback: Function) => {
  const otplessInit = Reflect.get(window, 'otplessInit')

  const loadScript = () => {
    const isScriptLoaded = document.getElementById('otpless-sdk')
    if (isScriptLoaded) return

    const script = document.createElement('script')
    script.src = 'https://otpless.com/v2/auth.js'
    script.id = 'otpless-sdk'
    script.setAttribute('data-appid', 'YOUR DATA-APPID')
    document.body.appendChild(script)
  }

  otplessInit ? otplessInit() : loadScript()

  Reflect.set(window, 'otpless', callback)
}
