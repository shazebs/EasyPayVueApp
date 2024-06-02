<template>
    <div>
      <ul>
        <transition-group name="chat" tag="section">
          <section v-for="(item, index) in items" :key="index">
            ID: {{ index }}, Name: {{ item.name }}
          </section>
        </transition-group>
      </ul>
      <form @submit.prevent="addItem">
        <input v-model="newItem.name" placeholder="Enter name" required />
        <button type="submit">Add Item</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' }
        ],
        newItem: {
          name: ''
        }
      };
    },
    methods: {
      addItem() {
        const newId = this.items.length + 1;
        const newItem = { id: newId, name: this.newItem.name };
        this.items.push(newItem);
        this.newItem.name = ''; // Clear the input field
      }
    }
  };
  </script>
  
  <style>
  /* Define the transition classes for chat */
  .chat-enter-active, .chat-leave-active {
    transition: all 0.5s ease;
  }
  .chat-enter-from, .chat-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  </style>
  