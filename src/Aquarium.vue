<script setup>
import Fish from "./Fish.vue";
import { isFishFlipped } from "./utils/fishUtility";


const props = defineProps({
  fishes: { type: Object, required: true },
});
const rand = () => Math.floor(Math.random() * 80);
</script>

<template>
  <section class="aquarium">
    <Fish
      v-for="fish in fishes"
      :key="fish.id"
      :fish="fish"
      :inAquarium="true"
      :coords="{left:rand(), top:rand(), flipped: isFishFlipped()}"
      @dead="$emit('dead', fish.id)"
    ></Fish>
  </section>
</template>

<style scoped>
.aquarium {
  @apply col-start-4 col-end-13 bg-blue-400 h-full border-[20px] border-blue-950;
  background-image: url("/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}
</style>
