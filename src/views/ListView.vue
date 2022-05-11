<template>
  <div class="about container-fluid">
    <h1>Listado de elementos</h1>
    <div class="row">
      <div v-for="element in drawflowItems" v-bind:key="element" class="col-4">
          <router-link class="navbar-links" :to="`/${element.uid}`">
            <div class="card w-100">
              <div class="card-body">
                <h2 class="card-text">{{element.name}}</h2>
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
      drawflowItems:[]
    }
  },
  methods: {
    async getListOfDraws() {
        let response = await fetchAPI('',{});
        let data = await response.json();
        this.drawflowItems = data.drawflow;
    }
  },
  created() {
    this.getListOfDraws()
  },
}
</script>
