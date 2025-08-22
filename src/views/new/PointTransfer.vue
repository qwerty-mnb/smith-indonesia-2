<template>
  <div class="point-transfer-content">
    <div class="transfer-container">
      <!-- Before/After Comparison -->
      <div class="comparison-section">
        <div class="comparison-card before-card">
          <div class="card-title">{{ $t("point.AmountBefore") }}</div>
          <div class="card-content">
            <div class="info-row">
              <div class="info-label">{{ $t("point.Point") }}</div>
              <div class="info-value">
                <input class="form-control" readonly type="number" v-model="walletPoint.current" />
              </div>
            </div>
            <div class="info-row">
              <div class="info-label">{{ $t("withdraw.Balance") }}</div>
              <div class="info-value">
                <input class="form-control" readonly type="number" v-model="wallet.current" />
              </div>
            </div>
          </div>
        </div>

        <div class="transfer-arrow">
          <i class="fas fa-arrow-right"></i>
        </div>

        <div class="comparison-card after-card">
          <div class="card-title">{{ $t("point.AmountAfter") }}</div>
          <div class="card-content">
            <div class="info-row">
              <div class="info-label">{{ $t("point.Point") }}</div>
              <div class="info-value">
                <input class="form-control" readonly type="number" v-model="walletPoint.new" />
              </div>
            </div>
            <div class="info-row">
              <div class="info-label">{{ $t("withdraw.Balance") }}</div>
              <div class="info-value">
                <input class="form-control" readonly type="number" v-model="wallet.new" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transfer Amount Section -->
      <div class="transfer-amount-section">
        <div class="section-header">
          <h4 class="section-title">{{ $t("point.TurningPoint") }}</h4>
        </div>
        
        <div class="amount-input-container">
          <div class="amount-input-group">
            <input 
              class="amount-input" 
              type="number" 
              placeholder="0" 
              v-model="amount" 
            />
            <button class="max-amount-btn" @click="setMaxWalletPoint()">
              <i class="fas fa-arrow-up"></i>
              {{ $t("point.MaxAmount") }}
            </button>
          </div>
        </div>

        <div class="quick-amount-buttons">
          <button class="amount-btn" type="button" @click="setAmount(10000)">
            {{ $t("deposit.10K") }}
          </button>
          <button class="amount-btn" type="button" @click="setAmount(50000)">
            {{ $t("deposit.50K") }}
          </button>
          <button class="amount-btn" type="button" @click="setAmount(100000)">
            {{ $t("deposit.100K") }}
          </button>
          <button class="amount-btn" type="button" @click="setAmount(500000)">
            {{ $t("deposit.500K") }}
          </button>
          <button class="amount-btn" type="button" @click="setAmount(1000000)">
            {{ $t("deposit.1M") }}
          </button>
          <button class="amount-btn clear-btn" type="button" @click="setAmount(0)">
            {{ $t("deposit.Others") }}
          </button>
        </div>

        <div class="notes-section">
          <p class="notes-text">{{ $t("point.Notes") }}</p>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="submit-section" v-if="amount > 0">
        <button 
          type="submit" 
          :disabled="isLoading" 
          class="submit-btn" 
          @click="onPointTransfer"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          {{ $t("point.Transfer") }}
        </button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";

export default defineComponent({
  name: "Point History",
  components: {
  },
  setup() {
    // vue variables
    const { t } = useI18n();
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    // page variables
    let amount = ref(0);
    const wallet = ref({ current: user.value.wallet, new: 0 });
    const walletPoint = ref({ current: user.value.wallet_point, new: 0 });
    const isLoading = ref(false);

    watch(
      () => amount.value,
      (value) => {
        if (Number(value) > Number(walletPoint.value.current)) {
          walletPoint.value.new = walletPoint.value.current;
          wallet.value.new = wallet.value.current;
        } else {
          walletPoint.value.new =
            Number(walletPoint.value.current) - Number(value);
          wallet.value.new = Number(wallet.value.current) + Number(value);
        }
      }
    );

    const onPointTransfer = async () => {
      isLoading.value = true;
      if (Number(amount.value) > Number(walletPoint.value.current))
        return Swal.fire(t("point.Title"), t(`point.AMOUNT_GT`), "info");

      await ApiService.post("/tran/point", { amount: Number(amount.value) })
        .then(() =>
          Swal.fire(
            t("point.Title"),
            t("point.TransferSuccess", amount.value),
            "success"
          )
        )
        .catch((e) =>
          Swal.fire(
            t("point.Title"),
            t(`point.${e.response.data.message}`),
            "error"
          )
        );
      amount.value = 0
      isLoading.value = false;
    };

    const setAmount = (amt: number) =>
      amt > 0
        ? (amount.value = Number(amount.value) + Number(amt))
        : (amount.value = 0);

    const setMaxWalletPoint = () => {
      amount.value = walletPoint.value.current;
    }

    return {
      amount,
      isLoading,
      wallet,
      walletPoint,
      onPointTransfer,
      setAmount,
      setMaxWalletPoint,
    };
  },
});
</script>

