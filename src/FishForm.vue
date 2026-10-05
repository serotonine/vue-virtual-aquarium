<script setup>
import { ref } from "vue";

// v-model.
const fishName = ref(null);

const props = defineProps({
  selectedFish: {
    type: Number || null,
    required: false,
  },
});
const emit = defineEmits(["submit:addFish"]);

const submit = () => {
  if (!props.selectedFish || !fishName.value) {
    return;
  }
  emit("submit:addFish", fishName.value);
  fishName.value = null;
};
</script>
<template>
  <form @submit.prevent="submit()">
    <label
      ><p>Name the fish</p>
      <input
        :class="{ active: selectedFish }"
        type="text"
        name="name"
        value=""
        v-model="fishName"
        @keydown.enter.prevent="submit()"
      />
    </label>
    <button type="submit" class="btn btn-cta m-auto" :disabled="!selectedFish">
      Add Fish
    </button>
  </form>
</template>

<style scoped>
input[type="text"] {
  @apply w-full py-4 px-2 rounded-sm text-blue-950;

  &.active {
    filter: drop-shadow(0 0 15px rgba(119, 244, 255, 1));
  }
}
form {
}
</style>
