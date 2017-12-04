<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-5" align="center"> Orçamentos - <b>Plantebem</b> </h1>
        <p class="lead" align="center">Sistema gerenciador de cotações e resultados de vendas.</p>
      </div>
    </div>

    <nav class="navbar navbar-dark navbar-expand-sm navbar-light bg-dark">
      <a class="navbar-brand" href="#">Inicio</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item ">
            <a class="nav-link" href="#">Cotação</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Relatórios
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Modelo 1</a>
              <a class="dropdown-item" href="#">Modelo 2</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Modelo separado</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-1">
          <input class="form-control" type="search" placeholder="Buscar" aria-label="Search">
        </form>
      </div>
    </nav>
    <!-- area da page **************************************************** -->
    <div class="container container-fluid">
      <div class="row">
        <div class="col-sm">
          <ul id="listagem">
            <li v-for="card in orcamentos" :key="card">
              <div class="card mb-3 border-primary" style="max-width: 20rem;">
                <div class="card-body">
                  <h4 class="card-title">{{ card.parceiro }}</h4>
                  <p class="card-text">
                    <ul>
                      <li>Vendedor: {{ card.vendedor }}</li>
                      <li>Numero de itens: 12</li>
                      <li>Total: R$1.000,00</li>
                    </ul>
                  </p>
                </div>
              </div>
            </li>          
          </ul>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      orcamentos : [{}],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created: function(){

  },
  computed: {
    
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
