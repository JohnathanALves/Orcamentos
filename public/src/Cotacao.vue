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
                <li class="nav-item active">
                    <router-link class="nav-link" :to="rotas.cotacao">Cotação</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Relatórios
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Modelo 1</a>
                    <a class="dropdown-item" href="#">Modelo 2</a>
                    </div>
                </li>
                </ul>
            </div>
        </nav>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="cotacao card bg-light mb-3"> 
                        <div class="card-header">
                            <div class="container ">
                                <div class="row align-items-center">
                                    <div class="col-8" align="center">
                                        <h3> Cotação </h3>
                                    </div>
                                    <div class="col-4" align="left" >
                                        <datepicker v-model="date" :value="dataAtual" format="dd/MM/yyyy" language="pt-br"></datepicker>                               
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="container ">
                                <div class="row align-items-center">
                                    <div class="col-8" align="center">
                                        <input class="form-control" type="text" placeholder="Insira aqui o Cliente">
                                    </div>
                                    <div class="col-4">
                                        <div align="right">
                                            <select class="custom-select" v-model="currentVendedor">
                                                <option value="" disabled selected> Selecione o Vendedor </option>
                                                <option v-for="vendedor in listaVendedores" :value="vendedor" :key="vendedor">{{ vendedor }}</option>
                                            </select>
                                        </div>                              
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">                            
                            <table class="table table-striped table-bordered table-hover">
                                <thead >
                                    <tr class="table-success" >
                                    <th scope="col" width="3%">#</th>
                                    <th scope="col" width="50%">Produto</th>
                                    <th scope="col" width="5%">Und</th>
                                    <th scope="col" width="5%">Qtde</th>
                                    <th scope="col" width="10%">Preço</th>
                                    <th scope="col" width="15%">Total</th>
                                    <th scope="col" width="3%">Fechou?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in itens" :key="item._id">
                                        <th scope="row">{{ itens.indexOf(item)+1}}</th>
                                        <td>{{ item.produto }}</td>
                                        <td>{{ item.unidade }}</td>
                                        <td>{{ item.quantidade.toFixed(2) }}</td>
                                        <td>R${{ item.valor.toFixed(2) }}</td>
                                        <td>R${{ (item.valor * item.quantidade).toFixed(2)}}</td>
                                        <td align="center">
                                            <label class="custom-control custom-checkbox" align="center">
                                                <input type="checkbox" class="custom-control-input" align="center" v-model="item.fechou">
                                                <span class="custom-control-indicator" align="center"></span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr v-bind:style="{display: (saldoTotal() == 'true')? true: none }">
                                        <th scope="row">#</th>
                                        <td colspan="4"><b>Total</b></td>
                                        <td><b>R${{ saldoTotal() }}</b></td>
                                        <td> {{totalFechados()}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <div class="card-body" style="margin-top: 0px;display: inline-block;" align="right">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#insereProdModal" style="margin: 15px; width: 10rem;display: inline-block;">Adicionar Produto</button>
                            <button type="button" class="btn btn-danger" style="margin: 15px; width: 8rem; align:right;" >Cancelar</button>
                            <button type="button" class="btn btn-secondary" style="margin: 15px; width: 8rem;">Encerrar</button>
                            <button type="button" class="btn btn-success" style="margin: 15px; width: 8rem;">Salvar</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="insereProdModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Inserção de Produto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>Produto</label>
                                    <autocomplete
                                        url="http://localhost:3000/produto/search"
                                        anchor="produto"
                                        label="produto"
                                        :on-select="getData">
                                    </autocomplete>                                
                                <input type="text" class="form-control" placeholder="Insira o nome do produto.">
                            </div>
                            <div class="form-group">
                                <label>Quantidade</label>
                                <input type="text" class="form-control" placeholder="Insira a quantidade.">
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">$</span>
                                <input type="text" class="form-control" placeholder="Insira o Valor.">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="adicionaProduto()">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Datepicker from 'vuejs-datepicker';
import Autocomplete from 'vue2-autocomplete-js';

export default {
    components: {
        'datepicker': Datepicker,
        'autocomplete': Autocomplete
    },
    data(){
        return{
            itens: [],
            currentVendedor: '',
            date: '',
            addProd: {},
            vendedores:['Aline', 'Marilia','Ivonilton', 'Rose', 'Itailara'],
            rotas: {
                inicio: '/',
                cotacao: '/cotacao'
            },
        }
    },
    computed: {
        listaVendedores() {
            return this.vendedores.sort();
        },
        atualizaVendedor(){
            return this.currentVendedor = this.$vendedorSelecionado;
        },
        dataAtual(){
            let date = this.date = new Date();
            return date;
        }
    },
    methods: {
        saldoTotal(){
            let total = 0;
            this.itens.forEach(element => {total += element.quantidade * element.valor});
            return total.toFixed(2);
        },
        totalFechados(){
            let total = 0;
            this.itens.forEach(element => {(element.fechou? total +=1:0) });
            if (total) return total
            return;
        },
        getData(obj){
            console.log(obj);
        }
    }
}
</script>

<style scoped>

.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color: #C2E5CB;
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

</style>
