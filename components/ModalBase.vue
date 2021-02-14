<template>
  <transition appear>
    <div
      class="z-10 max-w-sm h-screen w-screen fixed top-0 flex flex-col items-center justify-center modal-wrap"
    >
      <!-- ここにModalの中身が入る -->
      <slot />

      <!-- Modalを閉じるボタン -->
      <button @click="$emit('closeModal')">
        <i class="material-icons text-white text-5xl"> clear </i>
      </button>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style scoped>
/* v-enter-active は要素が追加されている間の style です。
transition: opacity 0.4s ease-out で透明度に対して変化のスピードを調整しています。 */
.v-leave-active,
.v-enter-active {
  transition: opacity 0.4s ease-out;
}

/* v-enter というのが要素が追加される前の style です。
最初は opacity: 0 で Modal は透明にしています。 */
.v-enter,
.v-leave-to {
  opacity: 0;
}

/* v-enter-to は要素が追加された後の style です。 
opacity: 1 で不透明にし、Modal を表示させています。 */
.v-enter-to,
.v-leave {
  opacity: 1;
}
/* 閉じるときは逆の動きをさせたいので
 v-leave という要素が削除されるときの style も一緒に定義しています。 */
</style>


