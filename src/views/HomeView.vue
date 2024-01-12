<script setup lang="ts">
import { onMounted } from 'vue';
//@ts-ignore
import {initOTPless} from '@/utils/initOtpless'
onMounted(() => {
  // Code to execute after the component is mounted
  initOTPless(handleOtplessData)
});
const handleOtplessData = (otplessUser : any) =>{
  localStorage.setItem('token',otplessUser.token);
  window.location.href = '/result'
}
</script>

<template>
  <div id="otpless-login-page"></div>
</template>
