<script setup lang="ts">
import { onMounted } from 'vue'
//@ts-ignore
import { initOTPless } from '@/utils/initOtpless'

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

const appendParams = (param:string,value:string) =>{
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
  
    if (!urlParams.has(param)) {
      urlParams.append(param, value);
    }
    url.search = urlParams.toString();
    window.history.pushState({}, '', url);
  }
// openModal on click of button
const openModal = () => {
  appendParams("ex","true");
  initOTPless(callback)
  const modalContainer = document.getElementById('modalContainer')
  modalContainer ? (modalContainer.style.display = 'flex') : ''
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
</script>

<template>
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
</template>
