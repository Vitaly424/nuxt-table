<template>
  <div class="container user-comment">
    <p class="user-comment__number">Номер пользователя: {{ comment.id }}</p>
    <h1 class="user-comment__title">Имя: {{ comment.name }}</h1>
    <h1 class="user-comment__title">Email: {{ comment.email }}</h1>
    <p class="user-comment__comments">Комментарий: {{ comment.body }}</p>

    <button class="user-comment__btn" @click="$router.push('/')">
      Вернуться на главную
    </button>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(`/comments/${params.id}`);
      return { comment: data };
    } catch (e) {
      error(e);
    }
  },
};
</script>

<style></style>
