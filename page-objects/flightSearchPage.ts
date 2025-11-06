import { Page, Locator, expect } from '@playwright/test';

export class FlightSearchPage {
    readonly page: Page;
    readonly adCloseButton: Locator;
    readonly oneWayRadio: Locator;
    readonly roundTripRadio: Locator;
    readonly multiCityRadio: Locator;
    readonly departureDateInput: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adCloseButton = page.locator('button:has(img[src*="close.svg"])');
        this.oneWayRadio = page.getByTestId('One Way-input');
        this.roundTripRadio = page.getByTestId('Round Trip-input');
        this.multiCityRadio = page.getByTestId('Multi City-input');
        this.departureDateInput = page.locator('button[data-testid="departure-date-input-form-1"]');
        this.searchButton = page.getByTestId('search-flight-button');
    }

    async navigateToFlightPage() {
        await this.page.goto('https://firsttrip.com/flight');
        if (await this.adCloseButton.count() > 0) {
            await this.adCloseButton.click({ timeout: 10000 });
        }
        await Promise.all([
            expect.soft(this.oneWayRadio, 'One Way radio button will be clickable').toBeEnabled({ timeout: 5000 }),
            expect.soft(this.roundTripRadio, 'Round Trip radio button will be clickable').toBeEnabled({ timeout: 5000 }),
            expect.soft(this.multiCityRadio, 'Multi City radio button will be clickable').toBeEnabled({ timeout: 5000 }),
        ]);
    }

    async selectFlightType(flightType: 'One Way' | 'Round Trip' | 'Multi City') {
        switch (flightType) {
            case 'One Way':
                await this.oneWayRadio.click({ timeout: 10000 });
                break;
            case 'Round Trip':
                await this.roundTripRadio.click({ timeout: 10000 });
                break;
            case 'Multi City':
                await this.multiCityRadio.click({ timeout: 10000 });
                break;
            default:
                throw new Error(`Invalid flight type: ${flightType}`);
        }
    }

    async selectDepartureDate(date: string) {
        const targetDate = new Date(date);
        const dayNumber = targetDate.getDate();
        await this.departureDateInput.click({ timeout: 5000 });
        const dayLocator = this.page
            .locator('.react-datepicker__day')
            .filter({ hasText: new RegExp(`^${dayNumber}$`) })
            .first();
        await dayLocator.click({ timeout: 5000 });
    }

    async searchFlights() {
        await this.searchButton.click({ timeout: 5000 });
    }
}
