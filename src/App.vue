<script setup>
import Home from './components/Home.vue'
import Header from './components/Header.vue'
import InfoStatus from "./components/InfoStatus.vue";
</script>

<template>
  <main>
    <Header title="La Cabane à Sucre Maplr"/>
    <Suspense>
      <Home />
      <template #fallback>
        Chargement...
      </template>
    </Suspense>
    <InfoStatus/>
  </main>
</template>
