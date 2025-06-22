<template>
  <div class="landing">
    <header>
      <h1 style="font-weight: bold;">Ludo Livre</h1>
      <p>Games acessíveis para todos</p>
    </header>

    <section>
      <h2>Quem somos</h2>
      <p>
        Ludo Livre<br>
        Uma plataforma open-source para catalogar, explorar e desenvolver jogos acessíveis. Feita com paixão por desenvolvedores que acreditam no poder da liberdade criativa e da inclusão para todes.
        Conectando quem cria com quem joga.<br><br>
        A Ludo Livre funciona como uma ponte. De um lado, damos a oportunidade para novos talentos desenvolverem projetos com impacto. Do outro, oferecemos acesso a uma biblioteca de jogos pensada para necessidades reais.<br><br>
        <strong>Para Desenvolvedores e Estudantes da UFMG:</strong><br>
        Oferecemos um espaço para aplicar suas habilidades em projetos com propósito. Na nossa plataforma, você pode:
        <ul>
          <li>Publicar seus jogos acessíveis e construir um portfólio relevante.</li>
          <li>Colaborar em projetos open-source com outros estudantes e entusiastas.</li>
          <li>Receber feedback direto de jogadores, clínicas e especialistas em acessibilidade.</li>
          <li>Atender a demandas específicas para criar jogos sob encomenda, unindo desafio técnico e impacto social.</li>
        </ul>
        <strong>Para Jogadores, Clínicas e Empresas:</strong><br>
        Disponibilizamos um catálogo crescente de jogos, criados com foco em acessibilidade. Aqui, você pode:
        <ul>
          <li>Explorar e jogar gratuitamente games classificados com tags específicas de acessibilidade.</li>
          <li>Encontrar ferramentas lúdicas para uso terapêutico, educacional ou simplesmente para lazer.</li>
          <li>Encomendar jogos sob demanda, apresentando uma necessidade específica para que nossa comunidade de desenvolvedores possa criar a solução.</li>
        </ul>
        Nosso propósito é remover barreiras, um jogo de cada vez.<br><br>
        Acreditamos que os jogos são para todes. A Ludo Livre nasceu do desejo de unir a energia criativa dos estudantes de desenvolvimento da UFMG com as necessidades da comunidade de pessoas com deficiência.<br><br>
        Nosso objetivo é criar um ecossistema onde a acessibilidade não seja um recurso extra, mas o ponto de partida. Tudo de forma aberta, colaborativa e focada em construir uma biblioteca de jogos verdadeiramente livre e para todos.<br><br>
        Somos estudantes, desenvolvedores e, acima de tudo, apaixonados por jogos.<br>
        A Ludo Livre é uma iniciativa acadêmica, criada no âmbito da disciplina de Empreendimentos em Informática do Departamento de Ciência da Computação da UFMG. Este projeto é o nosso primeiro passo na jornada para construir uma comunidade de desenvolvimento de jogos mais consciente e inclusiva.<br><br>
        <strong>Equipe:</strong> Camila Nicola Dias Santana, Eduardo Assis Tomich, Helio Martins de Araújo Costa Neto, Isabela Fernandes Guerra de Morais, João Vitor Santana Depollo.<br><br>
        Junte-se a nós.<br>
        A plataforma está em desenvolvimento e sua participação é fundamental para o seu crescimento.<br><br>
        <a href="#contato" class="cta">Sou desenvolvedor e quero colaborar</a>
        <a href="#contato" class="cta">Quero explorar os jogos ou solicitar um projeto</a>
      </p>
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
  margin: 10px 10px 0 0;
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
