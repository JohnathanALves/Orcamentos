<template>
    <div>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-5" align="center"> Orçamentos - <b>Plantebem</b> </h1>
                <p class="lead" align="center">Sistema gerenciador de cotações e resultados de vendas.</p>
            </div>
        </div>
        <nav class="navbar navbar-dark navbar-expand-sm navbar-light bg-dark">
            <router-link class="navbar-brand" :to="{ name: 'home'}">Inicio</router-link>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" @click="this.Update()" :to="{ name: 'cotacaoNova'}">Cotação</router-link>
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
                <form class="form-inline my-2 my-lg-1">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#novoProdModal">Novo Produto</button>
                </form>
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
                                        <input class="form-control" type="text" placeholder="Insira aqui o Cliente" v-model="parceiro">
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
                                <tbody v-if="verificaListaVazia">
                                    <tr v-for="item in itens" :key="item._id">
                                        <th scope="row">{{ itens.indexOf(item)+1}}</th>
                                        <td>{{ item.produto.produto }}</td>
                                        <td>{{ item.produto.unidade }}</td>
                                        <td>{{ item.quantidade }}</td>
                                        <td>R${{ item.valor }}</td>
                                        <td>R${{ (item.valor * item.quantidade).toFixed(2)}}</td>
                                        <td align="center">
                                            <label class="custom-control custom-checkbox" align="center">
                                                <input type="checkbox" class="custom-control-input" align="center" v-model="item.fechou">
                                                <span class="custom-control-indicator" align="center"></span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr v-show="verificaListaVazia" class="table-success" >
                                        <th scope="row">#</th>
                                        <td colspan="4"><b>Total</b></td>
                                        <td><b>R${{ saldoTotal }}</b></td>
                                        <td> {{totalFechados()}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <div class="card-body" style="margin-top: 0px;display: inline-block;" align="right">
                            <button type="button" class="btn btn-primary" data-toggle="modal" @click="getBaseProd()" data-target="#insereProdModal" style="margin: 15px; width: 10rem;display: inline-block;">Adicionar Produto</button>
                            <button type="button" class="btn btn-danger" style="margin: 15px; width: 8rem; align:right;" >Cancelar</button>
                            <button type="button" class="btn btn-secondary" style="margin: 15px; width: 8rem;">Encerrar</button>
                            <button type="button" class="btn btn-success" style="margin: 15px; width: 8rem;" @click="salvar()">Salvar</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal adicionar produto -->
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
                                <v-select v-model="prodSelected" :options="listaProdutos"></v-select>
                            </div>
                            <div class="form-group">
                                <label>Quantidade</label>
                                <input type="number" class="form-control" v-model="addQuantidade" placeholder="Insira a quantidade.">
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">$</span>
                                <input type="number" class="form-control" v-model="addValor" placeholder="Insira o Valor.">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="adicionaProduto()" data-dismiss="modal">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal novo Produto -->
        <div class="modal fade" id="novoProdModal" tabindex="-1" role="dialog" aria-labelledby="novoProdModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="novoProdModal">Novo Produto no Sistema</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>Produto</label>   
                                <input type="text" class="form-control" v-model="novoProduto" placeholder="Insira a descrição do produto.">
                            </div>
                            <div class="form-group">
                                <label>Unidade</label>
                                <!-- <input type="text" class="form-control"  > -->
                                    <select class="form-control" id="seletorUnidade" placeholder="Insira a unidade. Ex.: KG, LT, G, PCT" v-model="novoUnidade">
                                        <option valor="LT">LITRO</option>
                                        <option valor="KG">KILOGRAMA</option>
                                        <option valor="G">GRAMA</option>
                                        <option valor="PCT">PACOTE</option>
                                    </select>
                            </div>
                            <div class="input-group">
                                <b>Concorrente</b> &nbsp
                                <label class="custom-control custom-checkbox" align="center">
                                    <input type="checkbox" class="custom-control-input" align="center" v-model="novoProdConc">
                                    <span class="custom-control-indicator" align="center"></span>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="addProdutoOrcamento()" data-dismiss="modal">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Datepicker from 'vuejs-datepicker';
import vSelect from "vue-select";

export default {
    components: {
        'datepicker': Datepicker,
        vSelect
    },
    props: ['id'],
    data(){
        return{
            itens: [],
            currentVendedor: '',
            date: '',
            parceiro: '',
            addProd:{},
            addQuantidade:'',
            addValor:'',
            vendedores:['Aline', 'Marilia','Ivonilton', 'Rose', 'Itailara'],
            produtosBase: [],
            prodSelected: '',
            novoProduto:'',
            novoUnidade:'',
            novoProdConc: true,
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
        dataAtual(){
            let date = this.date = new Date();
            return date;
        },
        listaProdutos(){
            let lista = [];
            this.produtosBase.forEach(element => lista.push(element.produto));
            return lista;
        },
        verificaListaVazia(){
            let lista = (this.itens).length;
            if (lista) return true;
            return false;
        },
        saldoTotal(){
            if ((this.itens).length) {
                let total = 0.0;
                this.itens.forEach(element => {total += element.quantidade * element.valor})
                return total.toFixed(2);
            };
            return 0;
        }
    },
    methods: {
        addNovoProduto(){
            let dados = {produto: this.novoProduto,unidade:this.novoUnidade,concorrencia:this.novoProdConc};
            console.log(dados);
            this.$http.post('produto', dados)
            .then(response => console.log(response)); 
        },
        totalFechados(){
            let total = 0;
            this.itens.forEach(element => {(element.fechou? total +=1:0) });
            if (total) return total
            return;
        },
        adicionaProduto(){
            let indexProd = this.produtosBase.findIndex(i => i.produto === this.prodSelected);
            let addProd = {produto:this.produtosBase[indexProd], quantidade: parseFloat(this.addQuantidade).toFixed(2), valor: parseFloat(this.addValor).toFixed(2)};
            this.itens.push(addProd);
            return;
        },
        getBaseProd(){
            this.$http.get('produto')
            .then(response => response.json())
            .then(dados => this.produtosBase = dados, err => console.log(err));
        },
        addOrcamento: function(){
            let vendedor = this.currentVendedor;
            let data = this.date;
            let parceiro = this.parceiro;
            let dados = {data: data, parceiro: parceiro};
            this.$http.post('orcamento/'+vendedor, dados)
            .then(response => {
                let res = response.body;
                this.addProdutoOrcamento(res);
            });
        },
        addProdutoOrcamento(orcamento){
            let codOrc = orcamento._id;
            let vendedor = orcamento.vendedor;
            for (let i = 0; i < this.itens.length; i++){
                let tmp = this.itens[i];
                let dados = {codProduto: tmp.produto._id, quantidade: tmp.quantidade, valor: tmp.valor};
                this.$http.post('orcamento/'+ vendedor + '/' + codOrc, dados)
                .then(response => console.log(response));
            }
        },
        salvar(){
            let id = this.id;
            if(id){
                console.log('opa');
            } else {
                this.addOrcamento();
            }
        }
    },
    created(){
        let id = this.id;
        if(id){
            this.$http.get('orcamento/'+ id)
            .then(response => {
                let res = response.body;
                console.log(res);
                this.currentVendedor = res.vendedor;
                this.parceiro = res.parceiro;
                this.itens = res.itens;
            });
        } else {
            this.itens= [];
            this.currentVendedor= '';
            this.date= '';
            this.parceiro= '';
        }
    },
    updated(){}
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
