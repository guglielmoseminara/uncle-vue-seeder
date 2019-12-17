<template>
    <div>
        <UncleForm :form='formObject.name'/>
    </div>
</template>

<script>
    import { PageComponent } from 'uncle-vue';

    export default {
        extends: PageComponent,
        created() {
            this.formObject = this.getComponents('Form').pop();
        }
    }
</script>