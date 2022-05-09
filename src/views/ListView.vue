<template>
  <div class="about">
    <h1>Listado de elementos</h1>
    <ul>
      <li v-for="element in drawflowItems" v-bind:key="element">
          <router-link class="navbar-links" :to="`/${element.uid}`">{{element.name}}</router-link>
      </li>
    </ul>
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
