<script setup>
import { ref, reactive, computed } from "vue";
import Aquarium from "./Aquarium.vue";
import Fish from "./Fish.vue";
import FishForm from "./FishForm.vue";

// Reactive && ref.
// Initial.
const fishes = reactive([
  { id: 1, image: "/golden-purple-fish.png" },
  { id: 2, image: "/goldfish.png" },
  { id: 3, image: "/guppie.png" },
  { id: 4, image: "/tropical-fish.png" },
  { id: 5, image: "/tuna.png" },
]);
// Fishes into the aquarium.
// { id: 1, image: "/golden-purple-fish.png", name:"" },
const aquariumFishes = reactive([]);
// Select fish in aside.
const selectedFish = ref(null);
const aquariumRate = ref({
  nbFish:0,
  nbDeadFishes:0,
})

// Computed.

// Functions.

// Aside.
const reset = () => {
  selectedFish.value = null;
};
const setSelectedFish = (data) => {
  selectedFish.value = Number(data);
};
const isSelected = (id) => selectedFish.value === id;
//Aquarium.
const addFishToAquarium = (name) => {
  const newFish = fishes.find((fish) => fish.id === selectedFish.value);
  if (!newFish) {
    return;
  }
  aquariumFishes.push({ ...newFish, id: Date.now(), name });
  aquariumRate.value.nbFish++;
  reset();
};
const removeFishFromAquarium = (id) => {
setTimeout(() => {
    const index = aquariumFishes.findIndex((fish) => fish.id === id);
    aquariumFishes.splice(index, 1);
    aquariumRate.value.nbDeadFishes++;
  }, 800);
};
</script>
<template>
  <main class="grid grid-cols-12 grid-rows-1 w-screen h-screen">
    <section
      class="col-start-1 col-end-4 bg-blue-950 text-blue-50 h-full py-4 px-6"
    >
      <div class="panel flex gap-3 flex-wrap items-center justify-center">
        <fish
          v-for="fish in fishes"
          :key="fish.id"
          :fish="fish"
          @select:fish="setSelectedFish"
          :isSelected="isSelected(fish.id)"
        ></fish>
      </div>
      <fish-form
        class="w-full m-auto py-10"
        :selected-fish="selectedFish"
        @submit:add-fish="addFishToAquarium"
      ></fish-form>
      <section class="aquarium-rate text-center"><p>{{ `Dead Fishes : ${aquariumRate.nbDeadFishes} /  ${aquariumRate.nbFish}` }}</p></section>
    </section>
    <aquarium
      :fishes="aquariumFishes"
      @dead="removeFishFromAquarium"
    ></aquarium>
  </main>
</template>
