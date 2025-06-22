<template>
  <div class="landing">
    <header>
      <h1 style="font-weight: bold;">Ludo Livre</h1>
      <p>Games acessíveis para todos</p>
    </header>

    <section>
      <h2>Quem somos</h2>
      <p>
        A <strong>Ludo Livre</strong> cria e publica jogos pensados para pessoas com deficiência.
        Desenvolvemos experiências inclusivas com controles adaptados, design acessível e diversão para todos.
      </p>
      <a href="#contato" class="cta">Entre em contato</a>
    </section>

    <section id="contato">
      <h2>Fale conosco</h2>
      <p>Email: contato@ludolivre.com</p>
      <p>Redes sociais: @LudoLivre</p>
    </section>

    <footer>
      &copy; 2025 Ludo Livre - Todos os direitos reservados
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LandingPage'
})
</script>

<style scoped>
.landing {
  font-family: Arial, sans-serif;
  background: #2e2d52;
  color: #e0e0e0;
  min-height: 100vh;
}

header {
  background: #3b3a68;
  padding: 20px;
  text-align: center;
}

header h1 {
  color: #b197fc;
}

section {
  padding: 40px 20px;
  max-width: 800px;
  margin: auto;
}

.cta {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background: #b197fc;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
}

footer {
  text-align: center;
  padding: 20px;
  background: #3b3a68;
  color: #cdd3e0;
}
</style>
