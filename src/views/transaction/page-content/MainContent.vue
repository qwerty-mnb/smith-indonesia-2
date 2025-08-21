<template>
  <div class="main-content">
    <!-- Top Navigation Bar -->
    <div class="top-nav">
      <a href="#" class="top-nav-item active">
        <i class="fas fa-user"></i>
        MY ACCOUNT
      </a>
      <a href="#" class="top-nav-item">
        <i class="fas fa-lock"></i>
        CHANGE PASSWORD
      </a>
      <a href="#" class="top-nav-item">
        <i class="fas fa-edit"></i>
        UPDATE ACCOUNT DETAILS
      </a>
      <a href="#" class="top-nav-item">
        <i class="fas fa-file-alt"></i>
        REDEMPTION HISTORY
      </a>
    </div>

    <!-- Section Title -->
    <div class="section-title">ACCOUNT INFORMATION</div>

    <!-- Account Overview Section -->
    <div class="account-overview">
      <div class="profile-section">
        <div class="profile-info">
          <div class="profile-avatar">
            <i class="fas fa-user-circle"></i>
          </div>
          <div class="profile-details">
            <h2>Kenzo</h2>
            <div class="stats">
              <span>EXP 44929564</span>
              <span>LP 129727653</span>
              <button class="detail-btn">Detail >></button>
            </div>
          </div>
        </div>
        
        <div class="quick-actions">
          <div class="action-item">
            <i class="fas fa-money-bill-wave"></i>
            <span>DEPOSIT</span>
          </div>
          <div class="action-item">
            <i class="fas fa-money-bill-wave"></i>
            <span>WITHDRAWAL</span>
          </div>
          <div class="action-item">
            <i class="fas fa-sync-alt"></i>
            <span>REDEMPTION</span>
          </div>
        </div>
        
        <div class="referral-code">
          <div class="code-label">Referral Code:</div>
          <div class="code-value">jbiGwV3</div>
        </div>
      </div>
    </div>

    <!-- Account Information Section -->
    <div class="account-info-section">
      <div class="info-column">
        <h3>Account Information</h3>
        <div class="info-item">
          <span class="label">FULL NAME :</span>
          <span class="value">WATIKUSMAWATI</span>
        </div>
        <div class="info-item">
          <span class="label">EMAIL :</span>
          <span class="value">WATIKUSMAWATI74@GMAIL.COM</span>
        </div>
        <div class="info-item">
          <span class="label">USERNAME :</span>
          <span class="value">KENZO</span>
        </div>
        <div class="info-item">
          <span class="label">MOBILE APP USERNAME :</span>
          <span class="value">BD3KENZO@TRG</span>
        </div>
        <div class="info-item">
          <span class="label">CURRENCY :</span>
          <span class="value">IDR</span>
        </div>
      </div>
      
      <div class="banking-column">
        <div class="banking-header">
          <h3>Banking Detail</h3>
          <button class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
        </div>
        <div class="banking-info">
          <div class="account-holder">Watikusmawati</div>
          <div class="account-number">033901001610560</div>
          <div class="bank-info">
            <div class="bank-name">BANK BRI</div>
            <div class="bank-logo">BRI</div>
            <div class="bank-line"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Status Section -->
    <div class="section-title">DEPOSIT/WITHDRAW STATUS</div>
    <div class="transaction-status">
      
      <div class="status-tables">
        <div class="status-table">
          <h4>Last Deposit Status</h4>
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Date/Time GMT+8</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100,000,000.00</td>
                <td>08-Aug-2025 17:56:36</td>
                <td><span class="status approved">02554865 Approved</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="status-table">
          <h4>Last Withdrawal Status</h4>
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Date/Time GMT+8</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100,000,000.00</td>
                <td>28-Jul-2025 15:58:39</td>
                <td><span class="status approved">W2519770 Approved</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainContent'
});
</script>

