<template>
  <div class="main-content-container container-fluid m-0 p-0">
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-body>
            <div class="meta-table">
              <vue-good-table
                :columns="columns" :rows="calcList"
                :search-options="{
                  enabled: true
                }">
                <div slot="table-actions">
                  <router-link to="/calc-add">
                    <button type="button" class="btn btn-outline-primary btn-sm mr-2">
                      + Новый расчет
                    </button>
                  </router-link>
                  <d-button size="sm" class="btn-outline-info btn-sm mr-1" >
                    <download-excel :data="releaseSources" title="Список черновых расчетов" :exportFields="json_fields"
                                    name="emissioncalcsactual.xls">
                      <i class="fa fa-download"></i>
                    </download-excel>
                  </d-button>
<!--                  <button class="btn btn-outline-primary btn-sm mr-2" v-d-tooltip.hover="'Выгрузить Excel'">-->
<!--                    <i class="fa fa-download"></i>-->
<!--                  </button>-->
                </div>
                <div slot="child_row" slot-scope="props">
                  <table class="meta-table">
                    <thead>
                    <tr>
                      <th>Код ЗВ</th>
                      <th>Наименование ЗВ </th>
                      <th>Выбросы, г/сек</th>
                      <th>Выбросы, т/год </th>
                    </tr>
                    </thead>
                    <tr v-for="item in props.row.pollutants" :key="item.code">
                      <td data-label="Код ЗВ:">{{ item.code }}</td>
                      <td data-label="Наименование ЗВ:">{{ item.name }}</td>
                      <td data-label="Выбросы, г/сек:">{{ item.gseccoef  }}</td>
                      <td data-label="Выбросы, т/год:">{{ item.tyearcoef }}</td>
                    </tr>
                  </table>
                </div>
              </vue-good-table>
            </div>
          </d-card-body>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-alert */
import '@/assets/scss/vue-tables.scss';
import { mapState } from 'vuex';

