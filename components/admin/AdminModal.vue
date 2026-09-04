<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click.self="$emit('update:modelValue', false)">
        <div class="modal-box" :class="`modal-box--${variant}`">
          <div class="modal-icon" v-if="icon">{{ icon }}</div>
          <h3 class="modal-title">{{ title }}</h3>
          <p v-if="message" class="modal-message">{{ message }}</p>
          <slot />
          <div class="modal-actions">
            <button class="modal-btn modal-btn--cancel" @click="$emit('update:modelValue', false)">
              {{ cancelText || 'Cancel' }}
            </button>
            <button class="modal-btn" :class="`modal-btn--${variant}`" @click="$emit('confirm')">
              {{ confirmText || 'Confirm' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title: string
  message?: string
  icon?: string
  variant?: 'danger' | 'warning' | 'success' | 'default'
  confirmText?: string
  cancelText?: string
}>()
defineEmits(['update:modelValue', 'confirm'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
}

.modal-box {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.modal-icon { font-size: 40px; margin-bottom: 12px; }

.modal-title {
  font-family: 'Syne', sans-serif;
  font-size: 19px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
}

.modal-message { font-size: 13.5px; color: #64748b; margin-bottom: 24px; line-height: 1.5; }

.modal-actions { display: flex; gap: 10px; justify-content: center; margin-top: 24px; }

.modal-btn {
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.modal-btn--cancel {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #475569;
}
.modal-btn--cancel:hover { background: #f1f5f9; color: #0f172a; }

.modal-btn--danger { background: #ef4444; color: #ffffff; }
.modal-btn--danger:hover { background: #dc2626; }

.modal-btn--default { background: #0284c7; color: #ffffff; }
.modal-btn--default:hover { background: #0369a1; }

.modal-btn--success { background: #16a34a; color: #ffffff; }
.modal-btn--success:hover { background: #15803d; }

.modal-enter-active, .modal-leave-active { transition: opacity 0.2s, transform 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.96); }
</style>
