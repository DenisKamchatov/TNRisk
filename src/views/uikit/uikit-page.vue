<script setup lang="ts">
import TnBadge from "@/components/uikit/tn-badge.vue";
import TnIcon from "@/components/uikit/icons/tn-icon.vue";
import TnButton from "@/components/uikit/tn-button.vue";

// TODO: В фигме не получается посмотреть расстояния между элементами
</script>

<template>
  <div class="uikit-page">
    <div class="uikit-page__block">
      <h3 class="uikit-page__block-title">Badge</h3>

      <h5 class="uikit-page__block-subtitle">Classic Small</h5>
      <div class="uikit-page__block-items">
        <TnBadge classic><TnIcon name="menu" /></TnBadge>
        <TnBadge classic>9</TnBadge>
        <TnBadge classic>92</TnBadge>
      </div>

      <h5 class="uikit-page__block-subtitle">Classic Large</h5>
      <div class="uikit-page__block-items">
        <TnBadge classic size="lg"><TnIcon name="menu" /></TnBadge>
        <TnBadge classic size="lg">9</TnBadge>
        <TnBadge classic size="lg">92</TnBadge>
      </div>

      <h5 class="uikit-page__block-subtitle">Default</h5>
      <div class="uikit-page__block-items">
        <TnBadge default-type><TnIcon name="menu" /></TnBadge>
        <TnBadge default-type>9</TnBadge>
        <TnBadge default-type>92</TnBadge>
      </div>
    </div>

    <div class="uikit-page__block">
      <h3 class="uikit-page__block-title">Buttons</h3>

      <h5 class="uikit-page__block-subtitle">Primary Large</h5>
      <div class="uikit-page__block-items">
        <TnButton primary>Button</TnButton>

        <TnButton primary>
          Button
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton primary>
          <template #icon>
            <TnIcon name="plus" />
          </template>
          Button
        </TnButton>

        <TnButton primary>
          Button
          <template #icon-right>
            <!-- TODO: В дизайне нет такого вида Badge -->
            <TnBadge default-type>92</TnBadge>
          </template>
        </TnButton>

        <TnButton primary>
          <template #icon>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton primary disabled>Button</TnButton>
        
      </div>

      <h5 class="uikit-page__block-subtitle">Primary Medium</h5>
      <div class="uikit-page__block-items">
        <TnButton primary size="md">Button</TnButton>

        <TnButton primary size="md">
          Button
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton primary size="md">
          <template #icon>
            <TnIcon name="plus" />
          </template>
          Button
        </TnButton>

        <TnButton primary size="md">
          Button
          <template #icon-right>
            <TnBadge default-type>92</TnBadge>
          </template>
        </TnButton>

        <TnButton primary size="md">
          <template #icon>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton primary size="md" disabled>Button</TnButton>
        
      </div>

      <h5 class="uikit-page__block-subtitle">Secondary Large</h5>
      <div class="uikit-page__block-items">
        <TnButton secondary size="lg">Button</TnButton>

        <TnButton secondary size="lg">
          Button
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton secondary size="lg">
          <template #icon>
            <TnIcon name="plus" />
          </template>
          Button
        </TnButton>

        <TnButton secondary size="lg">
          Button
          <template #icon-right>
            <TnBadge default-type>92</TnBadge>
          </template>
        </TnButton>

        <TnButton secondary size="lg">
          <template #icon>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton secondary size="lg" disabled>Button</TnButton>
        
      </div>

      <h5 class="uikit-page__block-subtitle">Secondary Medium</h5>
      <div class="uikit-page__block-items">
        <TnButton secondary size="md">Button</TnButton>

        <TnButton secondary size="md">
          Button
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton secondary size="md">
          <template #icon>
            <TnIcon name="plus" />
          </template>
          Button
        </TnButton>

        <TnButton secondary size="md">
          Button
          <template #icon-right>
            <TnBadge default-type>92</TnBadge>
          </template>
        </TnButton>

        <TnButton secondary size="md">
          <template #icon>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton secondary size="md" disabled>Button</TnButton>
        
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.uikit-page {
  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 130px 96px 0 96px;
  margin: 0 auto;

  .uikit-page__block {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .uikit-page__block-title {
    margin: 0 0 10px 0;
  }
  .uikit-page__block-items {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
