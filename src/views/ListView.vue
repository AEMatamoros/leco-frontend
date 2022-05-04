<template>
  <div class="about">
    <h1>Listado de elementos</h1>
    <ul>
      <li v-for="element in list" v-bind:key="element">
          <router-link class="navbar-links" :to="`/${element}`">Inicio</router-link>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[1,2,3,4,5]
    }
  }
}
</script>
