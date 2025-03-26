<template>
    <div style="padding:1%;">
        <section v-for="(item, index) in clothes" :key="index" class="cloth">
            <div>
                <img :src="item.image_url" style="width:250px;"/>
            </div>
            <div style="width:100%; padding:5px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                <section>
                    <span v-if="!item.selected" style="color:red;">Not selected</span>
                    <span v-else style="color:green;">Selected!</span>
                </section>
                <section>
                    <button @click="changeSelection(item.id)" style="border:2px solid black;">Select</button>
                </section>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ShroomyzPage',
    data() {
        return {
            clothes: null
        }
    },
    methods: {
        async changeSelection(id) {
            try {
                const response = await axios.put(`/shroomyz/${id}`);                
                for (let i of this.clothes) {
                    if (i.id == response.data.updatedSelection.id) {
                        i.selected = response.data.updatedSelection.selected;
                        break;
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    async created() {
        if (this.clothes == null) {
            try {
                const response = await axios.get('shroomyz');
                this.clothes = response.data.data;
            }
            catch (error) {
                console.log(error);
            }
        }        
    }
}
</script>

<style scoped>
.cloth {
    display: flex;
    border:2px solid black;
    margin-bottom: 1%;
}
</style>