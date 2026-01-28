<script setup lang="ts">
import TheTradeCard from '@/components/TheTradeCard.vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'

const GET_TRADES = gql`
  query GetTrades {
    trades {
      id
      amount
      commodity
      counterparty
      type
      dealDate
      deliveryDate
      counterparty
      clientCompany {
        name
        status
      }
    }
  }
`

const { result, loading, error, onResult } = useQuery(GET_TRADES)

const trades = computed(() => result.value?.trades ?? [])

onResult((response) => {
  console.log('Trades:', response.data.trades)
})
</script>

<template>
  <div class="transactions">
    <div v-if="loading">Loading trades...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else class="trade-grid-container">
      <TheTradeCard v-for="item in trades" :key="item.id" :trade="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.trade-grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr); 
  gap: 20px;
  align-items: stretch;


  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
