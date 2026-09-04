<template>
  <section class="enquiry-section" id="enquiry-form">
    <div class="eq-bg-glow"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="eq-layout">
        <!-- Left side info -->
        <div class="eq-info">
          <span class="eq-badge">GET IN TOUCH</span>
          <h2 class="eq-heading">
            Ready to Scale Your <span class="text-gradient-yellow">Brand?</span>
          </h2>
          <p class="eq-desc">
            Tell us about your project and goals. Our team will get back to you within 24 hours with a tailored strategy.
          </p>

          <div class="eq-features">
            <div class="eq-feature" v-for="f in features" :key="f.label">
              <span class="eq-feature-icon">{{ f.icon }}</span>
              <div>
                <div class="eq-feature-label">{{ f.label }}</div>
                <div class="eq-feature-desc">{{ f.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="eq-form-wrap">
          <transition name="fade" mode="out-in">
            <!-- Success State -->
            <div v-if="submitted" key="success" class="eq-success">
              <div class="success-icon">🎉</div>
              <h3 class="success-title">Enquiry Received!</h3>
              <p class="success-msg">
                Thank you, <strong>{{ submittedName }}</strong>! We've received your enquiry and will respond within 24 hours.
              </p>
              <button class="btn-outline" @click="reset">Send Another</button>
            </div>

            <!-- Form -->
            <form v-else key="form" @submit.prevent="handleSubmit" class="eq-form" novalidate>
              <div class="form-grid-2">
                <div class="form-group" :class="{ 'form-group--error': errors.name }">
                  <label for="eq-name">Full Name *</label>
                  <input id="eq-name" v-model="form.name" type="text" placeholder="Your full name" class="eq-input" />
                  <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
                </div>
                <div class="form-group" :class="{ 'form-group--error': errors.email }">
                  <label for="eq-email">Email Address *</label>
                  <input id="eq-email" v-model="form.email" type="email" placeholder="you@company.com" class="eq-input" />
                  <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label for="eq-phone">Phone Number</label>
                  <input id="eq-phone" v-model="form.phone" type="tel" placeholder="+91 98765 43210" class="eq-input" />
                </div>
                <div class="form-group">
                  <label for="eq-company">Company / Brand</label>
                  <input id="eq-company" v-model="form.company" type="text" placeholder="Your company name" class="eq-input" />
                </div>
              </div>

              <!-- Services -->
              <div class="form-group">
                <label>Services Interested In *</label>
                <div class="services-grid">
                  <label
                    v-for="svc in serviceOptions"
                    :key="svc"
                    class="service-checkbox"
                    :class="{ 'service-checkbox--active': form.services.includes(svc) }"
                  >
                    <input type="checkbox" :value="svc" v-model="form.services" class="sr-only" />
                    <span class="service-check-icon">{{ form.services.includes(svc) ? '✓' : '' }}</span>
                    {{ svc }}
                  </label>
                </div>
                <span v-if="errors.services" class="form-error">{{ errors.services }}</span>
              </div>

              <!-- Budget -->
              <div class="form-group">
                <label for="eq-budget">Monthly Budget Range</label>
                <select id="eq-budget" v-model="form.budget" class="eq-input">
                  <option value="" disabled>Select budget range</option>
                  <option value="Under ₹1L">Under ₹1 Lakh / month</option>
                  <option value="₹1L–₹3L">₹1L – ₹3L / month</option>
                  <option value="₹3L–₹5L">₹3L – ₹5L / month</option>
                  <option value="₹5L–₹10L">₹5L – ₹10L / month</option>
                  <option value="₹10L+">₹10L+ / month</option>
                  <option value="Project Basis">Project Basis</option>
                </select>
              </div>

              <!-- Message -->
              <div class="form-group" :class="{ 'form-group--error': errors.message }">
                <label for="eq-message">Tell Us About Your Goals *</label>
                <textarea id="eq-message" v-model="form.message" placeholder="Describe your brand, goals, target audience, and what you're hoping to achieve…" class="eq-input eq-textarea" rows="4"></textarea>
                <span v-if="errors.message" class="form-error">{{ errors.message }}</span>
              </div>

              <button type="submit" class="eq-submit-btn" :disabled="loading">
                <span v-if="loading">Submitting…</span>
                <span v-else>Send Enquiry →</span>
              </button>

              <p class="eq-privacy">🔒 Your details are safe with us and will never be shared.</p>
            </form>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useEnquiries } from '~/composables/useEnquiries'

const { createEnquiry } = useEnquiries()

const submitted = ref(false)
const submittedName = ref('')
const loading = ref(false)

const form = reactive({
  name: '', email: '', phone: '', company: '',
  services: [] as string[], budget: '', message: ''
})

const errors = reactive({ name: '', email: '', services: '', message: '' })

const serviceOptions = [
  'Content Creation & IP',
  'Socials & Performance',
  'Talent & Influencer',
  'Brand Production / TVC',
  'SEO & Content Strategy',
  'Performance Advertising',
]

const features = [
  { icon: '⚡', label: '24-hour Response', desc: 'We respond to all enquiries within one business day' },
  { icon: '🎯', label: 'Tailored Strategy', desc: 'Custom proposals built around your specific goals' },
  { icon: '🔒', label: 'NDA Available', desc: 'We sign NDAs upon request before any discussions' },
]

const validate = () => {
  errors.name = form.name.trim() ? '' : 'Name is required'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Valid email is required'
  errors.services = form.services.length ? '' : 'Select at least one service'
  errors.message = form.message.trim().length >= 10 ? '' : 'Message must be at least 10 characters'
  return !errors.name && !errors.email && !errors.services && !errors.message
}

const handleSubmit = async () => {
  if (!validate()) return
  loading.value = true
  await new Promise((r) => setTimeout(r, 600))
  createEnquiry({
    name: form.name, email: form.email, phone: form.phone,
    company: form.company, services: [...form.services],
    budget: form.budget, message: form.message
  })
  submittedName.value = form.name
  submitted.value = true
  loading.value = false
}

const reset = () => {
  submitted.value = false
  Object.assign(form, { name: '', email: '', phone: '', company: '', services: [], budget: '', message: '' })
  Object.assign(errors, { name: '', email: '', services: '', message: '' })
}
</script>

<style scoped>
.enquiry-section {
  padding: 96px 0;
  background: #121214;
  position: relative;
  overflow: hidden;
}

.eq-bg-glow {
  position: absolute;
  bottom: -200px;
  right: -200px;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(255,227,0,0.07) 0%, transparent 60%);
  border-radius: 50%;
  pointer-events: none;
}

