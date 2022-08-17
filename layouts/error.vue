<template>
  <div class="error-page">
    <h1 class="error-page__title" v-if="error.statusCode === 404">
      Ошибка: Такой страницы не существует {{ error.statusCode }}
    </h1>

    <h1 v-else>Неизвестная ошибка {{ error.statusCode }}</h1>

    <p>
      <nuxt-link class="error-page__home" to="/"
        >Вернуться на главную</nuxt-link
      >
    </p>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error",
};
</script>

<style></style>
