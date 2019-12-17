<template>
    <div>
        <div class="row search-container">
            <div class="col-5">
                <UncleSearchText v-model="searchText"/>
            </div>
            <div class="col-1">
                <UncleFilterModal ref="filter" v-show="filtersVisible" @initialized='updateFilters' @submit='updateFilters' :filter="filterObject.name" />
            </div>
        </div>
        <div class="list-token">
            <UncleListToken v-show="filtersVisible" @removed='removeToken($event)' :items='tokensList' />
        </div>
        <div class="list-table">
            <UncleListTable v-if="listObject.type == 'table'" :list="listObject.name" :params-object="params"></UncleListTable>
        </div>
    </div>
</template>

<script>
    import { PageComponent } from 'uncle-vue';

    export default {
        extends: PageComponent,
        data() {
            return {
                items: [],
                filters: {},
                searchText: '',
                tokensList: [],
                params: {},
            }
        },
        async created() {
            this.listObject = this.getComponents('List').pop();
            this.filterObject = this.getComponents('Filter').pop();
            if (this.filterObject) {
                this.initializeFilters();
            }
        },
        methods: {
            removeToken(token) {
                if (this.$refs.filter) {
                    this.$refs.filter.removeFilter(token.name);
                    this.loadTokenList();
                    this.loadParams();
                }
            },
            initializeFilters() {
                this.filterFields = this.filterObject.getFields();
                this.filterFieldsMap = this.filterFields.reduce((previous, row) => {
                    previous[row.name] = row;
                    return previous;
                }, {});
                this.filtersVisible = this.filterFields.filter((field) => {
                    return field.type != 'text';
                }).length > 0;
            },
            updateFilters(filterValue) {
                this.filters = filterValue;
                this.loadTokenList();
                this.loadParams();
            },
            loadTokenList() {
                this.tokensList = this.$refs.filter ? this.$refs.filter.getSummary().filter((token) => {
                    return this.filterFieldsMap && this.filterFieldsMap[token.name].type != 'text';
                }) : [];
            },
            loadParams() {
                this.params = this.$refs.filter ? this.$refs.filter.getParams(this.searchText) : {};
                console.log(this.params);
            }
        },
        watch: {
            searchText: async function(val) {
                this.loadParams(val);
            }
        }
    }
</script>

<style>
    .token-box{
        text-align:left;
    }
    .search-container {
        margin-bottom: 20px;
    }
    .list-token {
        margin-bottom: 30px;
    }

    .list-table .card{
        overflow-x: scroll;  
    }
</style>