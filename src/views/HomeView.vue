<script setup lang="ts">
import { onMounted } from 'vue'
//@ts-ignore
import { initOTPless } from '@/utils/initOtpless'

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('ex')) initOTPless(callback)
})

const callback = (otplessUser: any) => {
  const currentURL = window.location.href
  const urlWithoutParams = currentURL.split('?')[0]
  window.history.pushState(null, '', urlWithoutParams)
  localStorage.setItem('token', otplessUser.token)
  window.location.href = '/result'
}

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

const removeQueryParam = (param:any) => {
  const url = new URL(window.location.href)
  url.searchParams.delete(param)
  window.history.pushState(null, '', url)
}

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
