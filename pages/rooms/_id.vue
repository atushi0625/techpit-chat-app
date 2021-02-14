<template>
  <div class="relative">
    <div class="px-4 pb-32"></div>
    <form
      @submit.prevent="onSubmit"
      class="fixed bottom-0 bg-white w-full max-w-sm flex py-4 border-t border-gray-300"
    >
      <textarea
        v-model="form.message.val"
        placeholder="発信してみよう"
        class="block appearance-none w-full ml-2 py-3 px-4 rounded-lg border border-gray-400 text-darkGray focus:outline-none focus:bg-white overflow-hidden bg-blue-100"
        name="form.body"
      />
      <button
        :disabled="isValidateError"
        :class="{ 'text-blue': !isValidateError }"
        class="w-2/12 flex items-start justify-center text-gray font-semibold"
      >
        送信
      </button>
    </form>
  </div>
</template>

<script>
export default {
  middleware: ["checkAuth"],
  data() {
    return {
      form: {
        message: {
          val: null,
        },
      },
    };
  },

  computed: {
    isValidateError() {
      return !this.form.message.val;
    },
  },

  methods: {
    async onSubmit() {
      if (this.isValidateError) return;
      const user = await this.$user();

      //未ログインの場合
      if (!user) this.$router.push("/login");
      const roomId = this.$route.params.id;

      // まず未入力チェックを行い、未入力出ない場合は自分のユーザー情報を取得します。
      // user 情報が存在しない場合は未ログイン状態ということなのでログイン画面にリダイレクトさせます。
      // ユーザー情報の取得が完了したら Firestore に登録するチャットデータを準備します。
      //登録データを準備

      // this.$route.params.id で開いているチャットルームの ID を取得しましょう。
      // このチャットページは先程 pages/rooms/_id.vue という名前で作成しました。
      // _からファイル名やディレクトリ名が始まる場合は、実際の画面を表示するときの
      // path は http://3000/rooms/ルームID となります。
      // そのため、 this.$route.params.id のように vueRouter のプロパティからルーム ID が取得可能になります。

      const chat = {
        userld: user.uid,
        name: user.name,
        iconImageUrl: user.iconImageUrl,
        body: this.form.message.val,
        createdAt: this.$firebase.firestore.FieldValue.serverTimestamp(),
      };
      //Firebaseに登録

      try {
        await this.$firestore
          .collection("rooms")
          .doc(roomId)
          .collection("chats")
          .add(chat);
        // チャットのデータはチャットルームの中に保存するので以下のように指定しましょう。
        // set ではなく add とすることで Firestore で UID を自動生成してデータを追加できます。
        this.resetForm(); //フォームをからにして
        this.scrollBottom(); //カーソルを一番下に戻して終了
      } catch (e) {
        this.setMessage({ message: "登録に失敗しました。" });
      }
    },

    scrollBottom() {
      const element = document.documentElement;
      const bottom = element.scrollHeight - element.clientHeight;
      window.scroll(0, bottom);
    },

    resetForm() {
      this.form.message.val = null;
    },
  },
};
</script>