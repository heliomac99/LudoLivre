<template>
    <div class="loader-backdrop">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'LoaderSpinner'
  })
  </script>
  
  <style scoped>
  .loader-backdrop {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    z-index: 999;
  }
  
  .spinner {
    width: 48px;
    height: 48px;
    border: 6px solid #ccc;
    border-top: 6px solid #7269ef;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  