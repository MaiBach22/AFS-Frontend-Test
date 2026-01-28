<script setup lang="ts">
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
</script>

<template>
  <div class="tracking-card">
    <div class="card-header">
      <div class="header-section">
        <div class="id-group">
          <div class="icon-box">
            <i class="pi pi-id-card" style="color: var(--color-text)"></i>
          </div>
          <span class="order-id">#{{ trade.id }}</span>
        </div>

        <div class="action">
          <span :class="['status-badge', trade.clientCompany.status.toLowerCase()]">
            {{ trade.clientCompany.status }}
          </span>
          <button class="delete-icon-btn">
            <i class="pi pi-trash" style="font-size: 1rem"></i>
          </button>
        </div>
      </div>
      <div class="divider"></div>
    </div>

    <div class="card-content">
      <div class="tracking-section">
        <div class="timeline">
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
        </div>

        <div class="map-thumbnail">
          <img width="80" src="../assets/afs-energy-logo-custom.png" alt="map" />
        </div>
      </div>
      <div class="divider"></div>

      <div class="info-grid">
        <div class="info-item client">
          <img
            width="40"
            class="custom-avatar"
            src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            alt="avatar"
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
    </div>

    <div class="card-footer">
      <button class="view-btn">View detail</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tracking-card {
  width: 100%;
  height: 100%;
  max-width: 450px;
  box-shadow: 0 6px 13px -1px var(--color-background-mute);
}

.divider {
  height: 1px;
  background-color: var(--color-border);
  margin: 1rem 0;
}

.card-header {
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
      cursor: default;
    }

    .status-tag {
      text-transform: capitalize;
    }
    .action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      .status-badge {
        padding: 4px 12px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: capitalize;
        cursor: default;
        &.active {
          border: 1px solid #15803d;
          color: #15803d;
        }
        &.inactive {
          border: 1px solid #b91c1c;
          color: #b91c1c;
        }
      }

      .delete-icon-btn {
        background: none;
        border: none;
        color: #94a3b8;
        cursor: pointer;

        &:hover {
          color: #ef4444;
        }
      }
    }
  }
}

.card-content {
  padding: 0 1.5rem;
  .tracking-section {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;

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
            color: var(--color-heading);
          }
        }
      }

      .map-thumb img {
        border-radius: 12px;
        object-fit: cover;
      }
    }
  }
  .info-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 10px;
    margin-top: 1.5rem;

    .info-item {
      label {
        font-size: 0.8rem;
        display: block;
        color: var(--color-text);
      }
      strong {
        text-transform: capitalize;
        color: var(--color-heading);
      }

      &.client {
        grid-column: span 1;
        display: flex;
        gap: 10px;
        align-items: center;
      }
    }
  }
}

.card-footer {
  padding: 1.5rem;
  .view-btn {
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    border: none;
    background-color: var(--color-background-mute);
    color: var(--color-text);
    font-weight: 600;
    transition: background-color 0.2s;
    cursor: pointer;
    &:hover {
      background-color: var(--color-background-soft);
    }
  }
}
</style>
