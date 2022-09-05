<template>
  <q-page padding class="row flex flex-center">
    <div class="col-12 text-center q-gutter-y-md">
      <div class="row justify-between items-center">
        <q-select outlined v-model="codeSelect" @input="selectCurrency()" use-input hide-selected fill-input :options="codeOptions">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <span class="text-bold text-h6">Para</span>
        <q-select outlined v-model="codeInSelect" use-input hide-selected fill-input input-debounce="0" :options="codeInOptions">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <q-input :prefix="codeSelect.value" v-model="firstCurrency" outlined dense />
      <q-input :prefix="codeInSelect.value" v-model="mondayCurrency" outlined dense />
    </div>
  </q-page>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import currencyService from 'src/services/currencyService.js'

  const codeOptions = ([{ label: 'USD', value: '$' }, { label: 'EUR', value: '€' }, { label: 'BRL', value: 'R$' }]);
  const codeInOptions = ref([{ label: 'USD', value: '$' }, { label: 'EUR', value: '€' }, { label: 'BRL', value: 'R$' }]);
  const codeSelect = ref('BRL');
  const codeInSelect = ref('EUR');
  const firstCurrency = ref('');
  const mondayCurrency = ref('');

  onMounted(() => {
    selectCurrency();
  });

  const selectCurrency = () => {
    if(codeSelect.value && codeInSelect.value) {
      let queryRequest = `${codeSelect.value}-${codeInSelect.value}`
      let queryResponse = codeSelect.value + codeInSelect.value
      currencyService.findByCode(queryRequest).then((response) => {
        console.log(response.data[`${queryResponse}`]);
      });
    }
  }

</script>
