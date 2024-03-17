<template>
    <div style="display:flex; flex-direction:column; padding-top: 20px; text-align:center;" >
        <img src="https://easypaytestblobstorage.blob.core.windows.net/photos/transparent_money.gif" style="width:275px; margin:auto;" class="pop-up"/>
        <h1 class="pop-up">Your payment was successful!</h1>
        <h4 class="pop-up">Your seller will email your receipt.</h4>
    </div>
</template>

<script>
export default {
    name: 'ReceiptPage'
}
</script>

<style scoped>
    @keyframes popUp {
        from {
            opacity:0; 
            transform: translateY(100%);
        }
        to {
            opacity:1;
            transform: translateY(0);
        }
    }
    .pop-up {
        animation: popUp 1s forwards;
    }
</style>