<template>

<div style='padding:1%; margin-top:16px;'>
  <div class="letters-container">
    <span
      v-for="(letter, index) in letters"
      :key="index"
      :class="{'bounce': animatedLetters.includes(index)}"
    >
      {{ letter }}
    </span>
  </div>
  <button @click="stopAnimation">Stop Animation</button>
  
  <br/>
  <h3>Food Places</h3>
  <ul>
    <li v-for="(foodPlace, foodPlace_index) in getFoodPlaces()" :key="foodPlace_index">{{ foodPlace }}</li>
  </ul>

</div>
</template>
  
<script>
export default {
  data() {
    return {
      text: "Bouncing Letters",
      letters: [],
      animatedLetters: [],
      animationInterval: null,
      isAnimating: true,
    };
  },
  mounted() {
    this.initializeLetters();
    this.startAnimation();
  },
  beforeUnmount() {
    this.stopAnimation();
  },
  methods: {
    initializeLetters() {
      this.letters = this.text.split("");
    },
    startAnimation() {
      this.isAnimating = true;
      this.animateLetters();
    },
    animateLetters() {
      this.animatedLetters = [];

      this.letters.forEach((letter, index) => {
        setTimeout(() => {
          if (this.isAnimating) {
            this.animatedLetters.push(index);
          }
        }, index * 100); // Adjust the delay as needed
      });

      this.animationInterval = setTimeout(() => {
        if (this.isAnimating) {
          this.animateLetters();
        }
      }, this.letters.length * 150); // Adjust the delay to match the animation duration
    },
    stopAnimation() {
      this.isAnimating = false;

      clearTimeout(this.animationInterval);
    },

    getFoodPlaces() 
    {
      const FoodPlaces = [
        "McDonald's",
        "Jack in the Box",
        "Pieology",
        "Chipotle",
        "Panda Express",
        "Popeye's"
      ];

      const Foods = [
        '(Flatbread) Chapati Roti',
        '(Flatbread) Paratha (Minemeat, Aloo, Mooli)',
        '(Chicken) Karahi',
        '(Red Lentils) Masoor Ki Daal / Tarka Daal',
        'Pakoras',
        'Kebabs (Shami, Chapli, Seekh)',
        'Biryani (Chicken, Beef, Lamb)',
        'Nihari (Beef, Lamb, Mutton(Sheep))',
        'Karela (Bitter Melon)',
        'Aloo Gobi (Potato, Cauliflower)',
      ];

      console.log(Foods);

      return FoodPlaces;
    },
  },
};
</script>

<style scoped>
.letters-container {
  display: flex;
  gap: 5px; /* Adjust spacing between letters as needed */
}

.bounce {
  animation: bounce 0.5s ease-in-out;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px); /* Adjust the bounce height as needed */
  }
}
</style>