<style lang="scss" scoped>
.point-transfer-content {
  background-color: transparent;
  color: #fff;
  padding: 20px;
}

.transfer-container {
  max-width: 1200px;
  margin: 0 auto;
}

// Comparison Section
.comparison-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.comparison-card {
  flex: 1;
  min-width: 300px;
  background-color: rgba(18, 2, 30, 0.8);
  border: 1px solid #320050;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
  }
}

.card-title {
  color: #e4ff23;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-content {
  .info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(50, 0, 80, 0.3);

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
  }

  .info-label {
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    min-width: 80px;
  }

  .info-value {
    flex: 1;
    margin-left: 20px;

    .form-control {
      background-color: rgba(26, 3, 45, 0.6);
      border: 1px solid rgba(50, 0, 80, 0.5);
      border-radius: 8px;
      color: #fff;
      text-align: right;
      padding: 12px 15px;
      font-size: 16px;
      font-weight: 600;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: #e4ff23;
        box-shadow: 0 0 0 2px rgba(228, 255, 35, 0.2);
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}

.transfer-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e4ff23;
  font-size: 24px;
  min-width: 60px;

  i {
    background: linear-gradient(45deg, #e4ff23, #9db20a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 8px rgba(228, 255, 35, 0.4));
  }
}

// Transfer Amount Section
.transfer-amount-section {
  background-color: rgba(18, 2, 30, 0.8);
  border: 1px solid #320050;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.section-header {
  margin-bottom: 25px;
  text-align: center;

  .section-title {
    color: #e4ff23;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.amount-input-container {
  margin-bottom: 25px;
}

.amount-input-group {
  display: flex;
  gap: 15px;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
}

.amount-input {
  flex: 1;
  background-color: rgba(26, 3, 45, 0.6);
  border: 1px solid rgba(50, 0, 80, 0.5);
  border-radius: 8px;
  color: #fff;
  text-align: center;
  padding: 15px 20px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e4ff23;
    box-shadow: 0 0 0 2px rgba(228, 255, 35, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
}

.max-amount-btn {
  background: linear-gradient(135deg, #4a4a4a, #666);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 15px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #5a5a5a, #777);
    transform: translateY(-1px);
  }
}

.quick-amount-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 25px;
}

.amount-btn {
  background: linear-gradient(135deg, #4a4a4a, #666);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;

  &:hover {
    background: linear-gradient(135deg, #5a5a5a, #777);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &.clear-btn {
    background: linear-gradient(135deg, #dc3545, #c82333);
    
    &:hover {
      background: linear-gradient(135deg, #e74c3c, #d73c2c);
    }
  }
}

.notes-section {
  text-align: center;
  margin-top: 20px;

  .notes-text {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    margin: 0;
    font-style: italic;
  }
}

// Submit Section
.submit-section {
  text-align: center;
  margin-bottom: 40px;
}

.submit-btn {
  background: linear-gradient(135deg, #e4ff23, #9db20a);
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 18px 40px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 200px;
  position: relative;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #f0ff4a, #b0c20a);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(228, 255, 35, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// History Section
.history-section {
  background-color: rgba(18, 2, 30, 0.8);
  border: 1px solid #320050;
  border-radius: 12px;
  padding: 25px;
  margin-top: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  .history-title {
    color: #e4ff23;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 20px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .point-transfer-content {
    padding: 15px;
  }

  .comparison-section {
    flex-direction: column;
    gap: 20px;
  }

  .comparison-card {
    min-width: 100%;
  }

  .transfer-arrow {
    transform: rotate(90deg);
    margin: 10px 0;
  }

  .amount-input-group {
    flex-direction: column;
    gap: 10px;
  }

  .quick-amount-buttons {
    gap: 8px;
  }

  .amount-btn {
    min-width: 70px;
    padding: 10px 15px;
    font-size: 12px;
  }

  .submit-btn {
    min-width: 100%;
    padding: 15px 20px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .quick-amount-buttons {
    justify-content: center;
  }

  .amount-btn {
    min-width: 60px;
    padding: 8px 12px;
    font-size: 11px;
  }
}
</style>
