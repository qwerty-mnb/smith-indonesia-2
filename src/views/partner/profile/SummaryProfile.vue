<template>
  <div class="d-flex flex-column flex-root summary-info justify-content-center">
    <div class="summary-logo">
      <img src="/img/logo/logo.webp" class="img-logo" alt="LOGO">
    </div>
    <!-- Header -->
    <div class="summary-header">
      <span>[{{$t("Partner.Parent" + userdata.depth )}}] {{ userdata.username }} / {{ userdata.name }}</span>
    </div>
    <div class="summary-content">
      <div class="d-flex flex-wrap mx-3">
        <!-- State -->
        <div class="col-lg-6 col-md-6 col-sm-12 row">
          <div class="col-md-6 col-sm-9 text-left">
            <i class="fa-solid fa-wifi"></i>{{ $t("depWid.State") }}
          </div>
          <div class="col-md-6 col-sm-3 text-left">{{ userdata.status }}</div>
        </div>
        <!-- Rate -->
        <div class="col-lg-6 col-md-6 col-sm-12 row">
          <div class="col-md-6 col-sm-9 text-left">
            <i class="fa-solid fa-star"></i>{{ $t("Partner.Rate") }}
          </div>
          <div class="col-md-6 col-sm-3 text-left">{{ userdata.level }}</div>
        </div>
        <!-- Difference -->
        <div class="col-lg-6 col-md-6 col-sm-12 row">
          <div class="col-md-6 col-sm-9 text-left">
            <i class="fa-solid fa-user-plus"></i>{{ $t("Partner.Difference") }}
          </div>
          <div class="col-md-6 col-sm-3 text-left">
            {{ userdata.tree }}
          </div>
        </div>
        <!-- Money -->
        <div class="col-lg-6 col-md-6 col-sm-12 row mt-2">
          <div class="col-md-6 col-sm-9 text-left">
            <i class="fa-solid fa-dollar-sign"></i>{{ $t("Partner.Money") }}
          </div>
          <div class="col-md-6 col-sm-3 text-left">
            {{ $n(parseInt(userdata.wallet)) }}
          </div>
        </div>
        <!-- Point -->
        <div class="col-lg-6 col-md-6 col-sm-12 row mt-2">
          <div class="col-md-6 col-sm-9 text-left">
            <i class="fa-solid fa-plus-circle"></i>{{ $t("Partner.Point") }}
          </div>
          <div class="col-md-6 col-sm-3 text-left">
            {{ $n(parseInt(userdata.wallet_point)) }}
          </div>
        </div>
        <!-- TotalDeposit -->
        <div class="col-lg-6 col-md-6 col-sm-12 row mt-2">
          <div class="col-md-6 col-sm-9 text-left">
            <i class="fa-solid fa-door-open"></i>{{ $t("Partner.TotalDeposit") }}
          </div>
          <div class="col-md-6 col-sm-3 text-left">
            {{ $n(parseInt(userdata.deposits)) }}
          </div>
        </div>
        <!-- TotalWithdraw -->
        <div class="col-lg-6 col-md-6 col-sm-12 row mt-2">
          <div class="col-md-6 col-sm-9 text-left">
            <i class="fa-solid fa-door-open"></i>{{ $t("Partner.TotalWithdraw") }}
          </div>
          <div class="col-md-6 col-sm-3 text-left">
            {{ $n(parseInt(userdata.withdrawals)) }}
          </div>
        </div>
        <!-- Total Withdraw And Deposit -->
        <div class="col-lg-6 col-md-6 col-sm-12 row mt-2">
          <div class="col-md-6 col-sm-9 text-left">
            <i class="fa-solid fa-arrows-split-up-and-left"></i
            >{{ $t("Partner.TotalDepNWid") }}
          </div>
          <div class="col-md-6 col-sm-3 text-left">{{ $n(parseInt(userdata.sonic)) }}</div>
        </div>
        <!-- NickName -->
        <div class="col-lg-6 col-md-6 col-sm-12 row mt-2">
          <div class="col-md-6 col-sm-9 text-left">
            <i class="fa-solid fa-newspaper"></i>{{ $t("Partner.Name") }}
          </div>
          <div class="col-md-6 col-sm-3 text-left">{{ userdata.name }}</div>
        </div>
        <!-- Tel no -->
        <div class="col-lg-6 col-md-6 col-sm-12 row mt-2">
          <div class="col-md-6 col-sm-9 text-left">
            <i class="fa-solid fa-phone"></i>{{ $t("Partner.TelNo") }}
          </div>
          <div class="col-md-6 col-sm-3 text-left">{{ userdata.mobile }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "SummaryProfile",
  components: {},
  props: {
    userdata: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();
  }
});
</script>
  