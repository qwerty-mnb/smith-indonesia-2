<template>
  <div class="home-inner-container" bis_skin_checked="1">
    <div data-section="jackpot" bis_skin_checked="1">
      <a href="/desktop/slots/pragmatic?PromotionCategory=Jackpot+Play+Games">
        <div class="home-progressive-jackpot" bis_skin_checked="1">
          <div class="outer-container" bis_skin_checked="1">
            <div class="inner-container" bis_skin_checked="1">
              <div class="border-container" bis_skin_checked="1">
                <div class="jackpot-play-section" bis_skin_checked="1">
                  <picture
                    ><source
                      srcset="
                        //d2rzzcn1jnr24x.cloudfront.net/Images/jackpot/jackpot-play-logo-v2.webp?v=20250529
                      "
                      type="image/webp" />
                    <source
                      srcset="
                        //d2rzzcn1jnr24x.cloudfront.net/Images/jackpot/jackpot-play-logo-v2.png?v=20250529
                      "
                      type="image/png" />
                    <img
                      alt="Jackpot Play"
                      class="jackpot-play"
                      height="150"
                      loading="lazy"
                      src="//d2rzzcn1jnr24x.cloudfront.net/Images/jackpot/jackpot-play-logo-v2.png?v=20250529"
                      width="NexusAlpha"
                  /></picture>
                  <div class="jackpot-play-text" bis_skin_checked="1">
                    Jackpot <label>Play</label>
                  </div>
                </div>
                <div class="jackpot-container" bis_skin_checked="1">
                  <div class="jackpot-inner-container" bis_skin_checked="1">
                    <div class="jackpot-border-container" bis_skin_checked="1">
                      <span class="jackpot-currency">IDR</span>
                      <span
                        id="progressive_jackpot"
                        data-progressive-jackpot-url="https://jp-api.namesvr.dev"
                        >{{ jackpotFormatted }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div data-section="lottery" bis_skin_checked="1">
      <div class="lottery-result-container" bis_skin_checked="1">
        <div class="lottery-result-title" bis_skin_checked="1">SINGAPORE 4D</div>
        <div class="lottery-result" bis_skin_checked="1">
          <picture
            ><source
              srcset="
                //d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/singapore-pools.webp?v=20250529
              "
              type="image/webp" />
            <source
              srcset="
                //d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/singapore-pools.png?v=20250529
              "
              type="image/png" />
            <img
              alt="Singapore Pools"
              height="43"
              loading="lazy"
              src="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/singapore-pools.png?v=20250529"
              width="43"
          /></picture>
          <div class="lottery-numbers" bis_skin_checked="1">
            <span
              data-lottery-number="7"
              style="
                --image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/numbers.png?v=20250529);
              "
            ></span>
            <span
              data-lottery-number="4"
              style="
                --image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/numbers.png?v=20250529);
              "
            ></span>
            <span
              data-lottery-number="7"
              style="
                --image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/numbers.png?v=20250529);
              "
            ></span>
            <span
              data-lottery-number="7"
              style="
                --image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/numbers.png?v=20250529);
              "
            ></span>
          </div>
        </div>
        <div class="lottery-date" bis_skin_checked="1">
          Live Draw Min, 17-Agt-2025 02.00.00
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Reactive data for jackpot amount
const jackpotAmount = ref(8299256285);
const jackpotFormatted = ref("8,299,256,285");
const isUpdating = ref(false);

// Lottery data
const lotteryNumbers = ref(["7", "4", "7", "7"]);
const lotteryDate = ref("Min, 17-Agt-2025 02.00.00");
const isLiveDraw = ref(true);

// API configuration
const jackpotApiUrl = "https://jp-api.namesvr.dev";
const updateInterval = ref<ReturnType<typeof setInterval> | null>(null);

// Function to format jackpot amount with Indonesian locale
const formatJackpotAmount = (amount: number): string => {
  return new Intl.NumberFormat("id-ID").format(amount);
};

// Function to update jackpot amount
const updateJackpotAmount = (amount: number) => {
  jackpotAmount.value = amount;
  jackpotFormatted.value = formatJackpotAmount(amount);
};

// Function to simulate jackpot increase (for demo purposes)
const simulateJackpotIncrease = () => {
  if (!isUpdating.value) {
    isUpdating.value = true;
    
    // Simulate random increase between 1 and 999 (3 digits max)
    const increase = Math.floor(Math.random() * 999) + 1;
    const newAmount = jackpotAmount.value + increase;
    
    // console.log(
    //   `Jackpot increased by ${increase.toLocaleString(
    //     "id-ID"
    //   )} to ${newAmount.toLocaleString("id-ID")}`
    // );
    updateJackpotAmount(newAmount);
    
    // Reset updating flag
    setTimeout(() => {
      isUpdating.value = false;
    }, 100);
  }
};

// Function to fetch real jackpot data from API
const fetchJackpotData = async () => {
  try {
    // Simulate API call - replace with actual API endpoint
    const response = await fetch(`${jackpotApiUrl}/jackpot`);
    if (response.ok) {
      const data = await response.json();
      updateJackpotAmount(data.amount || jackpotAmount.value);
    }
  } catch (error) {
    console.log("API failed, using simulated jackpot data");
    // Fallback to simulated data if API fails
    simulateJackpotIncrease();
  }
};

// Function to update lottery numbers
const updateLotteryNumbers = (numbers: string[]) => {
  lotteryNumbers.value = numbers;
};

// Function to update lottery date
const updateLotteryDate = (date: string) => {
  lotteryDate.value = date;
};

// Function to start jackpot updates
const startJackpotUpdates = () => {
  // Update every 2 seconds for testing (change to 30000 for production)
  updateInterval.value = setInterval(() => {
    // console.log("Auto-updating jackpot...");
    simulateJackpotIncrease();
  }, 2000);
};

// Function to stop jackpot updates
const stopJackpotUpdates = () => {
  if (updateInterval.value) {
    clearInterval(updateInterval.value);
    updateInterval.value = null;
  }
};

// Function to handle jackpot click (for testing)
const handleJackpotClick = () => {
  simulateJackpotIncrease();
};

onMounted(() => {
  console.log("Jackpot component mounted");

  // Initialize with current time
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Format current date for lottery
  const currentDate = now.toLocaleDateString("id-ID", options);
  updateLotteryDate(currentDate);

  // Start jackpot updates
  startJackpotUpdates();

  // Initial jackpot fetch and immediate update
  fetchJackpotData();

  // Force an immediate update for testing
  setTimeout(() => {
    console.log("Forcing immediate jackpot update...");
    simulateJackpotIncrease();
  }, 1000);
});

onUnmounted(() => {
  // Clean up intervals
  stopJackpotUpdates();
  console.log("Jackpot component unmounted");
});

// Expose functions for external use
defineExpose({
  updateJackpotAmount,
  updateLotteryNumbers,
  updateLotteryDate,
  startJackpotUpdates,
  stopJackpotUpdates,
});
</script>
