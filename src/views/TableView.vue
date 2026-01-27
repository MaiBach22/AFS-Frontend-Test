<script lang="ts">
import { defineComponent } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default defineComponent({
  name: 'TableView',
  components: {
    DataTable,
    Column,
  },
  setup() {
    const fruits = [
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
    ]

    return {
      fruits,
    }
  },
})
</script>

<template>
  <div class="home">
    <h1>Fruits in a table</h1>
    <DataTable :value="fruits" stripedRows paginator :rows="5">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="color" header="Color"></Column>
      <Column field="calories" header="Calories">
        <template #body="slotProps"> {{ slotProps.data.calories }} kcal </template>
      </Column>
      <Column field="sugar" header="Sugar">
        <template #body="slotProps"> {{ slotProps.data.sugar }}g </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="slotProps"> ${{ slotProps.data.price.toFixed(2) }} </template>
      </Column>
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
</style>
