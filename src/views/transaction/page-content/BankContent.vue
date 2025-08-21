<template>
  <div class="bank-content">
    <div class="content-header">
      <h2>Banking Management</h2>
      <p>Manage your banking information and transactions</p>
    </div>

    <!-- Banking Information Section -->
    <div class="banking-section">
      <div class="section-header">
        <h3>Current Banking Information</h3>
        <button class="edit-btn">
          <i class="fas fa-edit"></i>
          Edit Banking Details
        </button>
      </div>

      <div class="banking-cards">
        <div class="bank-card primary">
          <div class="card-header">
            <div class="bank-logo">BRI</div>
            <div class="card-type">Primary Account</div>
          </div>
          <div class="card-body">
            <div class="account-info">
              <div class="account-holder">Watikusmawati</div>
              <div class="account-number">033901001610560</div>
              <div class="bank-name">BANK BRI</div>
            </div>
            <div class="card-actions">
              <button class="action-btn">
                <i class="fas fa-eye"></i>
                View Details
              </button>
            </div>
          </div>
        </div>

        <div class="bank-card secondary">
          <div class="card-header">
            <div class="bank-logo">BCA</div>
            <div class="card-type">Secondary Account</div>
          </div>
          <div class="card-body">
            <div class="account-info">
              <div class="account-holder">Watikusmawati</div>
              <div class="account-number">1234567890</div>
              <div class="bank-name">BANK BCA</div>
            </div>
            <div class="card-actions">
              <button class="action-btn">
                <i class="fas fa-eye"></i>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Transactions Section -->
    <div class="transactions-section">
      <div class="section-header">
        <h3>Recent Banking Transactions</h3>
        <div class="filter-controls">
          <select class="filter-select">
            <option>All Transactions</option>
            <option>Deposits</option>
            <option>Withdrawals</option>
          </select>
          <button class="refresh-btn">
            <i class="fas fa-sync-alt"></i>
            Refresh
          </button>
        </div>
      </div>

      <div class="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Bank</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>08-Aug-2025 17:56:36</td>
              <td>02554865</td>
              <td><span class="type deposit">Deposit</span></td>
              <td>100,000,000.00</td>
              <td>BRI</td>
              <td><span class="status approved">Approved</span></td>
              <td>
                <button class="action-btn small">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>28-Jul-2025 15:58:39</td>
              <td>W2519770</td>
              <td><span class="type withdrawal">Withdrawal</span></td>
              <td>100,000,000.00</td>
              <td>BRI</td>
              <td><span class="status approved">Approved</span></td>
              <td>
                <button class="action-btn small">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>25-Jul-2025 10:30:15</td>
              <td>02554864</td>
              <td><span class="type deposit">Deposit</span></td>
              <td>50,000,000.00</td>
              <td>BCA</td>
              <td><span class="status pending">Pending</span></td>
              <td>
                <button class="action-btn small">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add New Bank Account Section -->
    <div class="add-bank-section">
      <div class="section-header">
        <h3>Add New Bank Account</h3>
      </div>
      <div class="add-bank-form">
        <div class="form-row">
          <div class="form-group">
            <label>Bank Name</label>
            <select class="form-control">
              <option>Select Bank</option>
              <option>BRI</option>
              <option>BCA</option>
              <option>Mandiri</option>
              <option>BNI</option>
            </select>
          </div>
          <div class="form-group">
            <label>Account Holder Name</label>
            <input type="text" class="form-control" placeholder="Enter account holder name" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Account Number</label>
            <input type="text" class="form-control" placeholder="Enter account number" />
          </div>
          <div class="form-group">
            <label>Account Type</label>
            <select class="form-control">
              <option>Savings Account</option>
              <option>Current Account</option>
            </select>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn-primary">
            <i class="fas fa-plus"></i>
            Add Bank Account
          </button>
          <button class="btn-secondary">
            <i class="fas fa-times"></i>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BankContent'
});
</script>

