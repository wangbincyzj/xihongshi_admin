<template>
    <div id="app" >
        <router-view/>
    </div>


</template>

<script>
    import {getHomeInfo} from "@/network/home";

    export default {
        name: "App",
        created() {
            this.initHomeInfo()
        },
        methods:{
            initHomeInfo() {
                getHomeInfo().then(ret=>{
                    this.$store.state.homeInfo = ret.data
                })
            }
        }
    }
</script>

<style lang="scss">

</style>
