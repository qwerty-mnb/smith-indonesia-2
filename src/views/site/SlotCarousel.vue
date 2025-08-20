<template>
	<div class="slot-carousel">
		<button class="nav-btn nav-left" :class="{ disabled: currentIndex === 0 }" @click="prev" aria-label="Previous">
			<span>‹</span>
		</button>
		<div class="viewport">
			<div class="track" :style="trackStyle" ref="trackRef">
				<div v-for="item in items" :key="item.id" class="sc-item">
					<div class="card">
						<div class="logo-wrap">
							<!-- Dummy logo area -->
							<div class="logo-text">{{ item.logo }}</div>
							<div class="badge">7</div>
						</div>
						<div class="title">{{ item.name }}</div>
					</div>
				</div>
			</div>
		</div>
		<button class="nav-btn nav-right" :class="{ disabled: currentIndex === maxIndex }" @click="next" aria-label="Next">
			<span>›</span>
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';

interface SlotItem {
	id: number;
	name: string;
	logo: string; // Using text placeholders for dummy logos
}

export default defineComponent({
	name: 'SlotCarousel',
	setup() {
		const items = ref<SlotItem[]>([
			{ id: 1, name: 'Slot88 x PP', logo: 'Slot88' },
			{ id: 2, name: 'Hacksaw', logo: 'HACKSAW' },
			{ id: 3, name: 'Fat Panda', logo: 'FAT PANDA' },
			{ id: 4, name: 'No Limit City', logo: 'NOLIMIT' },
			{ id: 5, name: 'Jili', logo: 'JILI' },
			{ id: 6, name: 'Habanero', logo: 'HABANERO' },
			{ id: 7, name: 'Pragmatic Play', logo: 'PRAGMATIC' },
			{ id: 8, name: 'PG Soft', logo: 'PG SOFT' },
			{ id: 9, name: 'Spadegaming', logo: 'SPADE' },
			{ id: 10, name: 'Booongo', logo: 'BOOONGO' }
		]);

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
			updateVisibleCount();
			window.addEventListener('resize', () => {
				updateVisibleCount();
				measureItemStep();
			});
			measureItemStep();
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

		const trackStyle = computed(() => ({
			transform: `translateX(-${currentIndex.value * itemStepPx.value}px)`
		}));

		return { items, trackStyle, next, prev, currentIndex, maxIndex, trackRef };
	}
});
</script>

<style scoped lang="scss">
.slot-carousel {
	position: relative;
	background: #e7ff1e; /* neon lime background like reference */
	padding: 8px 42px; /* leave room for arrows */
	max-height: 120px;
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
}

.sc-item {
	flex: 0 0 220px; /* keep in sync with step size */
	height: 100%;
}

.card {
	background: #0f0e16;
	border: 1px solid #e7ff1e; /* neon yellow border */
	box-shadow: none;
	color: #fff;
	display: flex;
	flex-direction: column;
	height: 100%;
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
	font-size: 30px;
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
	height: 28px;
	line-height: 28px;
	padding: 0 6px;
	font-size: 13px;
	color: #ffffff;
}

.nav-btn {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 26px;
	height: 26px;
	border-radius: 50%;
	border: 2px solid #6d2bd1;
	background: #490e9f;
	color: #ffffff;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: filter 0.2s ease;
	z-index: 2;
}

.nav-btn:hover { filter: brightness(1.15); }
.nav-btn.disabled { opacity: 0.5; cursor: default; }

.nav-left { left: 6px; }
.nav-right { right: 6px; }

@media (max-width: 1024px) {
	.sc-item { flex-basis: 200px; }
}

@media (max-width: 640px) {
	.sc-item { flex-basis: 180px; }
	.logo-wrap { height: calc(100% - 28px); }
}
</style>