export default {
  components: {

  },
  data() {
    return {
      releaseSources: [],
      pageerrors: [],
      columns: [
        {
          label: 'Наименование ист.выделения',
          field: 'releaseSourceName',
        },
        {
          label: 'Тип расчета',
          field: 'calcType',
        },
        {
          label: 'Выбросы г/сек',
          field: 'gsecTotal',
        },
        {
          label: 'Выбросы т/год',
          field: 'tyearTotal',
        },
        {
          label: 'Период c',
          field: 'periodfrom',
        },
        {
          label: 'Период по',
          field: 'periodto',
        },
      ],
      calcList: [
        {
          id: 1,
          releaseSourceName: 'CAT 6334 6',
          calcType: 'Черновик',
          gsecTotal: '0.006961289999999999',
          tyearTotal: '0.40563666666666676',
          periodfrom: '2020-03-17T00:00:00.000+06:00\t',
          periodto: '2021-03-17T23:59:59.999+06:00\n',
        },
        {
          id: 2,
          releaseSourceName: 'CAT 1334 1',
          calcType: 'Черновик',
          gsecTotal: '0.40205007857142866',
          tyearTotal: '0.4528030413888889',
          periodfrom: '',
          periodto: '',
        },
        {
          id: 3,
          releaseSourceName: 'CAT 3334 3',
          calcType: 'Фактический',
          gsecTotal: '144.6480389',
          tyearTotal: '402.9602542',
          periodfrom: '2020-03-17T00:00:00.000+06:00',
          periodto: '2021-03-17T23:59:59.999+06:00\n',
        },
      ],

      // this part related to excel export - uncomment
      json_fields: {
        'Наименование ист.выделения': 'releaseSourceName',
      },
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
      tableOptions: {
        headings: {
          releaseSourceName: 'Наименование ист.выделения',
          calcType: 'Тип расчета',
          gsecTotal: 'Выбросы г/сек',
          tyearTotal: 'Выбросы т/год',
          'period.from': 'Период c',
          'period.to': 'Период по',
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: 'transaction-history table data-table',
        filterable: ['calcType', 'releaseSourceName', 'tyearTotal', 'gsecTotal'],
        sortable: ['releaseSourceName', 'calcType', 'tyearTotal', 'gsecTotal', 'period.from', 'period.to'],
        sortIcon: {
          base: 'fas float-right mt-1 text-muted',
          up: 'fa-caret-up',
          down: 'fa-caret-down',
        },
        texts: {
          filterPlaceholder: 'Введите текст для поиска',
          limit: 'Записей',
          filter: 'Поиск',
          noResults: 'Нет подходящих записей',
          loading: 'Идет загрузка...',
          page: 'Стр.:',
          filterBy: 'Фильтровать по {column}',
          count: 'Отображение с {from} по {to} из {count} записей|{count} записей | Запись',
        },
        pagination: {
          edge: true,
          nav: 'scroll',
        },
      },
    };
  },
  // computed: {
  //   ...mapState('calcStore', ['calcList']),
  // },
  methods: {
    getTypeRus(value) {
      // eslint-disable-next-line no-nested-ternary
      return value === 'draft' ? 'Черновик' : value === 'actual' ? 'Фактический' : 'Лимит';
    },
    getStatusClass(sourceType) {
      const map = {
        organized: 'warning',
        unorganized: 'success',
      };
      return `text-${map[sourceType]}`;
    },
    sendReminderResponsible() {
      this.timeUntilDismissed = this.duration;
    },
  },
};

</script>




<!--<template>-->
<!--  <div class="main-content-container container-fluid m-0 p-0">-->
<!--    <div class="row">-->
<!--      <div class="col">-->
<!--        <div class="card card-small overflow-hidden mb-4 meta">-->
<!--          <d-card-body>-->
<!--            <div class="block-handle mt-2" align="right">-->
<!--              <d-button size="mx" class="btn-info btn-sm mb-2" v-d-tooltip.hover="'Выгрузить Excel'">-->
<!--                  <div class="material-icons">download</div>-->
<!--              </d-button>-->
<!--            </div>-->
<!--            <div class="meta-table">-->
<!--              <vue-good-table-->
<!--                :columns="columns" :rows="rows"-->
<!--                :search-options="{-->
<!--                  enabled: true-->
<!--                }">-->
<!--              >-->
<!--              </vue-good-table>-->
<!--            </div>-->
<!--          </d-card-body>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--/* eslint-disable no-alert */-->
<!--// import { ClientTable } from 'vue-tables-2';-->
<!--import 'vue-good-table/dist/vue-good-table.css';-->
<!--import { VueGoodTable } from 'vue-good-table';-->
<!--import '@/assets/scss/vue-tables.scss';-->
<!--// import { mapState } from 'vuex';-->

