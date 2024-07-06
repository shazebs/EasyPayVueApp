<template>
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
</template>

<script>
export default {
  data() {
    return {
      text: 'Bouncing Letters',
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
      this.letters = this.text.split('');
    },
    startAnimation() {
      this.isAnimating = true;
      this.animateLetters();
    },
    animateLetters() 
    {
      this.animatedLetters = [];

      this.letters.forEach((letter, index) => {
        setTimeout(() => 
        {
          if (this.isAnimating) 
          {
            this.animatedLetters.push(index);
          }
        }, index * 100); // Adjust the delay as needed
      });

      this.animationInterval = setTimeout(() => 
      {
        if (this.isAnimating) 
        {
          this.animateLetters();
        }
      }, this.letters.length * 150); // Adjust the delay to match the animation duration
    },
    stopAnimation() 
    {
      this.isAnimating = false;

      clearTimeout(this.animationInterval);
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
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px); /* Adjust the bounce height as needed */
  }
}
</style>
