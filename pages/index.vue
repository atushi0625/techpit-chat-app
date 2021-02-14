<template>
  <div>
    <div
      v-for="room in rooms"
      :key="room.id"
      @click="moveToRoomPage(room.id)"
      class="bg-white max-w-sm rounded-lg overflow-hidden shadow m-4 mb-5 p-4 h-32"
    >
      <div>
        <img
          :src="room.topImageUrl"
          class="float-left object-cover rounded-lg w-24 h-24 mr-4"
        />
        <p class="font-mono text-darkGray">{{ room.name }}</p>
      </div>
    </div>
    <!-- ルーム作成ボタン -->
    <div class="fixed bottom-0 right-0 mr-4">
      <button @click="openModal">
        <i class="material-icons text-primary text-7xl create-btn gradation">
          add_circle
        </i>
      </button>
    </div>

    <!-- ルーム作成Modal -->
    <ModalBase v-if="isCreateMode" @closeModal="closeModal">
      <!-- Modal外側共通コンポーネントにも、Modal中身のコンポーネントにも、呼び出し元に定義
      してあるModalを閉じる処理を渡している。 -->
      <!-- emit('closeModal')とすることでModalを閉じる処理を呼ぶことができる -->

      <CreateRoomModal @closeModal="closeModal" />
    </ModalBase>

    <!-- Modal.vueでslotと指定した場所に展開される。componentの呼び出し元から
    呼び出し先のcomponentに対して、指定したHTMLを注入できる -->
  </div>
</template>

<script>
import ModalBase from "~/components/ModalBase";
import CreateRoomModal from "~/components/CreateRoomModal";
import { mapGetters } from "vuex";
export default {
  middleware: ["checkAuth"],
  components: {
    ModalBase,
    CreateRoomModal,
  },
  data() {
    return {
      isCreateMode: false,
      unsubscribe: null,
    };
  },
  computed: {
    ...mapGetters("rooms", ["rooms"]), //mapGetters で参照しているチャット部屋データを v-for でループさせ表示しています。
  },
  async asyncData({ store }) {
    const unsubscribe = await store.dispatch("rooms/subscribe");
    return {
      unsubscribe,
    };
  },

  // 別ページに遷移したとき、リアルタイムアップデートを停止したいので、コンポーネントが破壊される段階で
  // 以下の処理をしてstateの中をからにして、リアルタイムアップデートを停止する

  destroyed() {
    this.$store.dispatch("rooms/clear");
    if (this.unsubscribe) this.unsubscribe();
  },

  methods: {
    openModal() {
      this.isCreateMode = true;
    },
    closeModal() {
      this.isCreateMode = false;
    },
    moveToRoomPage(roomId) {
      this.$router.push(`/rooms/${roomId}`);
    },
  },
};
</script>

<style scoped>
.create-btn {
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
