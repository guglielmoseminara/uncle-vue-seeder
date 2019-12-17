<template>
    <div>
        <UncleForm v-if="formObject" :form='formObject.name' :params="params"/>
        <UncleSummary v-if="summaryObject" :summary='summaryObject.name' :params="params"/>
    </div>
</template>

<script>
    import { PageComponent } from 'uncle-vue';

    export default {
        extends: PageComponent,
        created() {
            this.formObject = this.getComponents('Form').pop();
            this.summaryObject = this.getComponents('Summary').pop();
            this.params = this.$route.params;
        }
    }
</script>