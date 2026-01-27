<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    RouterLink,
    RouterView,
  },
})
</script>

<template>
  <div class="app">
    <header>
      <img src="@/assets/afs-energy-logo.png" alt="logo" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/table">Table</RouterLink>
        <RouterLink to="/transactions">Transactions</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
header {
  margin-bottom: 2rem;
}

nav a {
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  color: #333;
  font-weight: 500;
}

nav a.router-link-active {
  background-color: #f0f0f0;
  color: #000;
}
</style>
