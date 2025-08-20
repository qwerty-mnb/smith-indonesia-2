<template>
  <div class="message-content">
    <div class="content-header">
      <h2>Messages</h2>
      <p>View and manage your messages</p>
    </div>

    <div class="under-development">
      <div class="dev-icon">
        <i class="fas fa-envelope"></i>
      </div>
      <h3>Under Development</h3>
      <p>This feature is currently being developed and will be available soon.</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 25%"></div>
      </div>
      <span class="progress-text">25% Complete</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MessageContent'
});
</script>

<style lang="scss" scoped>
.message-content {
  flex: 1;
  padding: 20px;

  .content-header {
    margin-bottom: 30px;
    text-align: center;

    h2 {
      color: #e7ff1e;
      font-size: 28px;
      margin-bottom: 10px;
    }

    p {
      color: #ccc;
      font-size: 16px;
    }
  }

  .under-development {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 60px 40px;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;

    .dev-icon {
      font-size: 80px;
      color: #490e9f;
      margin-bottom: 20px;
    }

    h3 {
      color: #e7ff1e;
      font-size: 24px;
      margin-bottom: 15px;
    }

    p {
      color: #ccc;
      font-size: 16px;
      margin-bottom: 30px;
      line-height: 1.5;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: rgba(73, 14, 159, 0.3);
      border-radius: 4px;
      margin-bottom: 10px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #490e9f 0%, #6d2bd1 100%);
        border-radius: 4px;
        transition: width 0.3s ease;
      }
    }

    .progress-text {
      color: #e7ff1e;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
