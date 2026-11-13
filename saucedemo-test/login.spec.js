import {test, expect} from '@playwright/test'


test('not put username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible()
});

test('not put password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByText('Epic sadface: Password is required')).toBeVisible()
});

test('Wrong username/password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('technicalmaid');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('tackle4826');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
});

test('right username/password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL('**/inventory.html')
})

test('login as locked user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible()
});

// test('login as performance_glitch user', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');
//   await page.locator('[data-test="username"]').click();
//   await page.locator('[data-test="username"]').fill('performance_glitch_user');
//   await page.locator('[data-test="username"]').press('Tab');
//   await page.locator('[data-test="password"]').fill('secret_sauce');
//   await page.locator('[data-test="login-button"]').click({ timeout: 3000 });
//   await page.waitForURL('**/inventory.html') //expect this to failed
// });