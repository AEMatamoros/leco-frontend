<template>
  <div class="about container-fluid">
    <h1>Listado de diagramas</h1>
    <div class="row">
      <div v-for="element in drawflowItems" v-bind:key="element" class="col-4">
          <router-link class="text-decoration-none text-success" :to="`/${element.uid}`">
            <div class="card w-100 bg-dark mt-2">
              <div class="card-body">
                <h2 class="card-text"><i class="fa-solid fa-code-branch fa-1x"></i> {{element.name}}</h2>
              </div>
            </div>
          </router-link>
      </div>
    </div>
  </div>
</template>

<script>
//FETCH
import { fetchAPI } from '../helpers/fetch.js';

export default {
  data(){
    return {
      drawflowItems:[],
      count:0
    }
  },
  methods: {
    async getListOfDraws() {
        let response = await fetchAPI('',{});
        let data = await response.json();
        this.drawflowItems = data.drawflow;
    },
    async getDrawsCount() {
        let response = await fetchAPI('count',{});
        let data = await response.json();
        this.count = data.drawflow.length;
    }
  },
  created() {
    this.getListOfDraws();
    this.getDrawsCount();
  },
}
</script>
