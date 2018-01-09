<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-5" align="center"> Orçamentos - <b>Plantebem</b> </h1>
        <p class="lead" align="center">Sistema gerenciador de cotações e resultados de vendas.</p>
      </div>
    </div>

    <nav class="navbar navbar-dark navbar-expand-sm navbar-light bg-dark">
      <router-link class="navbar-brand" :to="rotas.inicio">Inicio</router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item ">
            <router-link class="nav-link" :to="rotas.cotacao">Cotação</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Relatórios
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="http://127.0.0.1:3000/orcamento/report/" target="_blank">Modelo 1</a>
              <a class="dropdown-item" href="#">Modelo 2</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Modelo separado</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-1">
          <input class="form-control" type="search"  v-model="filtro" placeholder="Buscar por Cliente" aria-label="Search">
        </form>
      </div>
    </nav>
    <!-- area da page **************************************************** -->
    <div class="container container-fluid">
      <div class="row">
        <div class="col-sm">
          <ul id="listagem">
            <li v-for="card in cardComFiltro" :key="card._id">
              <div class="card mb-3 " v-bind:class="'border-'+cardBorder(card)" style="max-width: 20rem;">
                <div class="card-body">
                  <div align="right">
                    <button type="button" class="close" aria-label="Close" align="right" @click="deleteOrc(card)">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>          
                  <h4 class="card-title" align="center">{{ caixaAlta(card.parceiro) }}</h4>
                  <p class="card-text">
                    <ul>
                      <li><b>Vendedor:</b> {{ card.vendedor }}</li>
                      <li><b>Numero de itens:</b> {{ numeroItens(card) }}</li>
                      <li><b>Total:</b> R${{ saldoTotal(card) }}</li>
                    </ul>
                  </p>
                  <div align="center">
                    <router-link class="btn" v-bind:class="'btn-'+cardBorder(card)" :to="getRota(card)">Detalhes</router-link>
                  </div>
                </div>
              </div>
            </li>          
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'app',
  data () {
    return {
      server: '127.0.0.1',
      orcamentos : [],
      filtro: '',
      rotas: {
        inicio: '/',
        cotacao: '/cotacao'
      }
    }
  },
  created: function(){
    this.getOrcamentos();
  },
  methods: {
    getOrcamentos(){
      this.$http.get('orcamento')
      .then(response => response.json())
      .then(dados => this.orcamentos = dados, err => console.log(err));
    },
    caixaAlta: function(data) {
      return data.toUpperCase();
    },
    numeroItens: function(data){
      return data.itens.length;
    },
    saldoTotal: function(data){
      let total = 0;
      data.itens.forEach(element => {total += element.quantidade * element.valor});
      return total.toFixed(2);
    },
    cardBorder: function(card){
      if(card.status) return 'primary'
      return 'secondary'
    },
    getRota: function(card){
      return this.rotas.cotacao + "/" + card._id;
    },
    deleteOrc: function(card){
      let rota = 'orcamento/'+card._id;
      this.$http.delete(rota)
      .then(response => {
        let index = (this.orcamentos).indexOf(card);
        this.$delete(this.orcamentos, index);
        console.log('card deleted!');
      });
      
    }
  },
  computed: {
    cardComFiltro() {
      if(this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.orcamentos.filter(orcamento => exp.test(orcamento.parceiro));
      } else {
        return this.orcamentos;
      }
    }
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.jumbotron {
  margin-bottom: 0
}
.navbar { 
  margin-top: 0;
  margin-bottom: 25px;
}

.navbar-brand {
  padding: 20;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>