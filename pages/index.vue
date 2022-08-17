<template>
  <div class="container">
    <div class="table-wrapper" v-if="!$store.getters['comments/getIsLoading']">
      <table class="table-users">
        <thead class="table-users__head">
          <tr>
            <td
              :class="['table-users__id', { 'm-sort': isSort }]"
              @click="sortById"
            >
              id
              <span>
                <SpriteIcon width="15" height="15" id="#i-arrow" />
              </span>
            </td>
            <td>name</td>
            <td>email</td>
          </tr>
        </thead>
        <tbody class="table-users__body">
          <tr
            v-for="item in paginatedUsers"
            :key="item.id"
            @click.prevent="openItem(item.id)"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="loading" v-else>Загрузка...</div>

    <div class="paginations">
      <button
        class="paginations__item"
        type="button"
        v-for="page in pages"
        :class="{ 'm-active': page === pageCurrentNumber }"
        @click.prevent="pageClick(page)"
        :key="page"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import SpriteIcon from "@/components/SpriteIcon.vue";

export default {
  name: "IndexPage",
  components: {
    SpriteIcon,
  },
  data() {
    return {
      isCommentsLoading: true,
      isSort: false,
      usersPage: 10,
      pageCurrentNumber: 1,
    };
  },
  async fetch({ store, error }) {
    try {
      if (store.getters["comments/getComments"].length === 0) {
        await store.dispatch("comments/getComments");
      }
    } catch (e) {
      error(e);
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.$store.getters["comments/getComments"].length / 10);
    },
    paginatedUsers() {
      let from = (this.pageCurrentNumber - 1) * this.usersPage;
      let to = from + this.usersPage;
      return this.$store.getters["comments/getComments"].slice(from, to);
    },
  },
  methods: {
    openItem(id) {
      this.$router.push({
        path: `/item/${id}`,
      });
    },
    pageClick(page) {
      this.pageCurrentNumber = page;
    },
    sortById() {
      this.isSort = !this.isSort;
      this.$store.dispatch("comments/sortComments", this.isSort);
    },
  },
};
</script>
