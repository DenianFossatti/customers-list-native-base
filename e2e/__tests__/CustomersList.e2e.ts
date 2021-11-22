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

  it('should tap back button and return to customers list', async () => {
    await element(by.text('Back to list')).tap();

    await waitFor(element(by.id('CustomersList')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should filter customers list by text', async () => {
    await element(by.id('CustomersListInput')).typeText('John');

    await waitFor(element(by.text('John Doe')))
      .toBeVisible()
      .withTimeout(1000);
  });

  it.skip('should paginate customers list', async () => {
    // SKIPPED: scroll function not working properly on android
    // GITHUB ISSUE: https://github.com/wix/Detox/issues/2931

    // mocked array contains 15 elements, render 10 initially.
    // Should load 10 more items when list comes to an end.
    // await element(by.id('CustomersList')).scroll('bottom');
    await waitFor(element(by.id('LoadingIcon')))
      .toBeVisible()
      .whileElement(by.id('CustomersList'))
      .scroll(100, 'down');

    // Should load last 5 remaining items.
    await waitFor(element(by.id('LoadingIcon')))
      .toBeVisible()
      .whileElement(by.id('CustomersList'))
      .scroll(100, 'down');

    // Should render end list message.
    await waitFor(element(by.id('LoadingIcon')))
      .toBeVisible()
      .whileElement(by.text('End of list.'))
      .scroll(100, 'down');
  });
});
