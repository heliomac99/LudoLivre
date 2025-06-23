<template>
  <div class="landing">
    <main class="content-wrapper">
      <section class="content-section">
       <h1>Ludo <span class="text-blue">Livre</span></h1>
        <p class="tagline">Uma plataforma open-source para catalogar, explorar e desenvolver jogos acessíveis. Feita com paixão por desenvolvedores que acreditam no poder da liberdade criativa e da inclusão para todes.</p>
        <h2 class="section-title text-purple">Conectando quem cria com quem joga</h2>
        <p class="intro-text">
          A Ludo Livre funciona como uma ponte. De um lado, damos a oportunidade para novos talentos desenvolverem projetos com impacto. Do outro, oferecemos acesso a uma biblioteca de jogos pensada para necessidades reais.
        </p>
        <div class="dual-column-container">
          <div class="column">
            <h3>Para Desenvolvedores e Estudantes:</h3>
            <p>Oferecemos um espaço para aplicar suas habilidades em projetos com propósito. Na nossa plataforma, você pode:</p>
            <ul>
              <li>Publicar seus jogos acessíveis e construir um portfólio relevante.</li>
              <li>Colaborar em projetos open-source com outros estudantes e entusiastas.</li>
              <li>Receber feedback direto de jogadores, clínicas e especialistas em acessibilidade.</li>
              <li>Atender a demandas específicas para criar jogos sob encomenda, unindo desafio técnico e impacto social.</li>
            </ul>
          </div>
          <div class="column">
            <h3>Para Jogadores, Clínicas e Empresas:</h3>
            <p>Disponibilizamos um catálogo crescente de jogos, criados com foco em acessibilidade. Aqui, você pode:</p>
            <ul>
              <li>Explorar e jogar gratuitamente games classificados com tags específicas de acessibilidade.</li>
              <li>Encontrar ferramentas lúdicas para uso terapêutico, educacional ou simplesmente para lazer.</li>
              <li>Encomendar jogos sob demanda, apresentando uma necessidade específica para que nossa comunidade de desenvolvedores possa criar a solução.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="content-section">
        <h2 class="section-title text-gold">Nosso propósito é remover barreiras, um jogo de cada vez.</h2>
         <p class="intro-text">
            Acreditamos que os jogos são para todes. A Ludo Livre nasceu do desejo de unir a energia criativa dos estudantes de desenvolvimento da UFMG com as necessidades da comunidade de pessoas com deficiência. 
            </p>
            <p class="intro-text">Nosso objetivo é criar um ecossistema onde a <b>acessibilidade não seja um recurso extra, mas o ponto de partida</b>. Tudo de forma aberta, colaborativa e focada em construir uma biblioteca de jogos verdadeiramente livre e para todos.</p>
         
      </section>
      
      <section class="content-section about-section">
        <h2 class="section-title text-dark">Somos estudantes, desenvolvedores e, acima de tudo, apaixonados por jogos.</h2>
        <p class="intro-text">
            A Ludo Livre é uma iniciativa acadêmica, criada no âmbito da disciplina de Empreendimentos em Informática do Departamento de Ciência da Computação da UFMG. Este projeto é o nosso primeiro passo na jornada para construir uma comunidade de desenvolvimento de jogos mais consciente e inclusiva.
        </p>
        <p class="team-text"><strong>Equipe:</strong> Camila Nicola Dias Santana, Eduardo Assis Tomich, Helio Martins de Araújo Costa Neto, Isabela Fernandes Guerra de Morais, João Vitor Santana Depollo.</p>
      </section>

       <section class="content-section cta-section">
        <h2 class="section-title text-purple">Junte-se a nós.</h2>
        <p class="intro-text">
            A plataforma está em desenvolvimento e sua participação é fundamental para o seu crescimento.
        </p>
      </section>

    </main>
    <footer class="footer">
      <a href="mailto:ludolivrecontato@gmail.com" class="footer-email">
        ludolivrecontato@gmail.com
      </a>
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

/* Reset e Configurações Globais */
* {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}

.landing {
  font-family: 'Nunito', sans-serif;
  background-color: #f8f9fa; /* Fundo claro */
  color: #212529; /* Cor de texto padrão */
  width: 100%;
  min-height: 100vh;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.logo {
  height: 150px;
  margin-bottom: 1rem;
}

h1 {
  font-family: 'Nunito', sans-serif;
  font-size: 4rem;
  font-weight: 900;
  margin: 0;
  color: #8642D0; /* Roxo */
}
h1 .text-blue {
    color: #56B9E0; /* Azul */
}
.tagline {
  margin-top: 0.5rem;
  font-size: 1.5rem;
  color: #6c757d;
  font-weight: 400;
}

.content-section {
    margin: 0 auto 4rem auto;
    text-align: center;
}

.section-title {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 2rem;
}
.text-purple { color: #8642D0; }
.text-gold { color: #FFC300; }
.text-dark { color: #2c2a4a; }

.intro-text {
    font-size: 1.4rem !important;
    line-height: 1.7 !important;
    color: #495057;
    max-width: 900px;
    margin: 0 auto 2rem auto !important;
}

.dual-column-container {
    display: flex;
    gap: 3rem;
    text-align: left;
    margin-top: 3rem;
}

.column {
    flex: 1;
    background: #ffffff;
    border-radius: 16px;
    padding: 2.5rem;
    border: 1px solid #dee2e6;
    box-shadow: 0 8px 30px rgba(0,0,0,0.05);
}

h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 4px solid;
}
.column:first-child h3 {
    color: #8642D0;
    border-color: #8642D0;
}
.column:last-child h3 {
    color: #56B9E0;
    border-color: #56B9E0;
}

p {
  font-size: 1.2rem;
  line-height: 1.8;
  margin: 0 0 1.5rem 0;
  font-weight: 400;
  color: #495057;
}

strong {
    color: #212529;
    font-weight: 700;
}

ul {
  padding-left: 0;
  margin: 1.5rem 0;
  list-style: none;
}
li {
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
  display: flex;
  align-items: flex-start;
  color: #212529;
}
li::before {
    content: '🎮';
    margin-right: 0.75rem;
    font-size: 1.3rem;
    line-height: 1.8;
}

.about-section {
    background: #ffffff;
    border-radius: 16px;
    padding: 3rem;
    border: 1px solid #dee2e6;
}

.team-text {
    font-size: 1.3rem !important;
    font-style: italic;
    color: #6c757d;
    margin-top: 2rem !important;
}

.cta-section {
    padding: 2rem;
}

.cta-buttons {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
.cta-buttons a {
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
    color: #56B9E0;
    transition: color 0.2s, transform 0.2s;
}
.cta-buttons a:hover {
    color: #8642D0;
    transform: scale(1.05);
}

.footer {
  width: 100%;
  text-align: center;
  padding: 2rem 0 1rem 0;
  background: transparent;
  font-size: 1.1rem;
  color: #6c757d;
}

.footer-email {
  color: #8642D0;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s;
}

.footer-email:hover {
  color: #56B9E0;
  text-decoration: underline;
}

@media (max-width: 992px) {
    .dual-column-container {
        flex-direction: column;
    }
     .landing {
        padding: 1.5rem;
    }
}
</style>
