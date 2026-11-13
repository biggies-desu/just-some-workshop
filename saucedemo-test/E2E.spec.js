import {test, expect} from '@playwright/test'

async function login(page) {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="username"]').press('Tab');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.waitForURL('**/inventory.html')
}

test.describe('testing broswer and add to cart functionality', () => {
    test('add to cart button work properly', async ({ page }) => {
        await login(page)
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible()
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeVisible()
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click()
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible()
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden()
    })

    test('add to cart then look at a card', async ({ page }) => {
        await login(page)
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible()
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeVisible()

        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.waitForURL('https://www.saucedemo.com/cart.html')

        await expect(page.locator('[data-test="inventory-item"]')).toBeVisible()
        await expect(page.locator('[data-test="checkout"]')).toBeVisible()
    })

    test('remove to cart then look at a card', async ({ page }) => {
        await login(page)
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible()
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeVisible()

        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.waitForURL('https://www.saucedemo.com/cart.html')

        await expect(page.locator('[data-test="inventory-item"]')).toBeVisible()
        await expect(page.locator('[data-test="checkout"]')).toBeVisible()

        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="inventory-item"]')).toBeHidden()
    })
})
