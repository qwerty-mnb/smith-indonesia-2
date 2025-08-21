# Services Documentation

## GameService

The `GameService` provides utility functions for handling game operations, particularly money transfer logic when opening games.

### Usage

```typescript
import { GameService, type Game } from "@/services/GameService";

// Basic game opening with money transfer logic
const openGame = async (provider: string, game: Game, settings: any) => {
  const result = await GameService.openGame(provider, game, settings);
  // result contains: { provider, game, status: true }
  return result;
};

// Individual money transfer operations
const depositResult = await GameService.handleMoneyTransferDeposit("SNOW_SNOW2", 100);
const withdrawalResult = await GameService.handleMoneyTransferWithdrawal();
const balance = await GameService.getMoneyTransferBalance();
```

### Methods

#### `openGame(provider: string, game: Game, settings: any): Promise<GameOpenResult>`
Main method that handles the complete game opening process including money transfer logic.

#### `handleMoneyTransferDeposit(provider: string, amount: number): Promise<boolean>`
Handles money transfer deposit for specific providers (SNOW_SNOW2, KH).

#### `handleMoneyTransferWithdrawal(): Promise<boolean>`
Handles money transfer withdrawal operations.

#### `getMoneyTransferBalance(): Promise<number>`
Retrieves the current money transfer balance.

### Interfaces

#### `Game`
```typescript
interface Game {
  code: string;
  img_url: string;
  img_url_2: string;
  ko_title?: string;
  [key: string]: any;
}
```

#### `GameOpenResult`
```typescript
interface GameOpenResult {
  provider: string;
  game: Game;
  status: boolean;
}
```

### Example Implementation

```vue
<template>
  <button @click="handleGameClick">Play Game</button>
</template>

<script setup lang="ts">
import { GameService, type Game } from "@/services/GameService";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();

const handleGameClick = async () => {
  const game: Game = {
    code: "game123",
    img_url: "/img/game.jpg",
    img_url_2: "/img/game2.jpg"
  };
  
  const result = await GameService.openGame("PROVIDER_NAME", game, appStore.settings);
  console.log("Game opened:", result);
};
</script>
```
