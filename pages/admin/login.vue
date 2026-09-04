<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="login-glow"></div>
    </div>
    <div class="login-card">
      <div class="login-logo">
        <img
          src="/images/logo-black.png"
          alt="Leave It On Us Admin"
          class="login-logo-img"
        />
        <div class="login-badge-pill">ADMIN PORTAL</div>
      </div>

      <h1 class="login-title">Welcome back</h1>
      <p class="login-desc">Enter your admin credentials to access the panel.</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter admin password"
            class="login-input"
            :class="{ 'login-input--error': error }"
            autocomplete="current-password"
          />
          <button type="button" class="show-pass-btn" @click="showPassword = !showPassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>
        <div v-if="error" class="login-error">{{ error }}</div>
        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading">Authenticating…</span>
          <span v-else>Sign In →</span>
        </button>
      </form>

      <div class="login-hint">Default password: <code>admin123</code></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({ layout: false })

const router = useRouter()
const password = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)

const ADMIN_PASSWORD = 'admin123'

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  await new Promise((r) => setTimeout(r, 600))
  if (password.value === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_auth', 'true')
    router.push('/admin')
  } else {
    error.value = 'Incorrect password. Please try again.'
  }
  loading.value = false
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  padding: 20px;
  position: relative;
}

.login-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.login-glow {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(2, 132, 199, 0.08) 0%, transparent 70%);
  border-radius: 50%;
}

.login-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 44px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.04);
}

.login-logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f5f9;
}

.login-logo-img {
  height: 42px;
  max-width: 200px;
  object-fit: contain;
}

.login-badge-pill {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0284c7;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  padding: 4px 10px;
  border-radius: 9999px;
}

.login-title {
  font-family: 'Syne', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 6px;
}

.login-desc {
  font-size: 13.5px;
  color: #64748b;
  margin-bottom: 24px;
}

.login-form { display: flex; flex-direction: column; gap: 16px; }

.form-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #334155;
}

.login-input {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 12px 44px 12px 14px;
  color: #0f172a;
  font-size: 14px;
  outline: none;
  width: 100%;
  transition: all 0.2s;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

.login-input:focus {
  border-color: #0284c7;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}

.login-input--error { border-color: #ef4444 !important; }

.show-pass-btn {
  position: absolute;
  right: 12px;
  bottom: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
}

.login-error {
  background: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  color: #dc2626;
}

.login-btn {
  background: #0284c7;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 13px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 4px;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
}

.login-btn:hover { background: #0369a1; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(2, 132, 199, 0.35); }
.login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.login-hint {
  margin-top: 20px;
  font-size: 11.5px;
  color: #64748b;
  text-align: center;
}

.login-hint code {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  color: #0f172a;
  font-weight: 600;
}
</style>
