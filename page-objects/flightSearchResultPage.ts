import { Page, Locator, expect } from '@playwright/test';

export class FlightSearchResultPage {
    readonly page: Page;
    readonly selectButtons: Locator;
    readonly cheapestSortButton: Locator;
    readonly priceSections: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectButtons = page.locator('button.text-brand-3[data-testid="select-button"]');
        this.cheapestSortButton = page.getByTestId('CHEAPEST-sort');
        this.priceSections = page.getByTestId('price-section')
    }

    async printAllPrices() {
        const count = await this.priceSections.count();
        console.log('Total flights found: ', count);

        const prices: string[] = [];
        for (let i = 0; i < count; i++) {
            await this.priceSections.nth(i).locator('p').nth(1).scrollIntoViewIfNeeded({timeout:5000});
            const priceText = await this.priceSections.nth(i).locator('p').nth(1).textContent({ timeout: 5000 });
            prices.push(priceText?.trim() || '');
        }
        console.log('Flight prices: ', prices);
    }
}
