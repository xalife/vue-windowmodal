<template>
  <div style="position: relative">
    <button @click="isModal1Open = true">OPEN MODAL 1</button>
    <button @click="isModal1Open = false">CLOSE MODAL 1</button>

    <button @click="isModal2Open = true">OPEN MODAL 2</button>
    <button @click="isModal2Open = false">CLOSE MODAL 2</button>
    <WindowModal v-if="isModal1Open" ref="windowModalObject" :element-index="1" v-model="page1">

      <div>İLK MODAL</div>
    </WindowModal>

    <WindowModal v-if="isModal2Open" ref="windowModalObject" :element-index="1" v-model="page2">


      <div>İKİNCİ MODAL</div>
    </WindowModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import WindowModal from "@/components/WindowModal";
const page1 = ref({
  width: 200,
  height: 200,
  top: 0,
  left: 0,
  title: "selam",
  onTop: true,
});

const page2 = ref({
  width: 200,
  height: 200,
  top: 200,
  left: 300,
  title: "selam",
  onTop: false,
});
const windowModalObject = ref();

const isModal1Open = ref(true);
const isModal2Open = ref(true);
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