<script setup lang="ts">
import { onMounted } from 'vue'
//@ts-ignore
import { initOTPless } from '@/utils/initOtpless'
onMounted(() => {
  initOTPless(callback)
})

const callback = (otplessUser:any) => {
    localStorage.setItem('token',otplessUser.token);
    (window as any).location.href = "/result";
  };
</script>

<template>
  <button className="loginBtn" id="otpless" data-custom="true">Login</button>
</template>
