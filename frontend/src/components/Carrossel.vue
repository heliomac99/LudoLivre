<template>
    <div class="carousel-wrapper">
      <div class="main-image-container">
        <img
          :src="imagens[indiceAtual]"
          class="main-image"
          alt="Imagem selecionada"
        />
      </div>
  
      <div class="thumbs-container">
        <div
          v-for="(img, index) in imagens"
          :key="index"
          class="thumb-wrapper"
          :class="{ active: index === indiceAtual }"
          @click="irPara(index)"
        >
          <img :src="img" alt="Miniatura" class="thumb" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'CarrosselImagens',
    props: {
      imagens: {
        type: Array as () => string[],
        required: true
      }
    },
    data() {
      return {
        indiceAtual: 0
      }
    },
    methods: {
      irPara(index: number) {
        this.indiceAtual = index
      }
    }
  })
  </script>
  
  <style scoped>
  .carousel-wrapper {
    width: 100%;
    max-width: 800px;
    margin: auto;
  }
  
  .main-image-container {
    width: 100%;
    text-align: center;
  }
  
  .main-image {
    width: 100%;
    max-height: 500px;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
  }
  
  .thumbs-container {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    perspective: 1000px;
  }
  
  .thumb-wrapper {
    width: 80px;
    height: 80px;
    transform: rotateY(15deg) scale(0.85);
    opacity: 0.7;
    transition: transform 0.3s ease, opacity 0.3s ease;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .thumb-wrapper:hover {
    transform: rotateY(10deg) scale(0.9);
    opacity: 0.85;
  }
  
  .thumb-wrapper.active {
    transform: rotateY(0deg) scale(1.1);
    opacity: 1;
    z-index: 2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
  
  .thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  </style>
  