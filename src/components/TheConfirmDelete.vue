<script setup lang="ts">
defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
defineProps<{
  isShow: boolean
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isShow" class="modal-overlay" @click.self="$emit('cancel')">
        <div class="modal-containter">
          <div class="modal-header">
            <i class="pi pi-exclamation-triangle warning-icon"></i>
            <h3>Are you sure you want to delete this trade?</h3>
          </div>
          <p>This action cannot be undone.</p>
          <div class="modal-actions">
            <button class="btn-cancel" @click="$emit('cancel')">Cancel</button>
            <button class="btn-confirm" @click="$emit('confirm')">Delete</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: all 0.2s ease-in-out;
  .modal-containter {
    background-color: var(--color-background-mute);
    box-shadow: 0 6px 13px -1px var(--color-background-soft);
    border-radius: 6px;
    padding: 2rem;
    .modal-header {
      display: flex;
      align-items: baseline;
      gap: 1rem;
      margin-bottom: 10px;
      .warning-icon {
        color: #ffbf00;
        font-size: 1.5rem;
      }
      h3 {
        font-weight: 900;
        font-size: 20px;
      }
    }
    .modal-actions {
      margin-top: 10px;
      display: flex;
      justify-self: flex-end;
      align-items: center;
      gap: 1rem;
      button {
        padding: 0.5rem 1.5rem;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        font-size: 15px;
      }
      .btn-cancel {
        background-color: var(--color-background-mute);
        border: 1px solid var(--vt-c-white);
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: var(--vt-c-white);
          color: var(--vt-c-black);
        }
      }
      .btn-confirm {
        background-color: #ffbf00;
        color: var(--vt-c-black);
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: #ff8000;
        }
      }
    }
    p {
      font-size: 18px;
    }
  }
}

//Animation for modal
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .modal-content {
  transition: transform 0.3s ease;
}
.fade-enter-from .modal-content {
  transform: scale(0.9);
}
</style>
