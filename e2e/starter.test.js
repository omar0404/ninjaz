import {device, element, by} from 'detox';
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have posts components visible', async () => {
    await expect(element(by.id('post-0'))).toBeVisible();
  });
  it('should have comming soon text when tab2 is clicked', async () => {
    await element(by.id('tab2')).tap();
    await expect(element(by.id('comming-soon'))).toBeVisible();
  });
});
