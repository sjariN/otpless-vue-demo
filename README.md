[![OTPless](https://d1j61bbz9a40n6.cloudfront.net/website/home/v4/logo/white_logo.svg)](https://otpless.com/platforms/react)

# Vue Demo : Onclick Otpless Login Page

## Steps to add OTPless SDK to your Next Website

1. **Add OTPLESS Script as utils function**

> Add the following code to your utils/initOtpless.ts in root directory.

```JavaScript
export const initOTPless = (callback: Function) => {
  const otplessInit = Reflect.get(window, 'otplessInit')

  const loadScript = () => {
    const isScriptLoaded = document.getElementById('otpless-sdk')
    if (isScriptLoaded) return

    const script = document.createElement('script')
    script.src = 'https://otpless.com/v2/auth.js'
    script.id = 'otpless-sdk'
    script.setAttribute('data-appid', 'YOUR_DATA_APPID')
    document.body.appendChild(script)
  }

  otplessInit ? otplessInit() : loadScript()

  Reflect.set(window, 'otpless', callback)
}
```

2. **Add following code to Login/Signup component**

> - Add following code in Login/Signup component.
> - retrive data using **otplessUser** object

```jsx
// Note: We are adding 'ex' parameter to open login page automatically after redirection in between of authentication process

// load the script on component load
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('ex')) initOTPless(callback)
})

// callback function to handle login/signup flow
const callback = (otplessUser: any) => {
  removeQueryParam("ex");
  localStorage.setItem('token', otplessUser.token)
  window.location.href = '/result'
}

// openModal on click of button
const openModal = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const paramsValue = urlParams.get('ex')

  if (!paramsValue) {
    const currentURL = window.location.href
    const newParam1 = 'ex=true'
    const updatedURL = `${currentURL}?${newParam1}`
    window.history.pushState(null, '', updatedURL)
  }
  initOTPless(callback)
  const modalContainer = document.getElementById('modalContainer')
  modalContainer ? (modalContainer.style.display = 'flex') : ''

  setTimeout(() => {
    removeQueryParam('ex')
  }, 1000)
}

// removing queryparams
const removeQueryParam = (param:any) => {
  const url = new URL(window.location.href)
  url.searchParams.delete(param)
  window.history.pushState(null, '', url)
}

// close the modal
const closeModal = (e: any) => {
  removeQueryParam('ex')
  const modalContainer = document.getElementById('modalContainer')
  if (e.target === modalContainer) {
    modalContainer ? (modalContainer.style.display = 'none') : ''
  }
}
```

3. **Add Otpless-login-page div**

> Add the following div in Login/Signup component.

```jsx
<div class="main">
  <div
    className="modal-container"
    id="modalContainer"
    @click="closeModal"
  >
    <div id="otpless-login-page"></div>
  </div>
  <button
    id="loginBtn"
    @click="openModal"
  >
    Login with modal
  </button>
</div>
```

4. **Add following code in global css file**

```css
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  display: none;
  justify-content: center;
  align-items: center;
}

#loginBtn {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
}
```

### This demo implementation adds extra modularity, scalability and reusability to the otpless-auth sdk

### Integration Options

- [OTPless-Page](https://github.com/sjariN/otpless-vue-demo)
- [OTPless-Page-OnClick](https://github.com/sjariN/otpless-vue-demo/tree/on-button-click-login-page)
- [OTPless-Floater](https://github.com/sjariN/otpless-vue-demo/tree/floater)
- [OTPless-Floater-OnClick](https://github.com/sjariN/otpless-vue-demo/tree/on-button-click-floater)

### Usage

> **Prequisite** [NodeJS](https://nodejs.org/en)

- Install Packages

  ```bash
  npm install
  ```

- Run the demo

  ```bash
  npm run dev
  ```

- Open [localhost:5173](http://localhost:5173) in your browser
- Switch branches to check out available options to integrate _OTPless_ in your project.

> Received User Data Format

```json
// otpless user Format
{
  "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "timestamp": "YYYY-MM-DD HH:MM:SS",
  "timezone": "+XX:XX",
  "mobile": {
    "name": "User Name",
    "number": "User Mobile Number"
  },
  "email": {
    "name": "User Name ",
    "email": "User Email"
  }
}
```
