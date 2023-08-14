<template>
  <div style="position: relative">

    <WindowModal v-if="true" v-model="page2">
      <div>Test</div>
    </WindowModal>
  </div>
</template>

<script setup>
import { ref } from "vue";

import WindowModal from './components/WindowModal.vue'
const page2 = ref({
  width: 200,
  height: 200,
  top: 200,
  left: 300,
  title: "selam",
  onTop: false,
});

</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.w-100 {
  width: 100% !important;
}

.h-100 {
  height: 100% !important;
}

.position-absolute {
  position: absolute !important;
}

.position-relative {
  position: relative !important;
}
</style>