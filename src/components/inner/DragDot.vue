<template>
  <div class="square" ref="squareDOT" :style="getStyle"></div>
</template>
<script setup>
import { defineProps, computed, ref, onMounted, defineEmits, nextTick, onUnmounted } from 'vue';
const squareDOT = ref();
const props = defineProps({
  modelValue: {
    default: () => ({}),
  },
  bottom: {
    default: false,
  },
  top: {
    default: false,
  },
  left: {
    default: false,
  },
  right: {
    default: false,
  },
  minWidth: {
    default: 0
  },
  minHeight: {
    default: 0
  },
});
const emit = defineEmits(['update:modelValue']);
const page = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const size = ref(12);

const getStyle = computed(() => {
  const data = {
    width: size.value + 'px',
    height: size.value + 'px',
  };
  console.log(props.top);
  if (props.top) {
    data['top'] = '-' + size.value / 2 + 'px';
  }
  if (props.bottom) {
    data['bottom'] = '-' + size.value / 2 + 'px';
  }
  if (props.left) {
    data['left'] = '-' + size.value / 2 + 'px';
  }
  if (props.right) {
    data['right'] = '-' + size.value / 2 + 'px';
  }
  if (props.bottom && props.right) {
    data['cursor'] = 'se-resize';
  }

  if (props.bottom && props.left) {
    data['cursor'] = 'sw-resize';
  }
  if (props.top && props.left) {
    data['cursor'] = 'nw-resize';
  }
  if (props.top && props.right) {
    data['cursor'] = 'ne-resize';
  }

  return data
});

const currentPosition = ref({
  x: 0,
  y: 0,
})

const ondragstart = (e) => {
  console.log("DRAG BAŞLADI");
  window.addEventListener('mousemove', onDrag, true);
  window.addEventListener('mouseup', ondragended, true);

  currentPosition.value.x = e.pageX;
  currentPosition.value.y = e.pageY;
}

const removeListeners = () => {
  window.removeEventListener('mousemove', onDrag, true);
  window.removeEventListener('mouseup', ondragended, true);
}
const ondragended = () => {
  removeListeners();
}

const onDrag = (e) => {
  console.log("DRAGGGNG", e.pageX);
  console.log("DRAGGGNG", e.pageY);

  if (page.value.width < props.minWidth) {
    page.value.width = props.minWidth;
    return;
  }
  if (page.value.height < props.minHeight) {
    page.value.height = props.minHeight;
    return;
  }
  if (page.value) {

    const diffX = e.pageX - currentPosition.value.x;
    const diffY = e.pageY - currentPosition.value.y;

    if (props.top) {

      if (props.left) {
        page.value.left += diffX;
        page.value.top += diffY;
        page.value.width -= diffX;
        page.value.height -= diffY;
      }
      else {

        page.value.height -= diffY;
        page.value.width += diffX;
        page.value.top += diffY;
      }
    }
    if (props.bottom) {
      if (props.right) {
        page.value.width += diffX;
        page.value.height += diffY;
      }
      else {
        page.value.left += diffX;
        page.value.width -= diffX;
        page.value.height += diffY;
      }
    }



    currentPosition.value.x = e.pageX;
    currentPosition.value.y = e.pageY;

  }

}

onMounted(() => {
  nextTick(() => {
    squareDOT.value.addEventListener('mousedown', ondragstart, true);
  });
});

onUnmounted(() => {
  if (squareDOT.value) {
    squareDOT.value.removeEventListener('mousedown', ondragstart, true);
  }
  window.removeEventListener('mouseup', ondragended, true);

});
</script>
<style>
.square {
  position: absolute;
}
</style>
