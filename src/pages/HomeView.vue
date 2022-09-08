<template>
  <q-page padding class="row flex flex-center bg-primary text-white">
    <div class="col-12 text-center q-gutter-y-md">
      <div>
        <span>Dolar = {{ dolarToday }}</span> <br/>
        <span>Euro = {{ euroToday }}</span> <br/>
        <span>Bitcoin = {{ bitcoinToday }}</span> <br/>
      </div>
      <hr>
      <div class="row justify-between items-center">
        <q-select outlined v-model="codeSelect" @update:model-value="selectCurrency()" use-input hide-selected fill-input :options="codeOptions">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <span class="text-bold text-h6">Para</span>
        <q-select outlined v-model="codeInSelect" @update:model-value="selectCurrency()" use-input hide-selected fill-input input-debounce="0" :options="codeInOptions">
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
  import userService from 'src/composible/converterService'

  const codeOptions = ([{ label: 'USD', value: '$' }, { label: 'EUR', value: '€' }, { label: 'BRL', value: 'R$' }]);
  const codeInOptions = ref([{ label: 'USD', value: '$' }, { label: 'EUR', value: '€' }, { label: 'BRL', value: 'R$' }]);
  const codeSelect = ref('BRL');
  const codeInSelect = ref('EUR');
  const firstCurrency = ref('');
  const mondayCurrency = ref('');
  const currency = ref('');
  const dolarToday = ref('');
  const euroToday = ref('');
  const bitcoinToday = ref('');

  onMounted(async () => {
    getDolar();
    getEuro();
    getBitcoin();
  });

  const selectCurrency = () => {
    if(codeSelect.value.label && codeInSelect.value.label) {
      let queryRequest = `${codeSelect.value.label}-${codeInSelect.value.label}`
      let queryResponse = queryRequest.replace('-', '');
      converterService.findByCode(queryRequest).then((response) => {
        const {data} = response;
        const currency = data[queryResponse];
      });
    }
  }
  const getDolar = async () => {
    let queryRequest = 'USD-BRL';
    let queryResponse = queryRequest.replace('-', '');
    let dolar = '';
    let currency = [];
    await userService().findByCode(queryRequest).then((response) => {
      const {data} = response;
      currency = data[queryResponse];
      dolar = Number(currency['high']);
      dolarToday.value = dolar;
    }).catch(() => {
      console.log('error');
    });
  }
  const getEuro = async () => {
    let queryRequest = 'EUR-BRL';
    let queryResponse = queryRequest.replace('-', '');
    let euro = '';
    let currency = [];
    await userService().findByCode(queryRequest).then((response) => {
      const {data} = response;
      currency = data[queryResponse];
      euro = Number(currency['high']);
      euroToday.value = euro;
    }).catch(() => {
      console.log('error');
    });
  }
  const getBitcoin = async () => {
    let queryRequest = 'BTC-BRL';
    let queryResponse = queryRequest.replace('-', '');
    let bitcoin = '';
    let currency = [];
    await userService().findByCode(queryRequest).then((response) => {
      const {data} = response;
      currency = data[queryResponse];
      bitcoin = Number(currency['high']);
      bitcoinToday.value = bitcoin;
    }).catch(() => {
      console.log('error');
    });
  }

</script>
