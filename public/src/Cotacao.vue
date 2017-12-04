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
                <a class="dropdown-item" href="#">Modelo 1</a>
                <a class="dropdown-item" href="#">Modelo 2</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Modelo separado</a>
                </div>
            </li>
            </ul>
            <form class="form-inline my-2 my-lg-1">
            <input class="form-control" type="search"  v-model="filtro" placeholder="Buscar" aria-label="Search">
            </form>
        </div>
        </nav>
    </div>
</template>

<script>
export default {
    data(){
        return{
            filtro: '',
            rotas: {
                inicio: '/',
                cotacao: '/cotacao'
            }            
        }
    },
    computed: {
        cardComFiltro() {
            if(this.filtro) {
                let exp = new RegExp(this.filtro.trim(), 'i');
                //return this.orcamentos.filter(orcamento => exp.test(orcamento.parceiro));
                return console.log('yay');
            } else {
                //return this.orcamentos;
                return console.log('yay');
            }
        }
    }
}
</script>

<style scoped>

</style>