.eq-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  align-items: start;
}

@media (max-width: 900px) {
  .eq-layout { grid-template-columns: 1fr; gap: 40px; }
}

.eq-info { padding-top: 16px; }

.eq-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FFE300;
  background: rgba(255,227,0,0.1);
  border: 1px solid rgba(255,227,0,0.25);
  padding: 4px 14px;
  border-radius: 99px;
  margin-bottom: 18px;
}

.eq-heading {
  font-family: 'Syne', sans-serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.eq-desc {
  font-size: 15px;
  color: #a1a1aa;
  line-height: 1.7;
  margin-bottom: 36px;
  max-width: 420px;
}

.eq-features { display: flex; flex-direction: column; gap: 20px; }

.eq-feature {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.eq-feature-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255,227,0,0.1);
  border: 1px solid rgba(255,227,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.eq-feature-label { font-size: 14px; font-weight: 700; color: #e4e4e7; margin-bottom: 2px; }
.eq-feature-desc { font-size: 12px; color: #71717a; }

/* Form */
.eq-form-wrap {
  background: #0f0f11;
  border: 1px solid #1e1e22;
  border-radius: 20px;
  padding: 36px;
}

.eq-form { display: flex; flex-direction: column; gap: 18px; }

.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 600px) { .form-grid-2 { grid-template-columns: 1fr; } }

.form-group { display: flex; flex-direction: column; gap: 7px; }

.form-group label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #a1a1aa;
}

.eq-input {
  background: #161618;
  border: 1px solid #27272a;
  border-radius: 10px;
  padding: 12px 16px;
  color: #e4e4e7;
  font-size: 14px;
  outline: none;
  width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.eq-input:focus {
  border-color: #FFE300;
  box-shadow: 0 0 0 3px rgba(255,227,0,0.1);
}

.eq-textarea { resize: vertical; min-height: 100px; }

.form-group--error .eq-input { border-color: #ef4444; }
.form-error { font-size: 11px; color: #f87171; }

/* Services grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.service-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border: 1px solid #27272a;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  color: #71717a;
  font-weight: 600;
  transition: all 0.2s;
  background: #161618;
}

.service-checkbox:hover { border-color: rgba(255,227,0,0.3); color: #e4e4e7; }

.service-checkbox--active {
  border-color: rgba(255,227,0,0.4);
  background: rgba(255,227,0,0.08);
  color: #FFE300;
}

.service-check-icon {
  width: 16px;
  height: 16px;
  border: 1px solid currentColor;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
}

.eq-submit-btn {
  background: #FFE300;
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 4px;
}

.eq-submit-btn:hover { background: #FFEB3B; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,227,0,0.4); }
.eq-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.eq-privacy { font-size: 11px; color: #3f3f46; text-align: center; }

.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

/* Success */
.eq-success { text-align: center; padding: 40px 20px; }
.success-icon { font-size: 56px; margin-bottom: 16px; }
.success-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 12px; }
.success-msg { font-size: 14px; color: #a1a1aa; line-height: 1.6; margin-bottom: 24px; }
.btn-outline { background: none; border: 1px solid rgba(255,227,0,0.3); border-radius: 10px; padding: 10px 24px; color: #FFE300; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.btn-outline:hover { background: rgba(255,227,0,0.1); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
