<template>
  <div ref="windowModalElement" class="windowElement" tabindex="0" @focus="onElementFocused" :style="getWindowStyle" style=" display: flex; flex-direction: column; ">
    <HeaderComp @minimize="minimize" @expand="expand" @dragging="onHeaderDrag">
      <template v-slot:header>
        <slot name="header"></slot>
      </template>
      <template v-slot:leading>
        <slot name="leading">
          <span style="color: #fff;">{{ page.title }}</span>
        </slot>
      </template>
    </HeaderComp>


    <DragDot v-if="!page.isExpanded && !page.isMinimized" v-model="page" :top="true" :left="true"></DragDot>
    <DragDot v-if="!page.isExpanded && !page.isMinimized" v-model="page" :top="true" :right="true"></DragDot>
    <DragDot v-if="!page.isExpanded && !page.isMinimized" v-model="page" :bottom="true" :left="true"></DragDot>
    <DragDot v-if="!page.isExpanded && !page.isMinimized" v-model="page" :bottom="true" :right="true"></DragDot>

    <div v-if="!page.isMinimized" class="windowBody">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import DragDot from './inner/DragDot.vue';
import HeaderComp from './inner/HeaderComp.vue';
export default {
  components: {
    DragDot,
    HeaderComp
  },
  props: {
    modelValue: {
      default: () => ({
        width: 200,
        height: 200,
        top: 0,
        left: 0,
        onTop: false,
        isExpanded: false,
        isMinimized: false,
      }),
    },
  },
  setup(props, { emit }) {
    const page = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const headerHeight = ref(0);
    const pageHeightTemp = ref(0);

    const onHeaderDrag = (e) => {
      page.value.top = e.top;
      page.value.left = e.left;
    }


    const getWindowStyle = computed(() => {
      const data = {
        top: `${page.value.top}px`,
        left: `${page.value.left}px`,
        width: page.value.width + 'px',
        height: page.value.height + 'px',
        position: 'absolute',
      }
      if (page.value.isExpanded) {
        data['top'] = 0 + 'px';
        data['left'] = 0 + 'px';
        data['width'] = '100%';
        data['height'] = window.innerHeight + 'px';
      }
      if (page.value.isMinimized) {
        // data['top'] = window.innerHeight - headerHeight.value + 'px';
        // data['left'] = window.innerWidth - page.value.width + 'px';
        data['top'] = 'unset';
        data['bottom'] = '0';
        data['left'] = 'unset';
        data['right'] = '0';
        data['position'] = 'fixed !important'
      }
      if (page.value.onTop) {
        data['z-index'] = 101;
      }
      else {
        data['z-index'] = 100;
      }

      return data;
    });


    const minimize = (e) => {
      console.log(e);

      page.value.isMinimized = !page.value.isMinimized;

      if (page.value.isMinimized) {
        headerHeight.value = e;
        pageHeightTemp.value = page.value.height;
        page.value.height = e;
      }
      else {
        page.value.height = pageHeightTemp.value;
      }
      page.value.isExpanded = false;


    }
    const expand = () => {
      page.value.isExpanded = !page.value.isExpanded;

      if (page.value.isMinimized) {
        page.value.isMinimized = false;
        page.value.height = pageHeightTemp.value;
      }
    }

    const closeModal = () => {
      console.log("MODALI KAPAT");
    };



    const onElementFocused = () => {
      console.log("ELEMENT FOCUSED");
    };



    return {
      onElementFocused,
      closeModal,
      page,
      onHeaderDrag,
      minimize,
      expand,
      getWindowStyle
    };
  },
};
</script>

<style scoped>
.dot-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
}

.windowBody {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  flex: 1;
  background: #fff;
}

.windowElement {
  border-radius: 5px;
}
</style>
