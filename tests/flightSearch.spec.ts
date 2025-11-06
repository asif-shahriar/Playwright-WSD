import { test, expect } from '@playwright/test';
import { FlightSearchPage } from '../page-objects/flightSearchPage';
import { getTomorrowDate } from '../helpers/formatters';
import { FlightSearchResultPage } from '../page-objects/flightSearchResultPage';

let flightSearch: FlightSearchPage;
let flightSearchResult: FlightSearchResultPage;

test('TC-01 | select one way and search for tomorrow flights', async ({ page }) => {
  flightSearch = new FlightSearchPage(page);
  flightSearchResult = new FlightSearchResultPage(page);
  
  await flightSearch.navigateToFlightPage();
  await flightSearch.selectFlightType('One Way');
  const tomorrowDate = getTomorrowDate();
  await flightSearch.selectDepartureDate(tomorrowDate);
  await flightSearch.searchFlights();
  await expect(page).toHaveURL(
    new RegExp(`.*outbound_date=${tomorrowDate}.*`, 'i'),
    { timeout: 5000 });
  await expect.
    soft(
      flightSearchResult.cheapestSortButton,
      'Cheapest sort button will be enabled').
    toBeEnabled({ timeout: 6000 });

  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    flightSearchResult.selectButtons.first().click({ timeout: 5000 })
  ]);

  await newPage.waitForLoadState();
  await expect.
    soft(newPage.locator('h3:has-text("Sign In")'),
      'Sign In modal header should be visible').
    toBeVisible({ timeout: 5000 });
  await expect.
    soft(newPage.getByTestId('auth_email-input'),
      'Email Input field should be visible').
    toBeVisible({ timeout: 5000 });

  await newPage.close();
  await flightSearchResult.printAllPrices();
});

