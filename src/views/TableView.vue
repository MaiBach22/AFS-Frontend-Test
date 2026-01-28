<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import InputNumber from 'primevue/inputnumber'
import { Row } from 'primevue'

interface Fruit {
  id: string
  name: string
  category: string
  color: string
  calories: number
  sugar: number
  price: number
}

type Totals = Pick<Fruit, 'calories' | 'sugar' | 'price'>

const fruits = ref<Fruit[]>([
  {
    id: '1',
    name: 'Apple',
    category: 'Pome',
    color: 'Red',
    calories: 52,
    sugar: 10.4,
    price: 1.29,
  },
  {
    id: '2',
    name: 'Banana',
    category: 'Berry',
    color: 'Yellow',
    calories: 89,
    sugar: 12.2,
    price: 0.49,
  },
  {
    id: '3',
    name: 'Orange',
    category: 'Citrus',
    color: 'Orange',
    calories: 47,
    sugar: 9.4,
    price: 0.99,
  },
  {
    id: '4',
    name: 'Strawberry',
    category: 'Berry',
    color: 'Red',
    calories: 33,
    sugar: 4.9,
    price: 2.99,
  },
  {
    id: '5',
    name: 'Blueberry',
    category: 'Berry',
    color: 'Blue',
    calories: 57,
    sugar: 9.7,
    price: 3.99,
  },
  {
    id: '6',
    name: 'Mango',
    category: 'Drupe',
    color: 'Yellow',
    calories: 60,
    sugar: 13.7,
    price: 1.99,
  },
  {
    id: '7',
    name: 'Pineapple',
    category: 'Multiple',
    color: 'Yellow',
    calories: 50,
    sugar: 9.9,
    price: 2.49,
  },
  {
    id: '8',
    name: 'Watermelon',
    category: 'Pepo',
    color: 'Green/Red',
    calories: 30,
    sugar: 6.2,
    price: 3.99,
  },
  {
    id: '9',
    name: 'Kiwi',
    category: 'Berry',
    color: 'Brown/Green',
    calories: 61,
    sugar: 9.0,
    price: 1.49,
  },
  {
    id: '10',
    name: 'Grape',
    category: 'Berry',
    color: 'Purple',
    calories: 69,
    sugar: 16.1,
    price: 2.99,
  },
])

const dt = ref()
onMounted(() => {
  console.log(dt.value)
})

const pageTotals = computed(() => {
  if (!dt.value) {
    return { calories: 0, sugar: 0, price: 0 }
  }
  const allProcessed = dt.value.processedData
  const first = dt.value.d_first
  const rows = dt.value.d_rows
  const currentDisplayed = allProcessed.slice(first, first + rows)
  return currentDisplayed.reduce(
    (acc: Totals, item: Fruit) => {
      acc.calories += Number(item.calories || 0)
      acc.sugar += Number(item.sugar || 0)
      acc.price += Number(item.price || 0)
      return acc
    },
    { calories: 0, sugar: 0, price: 0 } as Totals,
  )
})
</script>

<template>
  <div class="home">
    <h1>Fruits in a table</h1>
    <DataTable ref="dt" :value="fruits" stripedRows paginator :rows="5">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="color" header="Color"></Column>
      <Column field="calories" header="Calories">
        <template #body="slotProps"> {{ slotProps.data.calories }} kcal </template>
      </Column>
      <Column field="sugar" header="Sugar">
        <template #body="slotProps">
          <InputNumber
            v-model="slotProps.data.sugar"
            :minFractionDigits="1"
            :maxFractionDigits="1"
            :min="0"
            mode="decimal"
            :invalid="slotProps.data.sugar === null"
            showButtons
            @update:modelValue="(val) => (slotProps.data.sugar = val === null ? 0 : val)"
          />
          <span class="unit">g</span>
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="slotProps"> ${{ slotProps.data.price.toFixed(2) }} </template>
      </Column>
      <ColumnGroup type="footer">
        <Row>
          <Column footer="Page Total:" :colspan="4" footerStyle="text-align:right" />
          <Column :footer="pageTotals.calories + ' kcal'" />
          <Column :footer="pageTotals.sugar.toFixed(1) + 'g'" />
          <Column :footer="'$' + pageTotals.price.toFixed(2)" />
        </Row>
      </ColumnGroup>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
.loading,
.error {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}

.loading {
  background-color: #f0f8ff;
  color: #0066cc;
}

.error {
  background-color: #fff0f0;
  color: #cc0000;
}

.sugar-input {
  width: 70px;
  padding: 4px 8px;
  border: 1px solid var(--color-background-mute);
  border-radius: 4px;
  text-align: right;
  transition: border-color 0.2s;
  &:focus {
    border-color: var(--color-background-soft);
    outline: none;
  }
}
.unit {
  margin-left: 10px;
}
.home {
  :deep(.p-inputnumber-input) {
    width: 6rem;
  }
}
</style>
