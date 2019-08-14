<template>
    <div id="#app" class="app">
        <h1 class="title">This is Webpack+Vue Demo!</h1>
        <!-- <img src="../static/images/qrcode.png" alt=""> -->
    </div>
</template>
<script>

export default {
    name: "App",
    data () {
        return {
        };
    },
    created(){
        console.log('hahahh')
    }
}
</script>
<style lang="less" scoped>
.app{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background:transparent;
    background-image: url(../static/images/2.jpeg);
    background-size: cover;
    h1{
        color:green;
    }
}

</style>