<style lang="scss" scoped>
.main-content {
  flex: 1;
  //padding: 20px;

  .section-title {
    background: #2a0046;
    border: 1px solid #3b0058;
    border-radius: 6px;
    padding: 12px 16px;
    margin: 10px 0 15px;
    color: #e7ff1e;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .top-nav {
    display: flex;
    margin-bottom: 20px;
    padding: 0;
    background: #190033;
    border: 1px solid #3b0058;
    border-radius: 6px;
    overflow: hidden;

    .top-nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #ccc;
      text-decoration: none;
      padding: 12px 18px;
      border-right: 1px solid #3b0058;
      transition: background 0.25s ease, color 0.25s ease;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.5px;

      i {
        width: 22px;
        height: 22px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: transparent;
        color: #e6e6e6;
        border: 1px solid transparent;
      }

      &:hover {
        background: #22003d;
        color: #fff;
      }

      &.active {
        background: #2a0046;
        color: #e7ff1e;

        i {
          background: #e7ff1e;
          color: #1b002b;
          border-color: #e7ff1e;
        }
      }

      &:last-child {
        border-right: 0;
      }
    }
  }

  .account-overview {
    background: #120024;
    border: 1px solid #3b0058;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 30px;

    .profile-section {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .profile-info {
        display: flex;
        align-items: center;

        .profile-avatar {
          font-size: 60px;
          color: #490e9f;
          margin-right: 20px;
        }

        .profile-details {
          h2 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #e7ff1e;
          }

          .stats {
            display: flex;
            align-items: center;
            gap: 15px;

            span {
              font-size: 14px;
              color: #ccc;
            }

            .detail-btn {
              background: linear-gradient(90deg, #490e9f 0%, #6d2bd1 100%);
              color: white;
              border: none;
              padding: 5px 15px;
              border-radius: 15px;
              cursor: pointer;
              font-size: 12px;
            }
          }
        }
      }

      .quick-actions {
        display: flex;
        gap: 20px;

        .action-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
          background: rgba(73, 14, 159, 0.2);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;

          i {
            font-size: 24px;
            color: #e7ff1e;
            margin-bottom: 8px;
          }

          span {
            font-size: 12px;
            color: #ccc;
          }

          &:hover {
            background: rgba(73, 14, 159, 0.4);
            transform: translateY(-2px);
          }
        }
      }

      .referral-code {
        background: #e7ff1e;
        color: #000;
        padding: 15px 20px;
        border-radius: 8px;
        text-align: center;

        .code-label {
          font-size: 12px;
          margin-bottom: 5px;
        }

        .code-value {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

  .account-info-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;

    .info-column,
    .banking-column {
      background: #120024;
      border: 1px solid #3b0058;
      border-radius: 8px;
      padding: 25px;

      h3 {
        color: #e7ff1e;
        margin-bottom: 20px;
        font-size: 18px;
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #333;

        .label {
          color: #ccc;
          font-weight: bold;
        }

        .value {
          color: white;
        }
      }
    }

    .banking-column {
      .banking-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .edit-btn {
          background: none;
          border: none;
          color: #e7ff1e;
          font-size: 16px;
          cursor: pointer;
        }
      }

      .banking-info {
        .account-holder {
          font-size: 18px;
          color: white;
          margin-bottom: 10px;
        }

        .account-number {
          font-size: 24px;
          font-weight: bold;
          color: #e7ff1e;
          margin-bottom: 20px;
        }

        .bank-info {
          .bank-name {
            font-size: 16px;
            color: white;
            margin-bottom: 5px;
          }

          .bank-logo {
            font-size: 20px;
            font-weight: bold;
            color: #e7ff1e;
            margin-bottom: 10px;
          }

          .bank-line {
            width: 50px;
            height: 3px;
            background: #e7ff1e;
          }
        }
      }
    }
  }

  .transaction-status {
    background: #120024;
    border: 1px solid #3b0058;
    border-radius: 8px;
    padding: 25px;


    .status-tables {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;

      .status-table {
        h4 {
          color: #e7ff1e;
          margin-bottom: 15px;
          font-size: 16px;
        }

        table {
          width: 100%;
          border-collapse: collapse;

          th,
          td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #333;
          }

          th {
            background: rgba(73, 14, 159, 0.3);
            color: #e7ff1e;
            font-weight: bold;
          }

          td {
            color: #ccc;
          }

          .status {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;

            &.approved {
              background: #28a745;
              color: white;
            }
          }
        }
      }
    }
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .account-info-section,
  .status-tables {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 10px;

    .account-overview .profile-section {
      flex-direction: column;
      gap: 20px;
      text-align: center;

      .quick-actions {
        justify-content: center;
      }
    }

    .top-nav {
      flex-wrap: wrap;
      gap: 10px;
    }
  }
}
</style>