<!--export default {-->
<!--  components: {-->
<!--    VueGoodTable-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      releaseSources: [],-->
<!--      pageerrors: [],-->
<!--      columns: [-->
<!--        {-->
<!--          label: 'Наименование ист.выделения',-->
<!--          field: 'releaseSourceName',-->
<!--        },-->
<!--        {-->
<!--          label: 'Тип расчета',-->
<!--          field: 'calcType',-->
<!--        },-->
<!--        {-->
<!--          label: 'Выбросы г/сек',-->
<!--          field: 'gsecTotal',-->
<!--        },-->
<!--        {-->
<!--          label: 'Выбросы т/год',-->
<!--          field: 'tyearTotal',-->
<!--        },-->
<!--        {-->
<!--          label: 'Период c',-->
<!--          field: 'periodfrom',-->
<!--        },-->
<!--        {-->
<!--          label: 'Период по',-->
<!--          field: 'periodto',-->
<!--        },-->
<!--      ],-->
<!--      rows: [-->
<!--        {-->
<!--          id: 1,-->
<!--          releaseSourceName: 'CAT 6334 6',-->
<!--          calcType: 'Черновик',-->
<!--          gsecTotal: '0.006961289999999999',-->
<!--          tyearTotal: '0.40563666666666676',-->
<!--          periodfrom: '2020-03-17T00:00:00.000+06:00\t',-->
<!--          periodto: '2021-03-17T23:59:59.999+06:00\n',-->
<!--        },-->
<!--        {-->
<!--          id: 2,-->
<!--          releaseSourceName: 'CAT 1334 1',-->
<!--          calcType: 'Черновик',-->
<!--          gsecTotal: '0.40205007857142866',-->
<!--          tyearTotal: '0.4528030413888889',-->
<!--          periodfrom: '',-->
<!--          periodto: '',-->
<!--        },-->
<!--        {-->
<!--          id: 3,-->
<!--          releaseSourceName: 'CAT 3334 3',-->
<!--          calcType: 'Фактический',-->
<!--          gsecTotal: '144.6480389',-->
<!--          tyearTotal: '402.9602542',-->
<!--          periodfrom: '2020-03-17T00:00:00.000+06:00',-->
<!--          periodto: '2021-03-17T23:59:59.999+06:00\n',-->
<!--        },-->
<!--      ],-->
<!--      // tableOptions: {-->
<!--      //   headings: {-->
<!--      //     releaseSourceName: 'Наименование ист.выделения',-->
<!--      //     calcType: 'Тип расчета',-->
<!--      //     gsecTotal: 'Выбросы г/сек',-->
<!--      //     tyearTotal: 'Выбросы т/год',-->
<!--      //     periodfrom: 'Период c',-->
<!--      //     periodto: 'Период по',-->
<!--      //   },-->
<!--      //   perPage: 10,-->
<!--      //   recordsPerPage: [10, 25, 50, 100],-->
<!--      //   skin: 'transaction-history table data-table',-->
<!--      //   filterable: ['calcType', 'releaseSourceName', 'tyearTotal', 'gsecTotal'],-->
<!--      //   sortable: ['releaseSourceName', 'calcType', 'tyearTotal', 'gsecTotal', 'period.from', 'period.to'],-->
<!--      //   sortIcon: {-->
<!--      //     base: 'fas float-right mt-1 text-muted',-->
<!--      //     up: 'fa-caret-up',-->
<!--      //     down: 'fa-caret-down',-->
<!--      //   },-->
<!--      //   texts: {-->
<!--      //     filterPlaceholder: 'Введите текст для поиска',-->
<!--      //     limit: 'Записей',-->
<!--      //     filter: 'Поиск',-->
<!--      //     noResults: 'Нет подходящих записей',-->
<!--      //     loading: 'Идет загрузка...',-->
<!--      //     page: 'Стр.:',-->
<!--      //     filterBy: 'Фильтровать по {column}',-->
<!--      //     count: 'Отображение с {from} по {to} из {count} записей|{count} записей | Запись',-->
<!--      //   },-->
<!--      //   pagination: {-->
<!--      //     edge: true,-->
<!--      //     nav: 'scroll',-->
<!--      //   },-->
<!--      // },-->
<!--    };-->
<!--  },-->
<!--  // computed: {-->
<!--  //   ...mapState('calcStore', ['calcList']),-->
<!--  // },-->
<!--  // methods: {-->
<!--  //   getTypeRus(value) {-->
<!--  //     // eslint-disable-next-line no-nested-ternary-->
<!--  //     return value === 'draft' ? 'Черновик' : value === 'actual' ? 'Фактический' : 'Лимит';-->
<!--  //   },-->
<!--  //   getStatusClass(sourceType) {-->
<!--  //     const map = {-->
<!--  //       organized: 'warning',-->
<!--  //       unorganized: 'success',-->
<!--  //     };-->
<!--  //     return `text-${map[sourceType]}`;-->
<!--  //   },-->
<!--  //   sendReminderResponsible() {-->
<!--  //     this.timeUntilDismissed = this.duration;-->
<!--  //   },-->
<!--  // },-->
<!--};-->

<!--</script>-->
