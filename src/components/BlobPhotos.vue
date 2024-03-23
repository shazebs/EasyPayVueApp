<template>
    <div class="photos-container">
        <div v-for="(url, index) in photo_urls" :key="index" class="photo-box" style="word-wrap:break-word; max-width:200px;">
            <h3>#{{ index }}) {{ url }}</h3>
            <img :src="url" />
        </div>        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'BlobPhotos',
    data() {
        return {
            photo_urls: []
        }
    },
    async created() {
        try {
            const response = await axios.get('images'); 
            this.photo_urls = response.data.photo_urls;
        }
        catch (error) {
            console.error('Error fetching blob storage photo URLs:', error);
        }
    }
}
</script>

<style scoped>
    img {
        width:200px;
        height:auto;
    }
    .photos-container {
        display:flex;
        flex-wrap:wrap;
    }
    .photo-box {
        border:1px solid black;
    }
</style>