<script setup lang="ts">
import TheConfirmDelete from '@/components/TheConfirmDelete.vue'
import TheTradeCard from '@/components/TheTradeCard.vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref, watch } from 'vue'

export interface Trades {
  id: string
  amount: number
  commodity: string
  counterparty: string
  dealDate: string
  type: string
  clientCompany: {
    name: string
    status: string
  }
}

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

const trades = ref<Trades[]>([])

// const trades = computed(() => result.value?.trades ?? [])

onResult((response) => {
  console.log('Trades:', response.data.trades)
})

watch(
  result,
  (newResult) => {
    if (newResult?.trades) {
      trades.value = [...newResult.trades]
    }
  },
  { immediate: true },
)

const isModalOpen = ref<boolean>(false)
const tradeIdToDelete = ref<string | null>(null)

const handleDelete = () => {
  if (tradeIdToDelete.value) {
    trades.value = trades.value.filter((t: Trades) => t.id !== tradeIdToDelete.value)
  }
  isModalOpen.value = false
  tradeIdToDelete.value = null
}

const handleOpenModal = (id: string) => {
  isModalOpen.value = true
  tradeIdToDelete.value = id
}
</script>

<template>
  <div class="transactions">
    <div v-if="loading">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>Loading trades...
    </div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else class="trade-grid-container">
      <TheTradeCard v-for="item in trades" :key="item.id" :trade="item" @delete="handleOpenModal" />
    </div>
  </div>
  <TheConfirmDelete :is-show="isModalOpen" @confirm="handleDelete" @cancel="isModalOpen = false" />
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
