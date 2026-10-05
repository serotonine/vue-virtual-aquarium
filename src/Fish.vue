<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Aquarium from "./Aquarium.vue";
const props = defineProps({
  fish: { type: Object, required: true },
  name: { type: String, required: false },
  inAquarium: { type: Boolean, required: false },
  isSelected: { type: Boolean, required: false },
});
const emit = defineEmits(["select:fish", "dead"]);
// ref
const isInAquarium = ref(props.inAquarium);
const starvingRate = ref(0);
// Computed.
const isStarving = computed(
  () => starvingRate.value > 95 && starvingRate.value < 100,
);
const progressClass = computed(()=> {
  if (starvingRate.value > 35 && starvingRate.value <= 65){return 'warning'}
  else if(starvingRate.value > 65){return 'danger'}
  else return 'cool'

})
// Functions.
const selectFish = () => {
  emit("select:fish", props.fish.id);
};
// Animation

// Feeding.
const feedFish = () => (starvingRate.value = 0);
let hungry;
onMounted(() => {
  if (props.inAquarium) {
    hungry = setInterval(() => {
      if (starvingRate.value < 100) {
        starvingRate.value++;
      } else {
        clearInterval(hungry);
        isInAquarium.value = false;
        emit("dead");
      }
    }, 200);
  }
});
onUnmounted(() => clearInterval(hungry));
</script>

<template>
  <figure
    @click="selectFish()"
    :class="[{ active: isSelected }, { 'in-aquarium': isInAquarium }]"
    class="fish"
  >
    <p class="fish_warning" :class="[isStarving ? 'visible':'invisible']">Feed Me!</p>
    <img
      :src="fish.image"
      :alt="`fish-${fish.id}`"
      @click="feedFish"
      v-if="starvingRate < 100"
    />
    <img src="/dead.png" :alt="`${fish.name} is dead.`" v-else />
    <figcaption v-if="fish.name">{{ fish.name }}</figcaption>
    <progress v-if="isInAquarium" :value="starvingRate" max="100" :class="progressClass"></progress>
  </figure>
</template>

<style scoped>
figure {
  width: 120px;
  cursor: grab;
}
figure.active > img {
  filter: drop-shadow(0 0 6px rgba(119, 244, 255, 1));
}
img {
  width: 100%;
  height: auto;
}
figcaption {
  @apply rounded-sm bg-slate-800/80 text-white text-sm text-center p-1;
}
progress {
  appearance: none;
  width: 100%;
  height: 1em;;
  border: none;
  overflow: hidden;
  background-color: white;
}
progress::-webkit-progress-bar {
  background-color:white;
}
progress::-webkit-progress-value {
  background-color: #f87171;
  transition: width 0.2s linear;
}
progress::-moz-progress-bar {
  background-color: #f87171;
}


.fish_warning {
  @apply bg-white text-center text-sm;
}
/* Aquarium */
.in-aquarium {
  position: absolute;
}
</style>
