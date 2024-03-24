<script setup lang="ts">
import TnIcon from "@/components/uikit/elements/icons/tn-icon.vue";

const props = withDefaults(
  defineProps<{
    error?: boolean;
    warning?: boolean;
    success?: boolean;
    title?: string;
    description?: string;
  }>(),
  {
    success: true,
  }
);
</script>

<template>
  <div
    class="tn-alert"
    :class="{
      'tn-alert_success': success,
      'tn-alert_warning': warning,
      'tn-alert_error': error,
    }"
  >
    <div class="tn-alert__inner">
      <div class="tn-alert__inner-body">
        <div class="tn-alert__inner-icon">
          <slot name="icon">
            <TnIcon
              :name="
                error
                  ? 'error-warning-fill'
                  : warning
                  ? 'alert-fill'
                  : 'checkbox-circle-fill'
              "
            />
          </slot>
        </div>

        <p class="tn-alert__inner-text">
          {{
            title
              ? title
              : error
              ? "Ошибка"
              : warning
              ? "Предупреждение"
              : "Успех"
          }}
        </p>
      </div>

      <div class="tn-alert__inner-buttons">
        <slot name="buttons"></slot>
      </div>
    </div>

    <p class="tn-alert__description" v-if="description || $slots.description">
      <slot name="description">{{ description }}</slot>
    </p>
  </div>
</template>

<style lang="scss">
.tn-alert {
  width: 504px;
  padding: 16px;
  background-color: var(--alert-bg);

  border-radius: 12px;

  box-shadow: var(--alert-shadow);

  .tn-alert__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;

    padding: 0 0 0 16px;

    border-left: var(--alert-left-border);
  }

  .tn-alert__inner-text {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;

    color: var(--alert-text);
  }

  .tn-alert__inner-body {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .tn-alert__inner-buttons {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .tn-alert__description {
    margin: 8px 0 0 0;

    font-size: 14px;
    font-weight: 400;
    line-height: 20px;

    color: var(--alert-description);
  }
}

.tn-alert_success {
  .tn-alert__inner {
    border-left: var(--alert-success-left-border);
  }

  .tn-alert__inner-icon i {
    color: var(--alert-success-icon);
    font-size: 24px;
  }
}

.tn-alert_warning {
  .tn-alert__inner {
    border-left: var(--alert-warning-left-border);
  }

  .tn-alert__inner-icon i {
    color: var(--alert-warning-icon);
    font-size: 24px;
  }
}

.tn-alert_error {
  .tn-alert__inner {
    border-left: var(--alert-error-left-border);
  }

  .tn-alert__inner-icon i {
    color: var(--alert-error-icon);
    font-size: 24px;
  }
}
</style>
