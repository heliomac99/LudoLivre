<template>
    <div class="container py-4">  
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="jogo in jogos" :key="jogo.id">
          <div class="card cardGame h-100 shadow-sm">
            <img :src="jogo.imagem" class="card-img-top" alt="Capa do jogo" style="height: 200px; object-fit: cover;" />
            <div class="card-body">
              <h5 class="card-title">{{ jogo.nome }}</h5>
              <p class="card-text text-muted">{{ jogo.descricao }}</p>
            </div>
            <div class="card-footer border-0 bg-transparent">
              <button class="btn btn-primary w-100" @click="verMais(jogo)">Ver mais</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">

  import jogo1 from '@/assets/jogo1.jpg'
  import jogo2 from '@/assets/jogo2.jpg'
  import jogo3 from '@/assets/jogo3.jpg'


  export default {
    name: 'GameLibrary',
    data() {
      return {
        jogos: [
          {
            id: 1,
            nome: 'Gatitos Malditos',
            descricao: 'Uma aventura épica no mundo felino',
            imagem: jogo1
          },
          {
            id: 2,
            nome: 'Uma Noite de Sábado',
            descricao: 'A boa e velha rotina',
            imagem: jogo2
          },
          {
            id: 3,
            nome: 'Dragon Souls',
            descricao: 'Desafios seu amigos em um mundo dracônico',
            imagem: jogo3
          }
        ]
      }
    },
    methods: {
      verMais(jogo: any) {
        alert(`Jogo selecionado: ${jogo.nome}`)
        // ou redireciona para rota de detalhe, ex:
        // this.$router.push(`/jogos/${jogo.id}`)
      }
    }
  }
  </script>
  <style>
.cardGame {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cardGame:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>