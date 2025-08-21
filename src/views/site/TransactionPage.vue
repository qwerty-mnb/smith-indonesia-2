<template>
	<div>
		<TopBar />
		<SiteHeader />
		<div class="container mx-auto px-4">
			<div class="transaction-page">
				<!-- Left Sidebar -->
				<div class="sidebar">
					<div class="user-info">
						<div class="username">kenzo</div>
						<div class="last-login">Last Login: 20-Aug-2025 22:04:10</div>
					</div>

					<div class="nav-section">
						<h3>ACCOUNT CENTER</h3>
						<nav class="nav-menu">
							<router-link to="/desktop/account" class="nav-item" :class="{ active: type === 'account' }">
								<i class="fas fa-user"></i>
								MY ACCOUNT
							</router-link>
							<router-link to="/desktop/bank" class="nav-item" :class="{ active: type === 'bank' }">
								<i class="fas fa-university"></i>
								BANK
							</router-link>
							<router-link to="/desktop/bonus" class="nav-item" :class="{ active: type === 'bonus' }">
								<i class="fas fa-gift"></i>
								CLAIM BONUS
							</router-link>
							<router-link to="/desktop/reward" class="nav-item" :class="{ active: type === 'reward' }">
								<i class="fas fa-star"></i>
								LOYALTY REWARD
							</router-link>
							<router-link to="/desktop/report" class="nav-item" :class="{ active: type === 'report' }">
								<i class="fas fa-file-alt"></i>
								BET REPORT
							</router-link>
							<router-link to="/desktop/message" class="nav-item" :class="{ active: type === 'message' }">
								<i class="fas fa-envelope"></i>
								MESSAGE <span class="badge">(5)</span>
							</router-link>
							<router-link to="/desktop/referral" class="nav-item" :class="{ active: type === 'referral' }">
								<i class="fas fa-users"></i>
								REFERRAL
							</router-link>
							<a href="#" class="nav-item">
								<i class="fas fa-download"></i>
								DOWNLOAD GAME APPLICATION
							</a>
						</nav>
					</div>
				</div>

				<!-- Dynamic Content Based on Route Type -->
				<div class="content-area">
					<component :is="currentContentComponent" />
				</div>
			</div>
		</div>
		<SiteFooter />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import SiteHeader from "@/layouts/new/SiteHeader.vue";
import TopBar from "@/layouts/new/TobBar.vue";
import MainContent from "@/views/transaction/page-content/MainContent.vue";
import BankContent from "@/views/transaction/page-content/BankContent.vue";
import BonusContent from "@/views/transaction/page-content/BonusContent.vue";
import RewardContent from "@/views/transaction/page-content/RewardContent.vue";
import ReportContent from "@/views/transaction/page-content/ReportContent.vue";
import MessageContent from "@/views/transaction/page-content/MessageContent.vue";
import ReferralContent from "@/views/transaction/page-content/ReferralContent.vue";

export default defineComponent({
	name: 'TransactionPage',
	components: {
		SiteHeader,
		TopBar,
		MainContent,
		BankContent,
		BonusContent,
		RewardContent,
		ReportContent,
		MessageContent,
		ReferralContent
	},
	setup() {
		const route = useRoute();

		const type = computed(() => route.params.type as string);

		const currentContentComponent = computed(() => {
			switch (type.value) {
				case 'account':
					return 'MainContent';
				case 'bank':
					return 'BankContent';
				case 'bonus':
					return 'BonusContent';
				case 'reward':
					return 'RewardContent';
				case 'report':
					return 'ReportContent';
				case 'message':
					return 'MessageContent';
				case 'referral':
					return 'ReferralContent';
				default:
					return 'MainContent';
			}
		});

		return {
			type,
			currentContentComponent
		};
	}
});
</script>

<style lang="scss" scoped>
.transaction-page {
	display: flex;
	gap: 20px;
	min-height: 100vh;
	background: transparent;
	color: white;
	font-family: 'Arial', sans-serif;
	margin-top: 20px;
}

// Sidebar Styles
.sidebar {
	width: 280px;
	//background: rgba(0, 0, 0, 0.8);
	background: #320050;
	border-right: 1px solid #333;
	padding: 20px 0;

	.user-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 10px 10px;
		border-bottom: 1px solid #333;

		.username {
			font-size: 18px;
			font-weight: bold;
			color: #e7ff1e;
			margin-bottom: 5px;
		}

		.last-login {
			font-size: 12px;
			color: #ccc;
		}
	}

	.nav-section {
		padding: 20px;
		background: #1b002b;

		h3 {
			font-size: 14px;
			color: #e7ff1e;
			margin-bottom: 15px;
			text-transform: uppercase;
			letter-spacing: 1px;
		}

		.nav-menu {
			.nav-item {
				display: flex;
				align-items: center;
				padding: 12px 15px;
				color: #ccc;
				text-decoration: none;
				border-radius: 0;
				margin-bottom: 5px;
				transition: all 0.3s ease;

				i {
					margin-right: 10px;
					width: 16px;
					text-align: center;
				}

				.badge {
					background: #e7ff1e;
					color: #000;
					padding: 2px 6px;
					border-radius: 10px;
					font-size: 10px;
					margin-left: auto;
				}

				&:hover,
				&.active {
					background: linear-gradient(90deg, #490e9f 0%, #6d2bd1 100%);
					color: white;
				}

				// Router link specific styling
				&.router-link-active {
					//background: linear-gradient(90deg, #490e9f 0%, #6d2bd1 100%);
					background: #320050;
					color: white;
				}
			}
		}
	}
}


.content-area {
	flex: 1;
	background: #1b002b;
	border-radius: 0;
	padding: 20px;
}



// Responsive Design
@media (max-width: 1024px) {
	.transaction-page {
		flex-direction: column;

		.sidebar {
			width: 100%;
			border-right: none;
			border-bottom: 1px solid #333;
		}
	}
}
</style>
