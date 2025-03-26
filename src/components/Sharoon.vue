<template>
    <div style="padding:1%;">
        <section style="margin: 1% 0;">
            <button v-if="showAll" @click="showAll = !showAll">Show Selected Only</button>
            <button v-else @click="showAll = !showAll">Show All</button>
        </section>

        <section v-for="(item, index) in showAll ? clothes : clothes.filter(x => x.selected)" :key="index" class="cloth">
            <div>
                <img :src="item.image_url" style="width:100%; max-width:650px;"/>
            </div>
            <div style="width:auto; padding:5px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                <!-- change selection status -->
                <section>
                    <span>{{ index+1 }}. </span>
                    <span v-if="!item.selected" style="color:red;">Not selected</span>
                    <span v-else style="color:green;">Selected!</span>
                </section>
                <!-- change selection button -->
                <section>
                    <button @click="changeSelection(item.id)">Select</button>
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
            clothes: null,
            selectedClothes: null,
            showAll: true
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

button {
    border:2px solid black;
}
</style>