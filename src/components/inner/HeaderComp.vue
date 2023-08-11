<template>
    <div ref="moveWindowModalButton">
        <slot name="header">
            <div class="w-full d-flex justify-content-between px-2 rounded-top align-items-center" style="
        background: #1e1e2d;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 10px;
        border-radius: 5px 5px 0 0;
        padding-right: 10px;">
                <div class="flex align-items-center">
                    <i class="me-3 bi bi-arrows-move"></i>
                    <slot name="leading"></slot>
                </div>

                <div @click="$emit('minimize', moveWindowModalButton.clientHeight)" style="margin-left:auto;">
                    <span style="color: #ffffff;cursor: pointer;">
                        −
                    </span>
                </div>
                <div @click="$emit('expand')" style="margin-left:10px;">
                    <span style="color: #ffffff;cursor: pointer; font-size: 12px;">
                        ▢
                    </span>
                </div>
            </div>
        </slot>
    </div>
</template>

<script setup>

import { onMounted, nextTick, onBeforeUnmount, defineEmits, ref } from "vue";



const emit = defineEmits(['dragging']);

const moveWindowModalButton = ref();


const offset = ref([0, 0]);
const isDown = ref(false);
const onDragStarted = (e) => {
    window.addEventListener("mouseup", onDragEnded, true);
    window.addEventListener("mousemove", onDrag, true);

    console.log(moveWindowModalButton.value.parentElement);
    isDown.value = true;
    offset.value = [
        moveWindowModalButton.value.parentElement.offsetLeft - e.clientX,
        moveWindowModalButton.value.parentElement.offsetTop - e.clientY,
    ];

};

const onDragEnded = () => {
    window.removeEventListener("mouseup", onDragEnded, true);
    window.removeEventListener("mousemove", onDrag, true);
    isDown.value = false;
};


const onDrag = (e) => {
    e.preventDefault();

    if (isDown.value) {
        const leftValue = e.clientX + offset.value[0];
        const topValue = e.clientY + offset.value[1];


        emit('dragging', {
            top: topValue,
            left: leftValue
        })
    }
};

onMounted(() => {

    nextTick(() => {
        moveWindowModalButton.value.addEventListener(
            "mousedown",
            onDragStarted,
            true
        );
    });
});
onBeforeUnmount(() => {
    moveWindowModalButton.value.removeEventListener(
        "mousedown",
        onDragStarted,
        true
    );
});
</script>