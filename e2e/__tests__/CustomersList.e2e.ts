import { expect, waitFor } from 'detox';

describe('CustomersList', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('should render customers list', async () => {
    await expect(element(by.id('CustomersList'))).toBeVisible();
  });

  it('should tap customer card and render customer details', async () => {
    await element(by.id('CustomersCard')).atIndex(0).tap();

    await waitFor(element(by.id('CustomerDetails')))
      .toBeVisible()
      .withTimeout(5000);

    await expect(element(by.text('John Doe'))).toBeVisible();
    await expect(element(by.text('john.doe@mail.com'))).toBeVisible();
  });

  it('should tap back button and return to customersList', async () => {
    await element(by.text('Back to list')).tap();

    await waitFor(element(by.id('CustomersList')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
