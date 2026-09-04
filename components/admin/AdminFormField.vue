<template>
  <div class="aff-wrap" :class="{ 'aff-wrap--error': error }">
    <label v-if="label" :for="id" class="aff-label">
      {{ label }}
      <span v-if="required" class="aff-required">*</span>
    </label>
    <slot>
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows || 4"
        class="aff-input aff-textarea"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      />
      <select
        v-else-if="type === 'select'"
        :id="id"
        :value="modelValue"
        class="aff-input"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option value="" disabled>{{ placeholder || 'Select…' }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
      <input
        v-else
        :id="id"
        :type="type || 'text'"
        :value="modelValue"
        :placeholder="placeholder"
        :min="min"
        :step="step"
        class="aff-input"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </slot>
    <span v-if="hint && !error" class="aff-hint">{{ hint }}</span>
    <span v-if="error" class="aff-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  label?: string
  modelValue?: string | number
  type?: string
  placeholder?: string
  required?: boolean
  hint?: string
  error?: string
  rows?: number
  options?: { value: string; label: string }[]
  min?: string
  step?: string
}>()
defineEmits(['update:modelValue'])
</script>

<style scoped>
.aff-wrap { display: flex; flex-direction: column; gap: 6px; }

.aff-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #334155;
  text-transform: uppercase;
}

.aff-required { color: #ef4444; margin-left: 3px; }

.aff-input {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 9px 13px;
  color: #0f172a;
  font-size: 13.5px;
  outline: none;
  width: 100%;
  transition: all 0.2s;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

.aff-input:focus {
  border-color: #0284c7;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.12);
}

.aff-input::placeholder {
  color: #94a3b8;
}

.aff-textarea { resize: vertical; min-height: 80px; }

.aff-hint { font-size: 11px; color: #64748b; }
.aff-error { font-size: 11px; color: #ef4444; }
.aff-wrap--error .aff-input { border-color: #ef4444; }
</style>
