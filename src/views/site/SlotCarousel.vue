<template>
	<div class="slot-carousel">
		<button class="nav-btn nav-left" :class="{ disabled: currentIndex === 0 }" @click="prev" aria-label="Previous">
			<i class="bi bi-chevron-left"></i>
		</button>
		<div class="viewport">
			<div class="track" :style="trackStyle" ref="trackRef">
				<div v-for="item in items" :key="item.id" class="sc-item" @click="goTo(item)">
					<div class="card">
						<div class="logo-wrap">
							<!-- Dummy logo area -->
							<div class="logo-text">{{ item.logo }}</div>
						</div>
						<div class="title">{{ $t(item.code) }}</div>
					</div>
				</div>
			</div>
		</div>
		<button class="nav-btn nav-right" :class="{ disabled: currentIndex === maxIndex }" @click="next" aria-label="Next">
			<i class="bi bi-chevron-right"></i>
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';

interface SlotItem {
	id: number;
	name: string;
	logo: string; // Rendered as large text for now
	code: string;
	provider: string;
}

interface Game {
  code: string;
  provider: string;
  sort: number;
  type: string;
}

export default defineComponent({
	name: 'SlotCarousel',
	setup() {

		const games = ref({
			slotGames: [] as Game[],
			casinoGames: [] as Game[],
		});

		const lobbies = ref<Game[]>([])

		// Function to fetch games
		const getGames = async (): Promise<void> => {
			try {
				const response = await ApiService.get("/site/games")
				lobbies.value = response.data

				if (lobbies.value.length > 0) {
					games.value.slotGames = lobbies.value.filter(g => g.type === 'SLOT')
					games.value.casinoGames = lobbies.value.filter(g => g.type === 'CASINO' || g.type === "HOTEL")
				}
				
			} catch (error) {
				console.error('Failed to fetch games:', error)
			}
		}

		// Helper to format provider/code into a readable name
		const prettifyName = (raw?: string): string => {
			if (!raw) return '';
			const spaced = raw.replace(/[_-]+/g, ' ').trim();
			return spaced
				.split(' ')
				.filter(Boolean)
				.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
				.join(' ');
		};

		const items = computed<SlotItem[]>(() => {
			const slots = games.value.slotGames;
			return (slots || []).slice(0, 10).map((g, idx) => ({
				id: idx + 1,
				name: prettifyName(g.provider || g.code),
				logo: (g.code || g.provider || '').toUpperCase(),
				code: g.code || '',
				provider: g.provider || '',
			}));
		});

		const currentIndex = ref(0);
		const visibleCount = ref(6);
		const itemStepPx = ref(220); // measured width + gap
		const trackRef = ref<HTMLElement | null>(null);

		const updateVisibleCount = () => {
			const width = window.innerWidth;
			if (width < 640) visibleCount.value = 2;
			else if (width < 768) visibleCount.value = 3;
			else if (width < 1024) visibleCount.value = 4;
			else if (width < 1280) visibleCount.value = 5;
			else visibleCount.value = 6;
		};

		onMounted(() => {
			getGames().then(() => {
				measureItemStep();
			});
			updateVisibleCount();
			window.addEventListener('resize', () => {
				updateVisibleCount();
				measureItemStep();
			});
		});

		onBeforeUnmount(() => {
			window.removeEventListener('resize', updateVisibleCount);
		});

		const maxIndex = computed(() => Math.max(0, items.value.length - visibleCount.value));

		const measureItemStep = () => {
			const trackEl = trackRef.value as HTMLElement | null;
			const firstItem = trackEl?.querySelector('.sc-item') as HTMLElement | null;
			if (trackEl && firstItem) {
				const styles = getComputedStyle(trackEl);
				const gapStr = (styles as any).columnGap || styles.gap || '0';
				const gap = parseFloat(gapStr as string);
				itemStepPx.value = firstItem.offsetWidth + (isNaN(gap) ? 0 : gap);
			}
		};

		const next = () => {
			currentIndex.value = Math.min(currentIndex.value + 1, maxIndex.value);
		};

		const prev = () => {
			currentIndex.value = Math.max(currentIndex.value - 1, 0);
		};

		// Navigate to the slot page when a card is clicked
		const router = useRouter();
		const goTo = (item: SlotItem) => {
			if (!item.provider || !item.code) return;
			router.push(`/desktop/slots/${item.provider}/${item.code}`);
		};

		const trackStyle = computed(() => ({
			transform: `translateX(-${currentIndex.value * itemStepPx.value}px)`
		}));

		return { items, trackStyle, next, prev, currentIndex, maxIndex, trackRef, goTo };
	}
});
</script>

<style scoped lang="scss">
.slot-carousel {
	position: relative;
	background: #e7ff1e; /* neon lime background like reference */
	padding: 8px 42px; /* leave room for arrows */
	height: 115px; /* slightly taller */
	margin: 20px auto;
	max-width: 1140px;
	overflow: hidden;
}

.viewport {
	overflow: hidden;
	height: 100%;
}

.track {
	display: flex;
	gap: 8px;
	transition: transform 0.35s ease;
	height: 100%;
	align-items: stretch;
}

.sc-item {
	/* enforce identical widths for every card */
	width: 168px;
	min-width: 168px;
	max-width: 168px;
	flex: 0 0 168px;
	height: 100%;
	display: flex;
	cursor: pointer;
}

.card {
	background: #0f0e16;
	border: 1px solid #e7ff1e; /* neon yellow border */
	box-shadow: none;
	color: #fff;
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
}

.logo-wrap {
	position: relative;
	height: calc(100% - 28px);
	display: flex;
	align-items: center;
	justify-content: center;
	background: #0f0e16;
}

.logo-text {
	font-weight: 800;
	letter-spacing: 1px;
	font-size: 20px;
	background: linear-gradient(180deg, #ffffff 0%, #bbbbbb 100%);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	text-transform: uppercase;
	text-align: center;
}

.badge {
	position: absolute;
	top: 6px;
	right: 6px;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background: #490e9f;
	border: 2px solid #6d2bd1;
	color: #d7a7ff;
	font-weight: 700;
	font-size: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.title {
	text-align: center;
	height: 24px; /* slightly shorter title to reduce bottom space */
	line-height: 24px;
	padding: 0 6px;
	font-size: 13px;
	color: #ffffff;
}

.nav-btn {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 32px;
	height: 32px;
	border: none;
	background: transparent;
	color: #490e9f;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.2s ease;
	z-index: 2;
}

.nav-btn:hover { 
	color: #6d2bd1;
}
.nav-btn.disabled { 
	opacity: 0.4; 
	cursor: default; 
	color: #2a0a4a;
}

.nav-btn i {
	font-size: 16px;
	font-weight: 900;
	line-height: 1;
	-webkit-text-stroke: 2px #490e9f;
	text-stroke: 2px #490e9f;
}

.nav-left { left: 8px; }
.nav-right { right: 8px; }

@media (max-width: 1024px) {
	.sc-item { flex-basis: 200px; }
}

@media (max-width: 640px) {
	.sc-item { flex-basis: 180px; }
	.logo-wrap { height: calc(100% - 28px); }
}
</style>

