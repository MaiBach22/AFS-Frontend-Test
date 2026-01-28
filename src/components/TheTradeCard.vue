<script setup lang="ts">
import { Tag, Card, Divider, Avatar, Button, Timeline } from 'primevue'
import { computed } from 'vue'

const props = defineProps<{
  trade: {
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
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB')
}

const timelineEvents = computed(() => [
  {
    label: 'Origin',
    value: `${props.trade.commodity} Warehouse`,
    type: 'current',
  },
  {
    label: '',
    value: '',
    icon: 'pi pi-circle-fill',
    type: 'middle',
  },
  {
    label: 'Destination',
    value: `${props.trade.counterparty} Terminal`,
    icon: 'pi pi-map-marker',
    type: 'arrival',
  },
])
</script>

<template>
  <Card class="tracking-card">
    <template #header>
      <div class="header-section">
        <div class="id-group">
          <div class="icon-box">
            <i class="pi pi-id-card" style="color: var(--color-text)"></i>
          </div>
          <span class="order-id">#{{ trade.id }}</span>
        </div>

        <Tag
          class="status-tag"
          :value="trade.clientCompany.status"
          :severity="trade.clientCompany.status.toLowerCase() === 'active' ? 'success' : 'danger'"
        />
      </div>
      <Divider />
    </template>

    <template #content>
      <div class="tracking-section">
        <!-- <div class="timeline">
          <div class="timeline-item">
            <div class="dot-container">
              <div class="dot current"></div>
              <div class="line"></div>
            </div>
            <div class="info">
              <label>Commodity Origin</label>
              <p>{{ trade.commodity }} Warehouse</p>
            </div>
          </div>

          <div class="timeline-item middle">
            <div class="dot-container">
              <div class="small-dot"></div>
              <div class="line dashed"></div>
            </div>
            <div class="info spacer"></div>
          </div>

          <div class="timeline-item">
            <div class="dot-container">
              <div class="dot arrival">
                <i class="pi pi-map-marker" style="font-size: 12px"></i>
              </div>
            </div>
            <div class="info">
              <label>Arrival Destination</label>
              <p>{{ trade.counterparty }}</p>
            </div>
          </div>
        </div> -->

        <Timeline :value="timelineEvents" class="customized-timeline">
          <template #marker="slotProps">
            <span v-if="slotProps.item.type === 'middle'" class="middle-dot-wrapper">
              <span class="middle-dot"></span>
            </span>

            <span v-else class="marker-container">
              <div class="dot-wrapper">
                <div v-if="slotProps.item.type === 'current'" class="dot-circle"></div>
                <div v-else class="icon-wrapper">
                  <i class="pi pi-map-marker" style="font-size: 12px"></i>
                </div>
              </div>
            </span>
          </template>

          <template #content="slotProps">
            <div v-if="slotProps.item.label" class="info-content">
              <label>{{ slotProps.item.label }}</label>
              <p>{{ slotProps.item.value }}</p>
            </div>
          </template>
        </Timeline>

        <div class="map-thumbnail">
          <img width="80" src="../assets/afs-energy-logo-custom.png" alt="map" />
        </div>
      </div>

      <Divider />

      <div class="info-grid">
        <div class="info-item client">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
            size="large"
          />
          <div class="client-name">
            <label>Client name</label>
            <strong>{{ trade.clientCompany.name }}</strong>
          </div>
        </div>

        <div class="info-item">
          <label>Total Volume</label>
          <strong>{{ trade.amount }} Units</strong>
        </div>
        <div class="info-item">
          <label>Deal date</label>
          <strong>{{ formatDate(trade.dealDate) }}</strong>
        </div>
        <div class="info-item">
          <label>Trade type</label>
          <strong>{{ trade.type }}</strong>
        </div>
      </div>
    </template>

    <template #footer>
      <Button label="View detail" class="view-btn" severity="secondary" variant="outlined" />
    </template>
  </Card>
</template>

<style scoped lang="scss">
.tracking-card {
  width: 100%;
  height: 100%;
  max-width: 450px;
  box-shadow: 0 6px 13px -1px var(--color-background-mute);

  :deep(.p-card-body) {
    padding: 1.5rem;
  }
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 1.5rem;
  margin-top: 1rem;
  .id-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  .icon-box {
    width: 40px;
    height: 40px;
    border: 2px solid var(--color-border);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .order-id {
    color: var(--color-text);
  }

  .status-tag {
    text-transform: capitalize;
  }
}

.tracking-section {
  display: flex;
  justify-content: space-between;
  // padding: 1.5rem 0;

  .timeline {
    display: flex;
    flex-direction: column;
    .timeline-item {
      display: flex;
      gap: 16px;
      min-height: 20px;

      .dot-container {
        width: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .line {
          width: 2px;
          flex-grow: 1;
          background-color: hsla(160, 100%, 37%, 1);

          &.dashed {
            background: none;
            border-left: 2px dashed var(--color-border);
          }
        }
      }

      .dot {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        flex-shrink: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;

        &.current {
          border: 2px solid var(--color-border);
          &::after {
            content: '';
            width: 8px;
            height: 8px;
            background: hsla(160, 100%, 37%, 1);
            border-radius: 50%;
          }
        }
        &.arrival {
          border: 2px solid var(--color-border);
          color: hsla(160, 100%, 37%, 1);
        }
      }
      .small-dot {
        width: 12px;
        height: 12px;
        background: var(--vt-c-white);
        border: 3px solid hsla(160, 100%, 37%, 1);
        border-radius: 50%;
        flex-shrink: 0;
        z-index: 2;
        margin: -10px 0;
        padding: 1px;
      }

      .info {
        label {
          font-size: 0.85rem;
          display: block;
          color: var(--color-text);
        }
        p {
          font-size: 0.95rem;
          font-weight: 500;
        }
      }
    }

    .map-thumb img {
      border-radius: 12px;
      object-fit: cover;
    }
  }

  .customized-timeline {
    :deep(.p-timeline-event-content) {
      padding: 0 0 1rem 1rem;
    }
    :deep(.p-timeline-event:first-child) {
      min-height: 30px;

      .p-timeline-event-content {
        padding-bottom: 0;
      }

      .p-timeline-event-connector {
        height: 20px;
      }
    }
    :deep(.p-timeline-event:nth-child(2)) {
      min-height: 30px;
    }
    :deep(.p-timeline-event-opposite) {
      display: none;
    }

    .marker-container {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      border-radius: 50%;
      color: hsla(160, 100%, 37%, 1);

      .dot-wrapper {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid var(--color-border);
        display: flex;
        justify-content: center;
        align-items: center;
        .dot-circle {
          background-color: hsla(160, 100%, 37%, 1);
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .middle-dot-wrapper {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      .middle-dot {
        width: 12px;
        height: 12px;
        background: var(--vt-c-white);
        border: 3px solid hsla(160, 100%, 37%, 1);
        border-radius: 50%;
        z-index: 1;
      }
    }

    .info-content {
      label {
        display: block;
        font-size: 0.75rem;
        color: var(--color-text);
        font-weight: 600;
      }
      p {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 700;
      }
    }
  }
}

.info-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  padding: 1rem 0;

  .info-item {
    label {
      font-size: 0.8rem;
      display: block;
      color: var(--color-text);
    }
    strong {
      text-transform: capitalize;
    }

    &.client {
      grid-column: span 1;
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }
}

.view-btn {
  width: 100%;
}
</style>