<style lang="scss" scoped>
.bank-content {
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

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      color: #e7ff1e;
      font-size: 20px;
    }

    .edit-btn {
      background: linear-gradient(90deg, #490e9f 0%, #6d2bd1 100%);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;

      &:hover {
        background: linear-gradient(90deg, #6d2bd1 0%, #490e9f 100%);
      }
    }

    .filter-controls {
      display: flex;
      gap: 10px;
      align-items: center;

      .filter-select {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: 1px solid #333;
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 14px;
      }

      .refresh-btn {
        background: rgba(73, 14, 159, 0.3);
        color: #e7ff1e;
        border: 1px solid #490e9f;
        padding: 8px 12px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;

        &:hover {
          background: rgba(73, 14, 159, 0.5);
        }
      }
    }
  }

  .banking-section {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 30px;

    .banking-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;

      .bank-card {
        background: rgba(73, 14, 159, 0.2);
        border: 1px solid #490e9f;
        border-radius: 8px;
        padding: 20px;
        transition: all 0.3s ease;

        &.primary {
          border-color: #e7ff1e;
          background: rgba(231, 255, 30, 0.1);
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(73, 14, 159, 0.3);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;

          .bank-logo {
            font-size: 24px;
            font-weight: bold;
            color: #e7ff1e;
          }

          .card-type {
            font-size: 12px;
            color: #ccc;
            background: rgba(73, 14, 159, 0.5);
            padding: 4px 8px;
            border-radius: 12px;
          }
        }

        .card-body {
          .account-info {
            margin-bottom: 15px;

            .account-holder {
              font-size: 16px;
              color: white;
              margin-bottom: 5px;
            }

            .account-number {
              font-size: 20px;
              font-weight: bold;
              color: #e7ff1e;
              margin-bottom: 5px;
            }

            .bank-name {
              font-size: 14px;
              color: #ccc;
            }
          }

          .card-actions {
            .action-btn {
              background: rgba(73, 14, 159, 0.3);
              color: #e7ff1e;
              border: 1px solid #490e9f;
              padding: 8px 16px;
              border-radius: 5px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 5px;
              font-size: 12px;

              &:hover {
                background: rgba(73, 14, 159, 0.5);
              }
            }
          }
        }
      }
    }
  }

  .transactions-section {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 30px;

    .transactions-table {
      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #333;
        }

        th {
          background: rgba(73, 14, 159, 0.3);
          color: #e7ff1e;
          font-weight: bold;
          font-size: 14px;
        }

        td {
          color: #ccc;
          font-size: 14px;
        }

        .type {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;

          &.deposit {
            background: #28a745;
            color: white;
          }

          &.withdrawal {
            background: #dc3545;
            color: white;
          }
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

          &.pending {
            background: #ffc107;
            color: #000;
          }
        }

        .action-btn.small {
          background: none;
          border: none;
          color: #e7ff1e;
          cursor: pointer;
          padding: 4px;
          border-radius: 3px;

          &:hover {
            background: rgba(231, 255, 30, 0.2);
          }
        }
      }
    }
  }

  .add-bank-section {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 25px;

    .add-bank-form {
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
      }

      .form-group {
        label {
          display: block;
          color: #e7ff1e;
          margin-bottom: 8px;
          font-weight: bold;
        }

        .form-control {
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid #333;
          color: white;
          padding: 10px 12px;
          border-radius: 5px;
          font-size: 14px;

          &:focus {
            outline: none;
            border-color: #490e9f;
          }

          &::placeholder {
            color: #ccc;
          }
        }
      }

      .form-actions {
        display: flex;
        gap: 15px;
        justify-content: flex-end;

        .btn-primary {
          background: linear-gradient(90deg, #490e9f 0%, #6d2bd1 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;

          &:hover {
            background: linear-gradient(90deg, #6d2bd1 0%, #490e9f 100%);
          }
        }

        .btn-secondary {
          background: rgba(73, 14, 159, 0.3);
          color: #e7ff1e;
          border: 1px solid #490e9f;
          padding: 12px 24px;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;

          &:hover {
            background: rgba(73, 14, 159, 0.5);
          }
        }
      }
    }
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .banking-cards {
    grid-template-columns: 1fr !important;
  }

  .form-row {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 768px) {
  .bank-content {
    padding: 10px;
  }

  .section-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .filter-controls {
    justify-content: center;
  }
}
</style>
