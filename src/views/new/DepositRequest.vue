<template>
  <div class="standard-form-content deposit-container" bis_skin_checked="1">
    <form
      action="/Wallet/BankDeposit"
      enctype="multipart/form-data"
      id="deposit_form"
      method="post"
      name="depositForm"
      novalidate="novalidate"
    >
      <div class="form-group deposit-form-group" bis_skin_checked="1">
        <div data-section="input" bis_skin_checked="1">
          <span
            class="field-validation-valid"
            data-valmsg-for="PaymentType"
            data-valmsg-replace="true"
          ></span>
        </div>
        <hr class="deposit-gap" />
      </div>
      <div class="form-group deposit-form-group" bis_skin_checked="1">
        <label for="Amount">
          Amount
          <span data-section="asterisk">*</span>
        </label>
        <div
          class="deposit-amount-container"
          data-section="depo-amount"
          bis_skin_checked="1"
        >
          <div data-section="depo-input" bis_skin_checked="1">
            <div
              data-field="amount"
              class="deposit-amount"
              data-currency="idr"
              bis_skin_checked="1"
            >
              <div class="currency-label" bis_skin_checked="1">IDR</div>
              <input
                type="text"
                class="form-control deposit_amount_display"
                inputmode="decimal"
              />
              <input
                autocomplete="off"
                class="form-control deposit_amount_input"
                data-val="true"
                data-val-required="The Amount field is required."
                id="Amount"
                inputmode="decimal"
                name="Amount"
                type="hidden"
                value="0"
              />
              <div class="currency-suffix" bis_skin_checked="1">.000,-</div>
            </div>
          </div>
        </div>
      </div>

      <div class="standard-button-group" bis_skin_checked="1">
        <input type="submit" class="btn btn-primary" value="SUBMIT" />
      </div>
    </form>
  </div>
</template>

<style lang="scss">
/* Essential styles for the current template */
.deposit-container {
  .deposit-form-group {
    background-color: transparent;
    padding: 10px 0;
    margin-bottom: 0;
    border-radius: 5px;
  }

  .deposit-gap {
    margin: 20px 0 5px 0;
    height: 1px;
    border: none;
    background: linear-gradient(to right, transparent, #fff, transparent);
  }

  .deposit-amount-container {
    background-color: transparent;
    color: #fff;
    border-radius: 5px;

    [data-section="depo-input"] {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    input[type="text"] {
      background-color: #12021e;
      color: inherit;
      border-radius: 5px;
      border: 1px solid #320050;
    }

    [data-field="amount"] {
      flex-basis: 100%;
    }

    input {
      width: 100%;
    }
  }

  .deposit-amount {
    position: relative;
    display: flex;
    align-items: center;
    line-height: normal;

    input.form-control {
      font-size: inherit;
      text-align: right;
      padding-right: 18px;
    }

    &[data-currency="idr"] input.form-control {
      padding-right: 45px;
    }

    .currency-label {
      position: absolute;
      left: 12px;
    }

    .currency-suffix {
      position: absolute;
      right: 12px;
      pointer-events: none;
    }
  }

  .standard-button-group {
    margin-top: 15px;

    .btn-primary {
      width: 300px;
    }
  }
}
</style>