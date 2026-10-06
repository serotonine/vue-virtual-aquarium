<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { fishAnim, isFishFlipped } from "./utils/fishUtility";
const props = defineProps({
  fish: { type: Object, required: true },
  name: { type: String, required: false },
  coords: { type: Object, required: false },
  inAquarium: { type: Boolean, required: false },
  isSelected: { type: Boolean, required: false },
});
const emit = defineEmits(["select:fish", "dead"]);
// ref
const isInAquarium = ref(props.inAquarium);
const starvingRate = ref(0);
// Size of the figure.
const figure = ref(null);
// Animation
const coords = ref({
  ...props.coords,
  toTop: isFishFlipped(),
  speed: Math.random(),
});
// Computed.
const isStarving = computed(
  () => starvingRate.value > 95 && starvingRate.value < 100,
);

const progressClass = computed(() => {
  if (starvingRate.value > 45 && starvingRate.value <= 75) {
    return "warning";
  } else if (starvingRate.value > 75) {
    return "danger";
  } else {
    return "cool";
  }
});
// Functions.
const selectFish = () => {
  emit("select:fish", props.fish.id);
};
const maxTop = (h,ph)=> h - ph;

// Feeding.
const feedFish = () => (starvingRate.value = 0);
let hungry, move;
onMounted(() => {
  if (props.inAquarium) {
    const ph = figure.value.children[0].offsetHeight;
    const { width, height } = figure.value.getBoundingClientRect();
    coords.value = { ...coords.value, width, height: maxTop(height,ph) };

    hungry = setInterval(() => {
      if (starvingRate.value < 100) {
        starvingRate.value++;
      } else {
        clearInterval(hungry);
        clearInterval(move);
        isInAquarium.value = false;
        emit("dead");
      }
    }, 200);
    // Animation.
    move = setInterval(() => {
      coords.value = fishAnim(coords.value);
    }, 100);
  }
});
onUnmounted(() => {
  clearInterval(hungry), clearInterval(move);
});
</script>

<template>
  <figure
    @click="selectFish()"
    :class="[{ active: isSelected }, { 'in-aquarium': isInAquarium }]"
    class="fish"
    :style="[
      coords && { left: `${coords.left}%` },
      coords && { top: `${coords.top}%` },
    ]"
    ref="figure"
  >
    <p class="fish_warning" :class="[isStarving ? 'visible' : 'invisible']">
      Feed Me!
    </p>
    <img
      :src="fish.image"
      :alt="`fish-${fish.id}`"
      :class="coords?.flipped && 'flipped'"
      @click="feedFish"
      v-if="starvingRate < 100"
    />
    <img src="/dead.png" :alt="`${fish.name} is dead.`" v-else />
    <figcaption v-if="fish.name">{{ fish.name }}</figcaption>
    <progress
      v-if="isInAquarium"
      :value="starvingRate"
      max="100"
      :class="progressClass"
    ></progress>
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
  &.flipped {
    transform: scaleX(-1);
  }
}
figcaption {
  @apply rounded-sm bg-slate-800/80 text-white text-sm text-center p-1;
}
progress {
  appearance: none;
  width: 100%;
  height: 1em;
  border: none;
  overflow: hidden;
  background-color: white;
}
progress::-webkit-progress-bar {
  background-color: white;
}
/* Cool */
progress.cool::-webkit-progress-value {
  background-color: green;
  transition: width 0.2s linear;
}
progress.cool::-moz-progress-bar {
  background-color: green;
}
/* Warning */
progress.warning::-webkit-progress-value {
  background-color: orange;
  transition: width 0.2s linear;
}
progress.warning::-moz-progress-bar {
  background-color: orange;
}
/* Danger */
progress.danger::-webkit-progress-value {
  background-color: red;
  transition: width 0.2s linear;
}
progress.danger::-moz-progress-bar {
  background-color: red;
}

.fish_warning {
  @apply bg-white text-center text-sm rounded-lg;
}
/* Aquarium */
.in-aquarium {
  position: absolute;
  transition:
    left 0.1s linear,
    top 0.1s linear;
}
</style>
