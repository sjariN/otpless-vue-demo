[![OTPless](https://d1j61bbz9a40n6.cloudfront.net/website/home/v4/logo/white_logo.svg)](https://otpless.com/platforms/react)

# Vue Demo : Onclick Otpless Floater

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

2. **Load the script in Login/Signup component and add callback function**

> - Add following code in Login/Signup component.
> - retrive data using **otplessUser** object

```jsx
onMounted(() => {
  // Code to execute after the component is mounted
  initOTPless(callback)
});

const callback = (otplessUser : any) =>{
  alert({otplessUser})
}
```

3. **Add Otpless-login-page Button**

> Add the following Button in Login/Signup component.

```jsx
<button className="loginBtn" id="otpless" data-custom="true">
  Login
</button>
```

4. **Add following code in global css file. [OPTIONAL]**

```css
/* login button css */
.loginBtn {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
}

/* center the otpless floater */
#otpless-floating-button {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
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
