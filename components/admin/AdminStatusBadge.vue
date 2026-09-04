<template>
  <span class="status-badge" :class="`status-badge--${status}`">
    <span class="status-dot"></span>
    {{ label || status }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ status: string; label?: string }>()
</script>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Blog & General statuses */
.status-badge--draft { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
.status-badge--draft .status-dot { background: #94a3b8; }

.status-badge--published { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
.status-badge--published .status-dot { background: #22c55e; }

/* Quotation statuses */
.status-badge--sent { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
.status-badge--sent .status-dot { background: #0284c7; }

.status-badge--accepted { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
.status-badge--accepted .status-dot { background: #16a34a; }

.status-badge--rejected { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
.status-badge--rejected .status-dot { background: #ef4444; }

/* Enquiry statuses */
.status-badge--new { background: #fef9c3; color: #854d0e; border: 1px solid #fef08a; }
.status-badge--new .status-dot { background: #eab308; }

.status-badge--in-progress { background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa; }
.status-badge--in-progress .status-dot { background: #f97316; }

.status-badge--closed { background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; }
.status-badge--closed .status-dot { background: #94a3b8; }
</style>
