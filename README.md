# VueWindowModal

## Project setup
```
npm i vuewindowmodal
```


### Usage

Import Css

```js
import 'vuewindowmodal/dist/vuewindowmodal.css';
```



In Component
```html
<template>
  <div style="position: relative; ">
    <WindowModal v-if="showWindow" v-model="page">
      <div>
        Body Element
      </div>
    </WindowModal>
  </div>
</template>

<script>
import WindowModal from "vuewindowmodal";

import { ref } from 'vue';

export default {

  components: {
    WindowModal,
  },
  setup() {
    const showWindow = ref(true);
    const page = ref({
      width: 200,
      height: 200,
      top: 0,
      left: 0,
      title: "Hello World",
      onTop: false,
      isMimized: false,
      isExpanded: false,
    });
    return {
      page,
      showWindow
    }
  }
}

</script>

<style></style>

```

### Props
#### modelValue
Type: `Array`<br>
Required: `true`<br>
Default: `null`

Input object of page to windowModal component.
It should not be used without v-model directive:
```javascript

  const page = ref({
      width: 200, //Width Of the Modal (Required)
      height: 200, //Height Of the Modal (Required)
      top: 0, //Top Offset Of the Modal (Required)
      left: 0, //Left Offset Of the Modal (Required)
      title: "Hello World", //Title Of the Modal 
      onTop: false, // is On top of the stack (On multiple modal is used)
      isMimized: false,
      isExpanded: false,  
    });

```


### Slots

#### leading
The `leading` slot is used to display html element in the header.

```html
 <WindowModal v-if="showWindow" v-model="page">
      <template #leading>
        <div>
          Custom Leading Element
        </div>
      </template>
      <div>
        Body Element
      </div>
    </WindowModal>

```

#### header
If you need to customize the `header` slot is used to display html element as header.

```html
 <WindowModal v-if="showWindow" v-model="page">
      <template #header>
        <div>
          Custom Header Element
        </div>
      </template>
      <div>
        Body Element
      </div>
    </WindowModal>

```

