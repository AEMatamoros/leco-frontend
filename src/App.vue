<template>
  <nav >
    <div class="navbar-brand"><i class="fa-solid fa-laptop-code fa-2x"></i><strong class="brand-name">LECO</strong></div>
    <router-link class="navbar-links" to="/">Inicio</router-link>
    <router-link class="navbar-links" to="/list">Listado</router-link>
  </nav>
  <router-view :key="$route.path" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.navbar-brand{
  width: 70%;
}
.navbar-links{
  width: 15%;
}
nav a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.brand-name{
  font-size: 2rem;
  color: #42b983;
}
</style>
