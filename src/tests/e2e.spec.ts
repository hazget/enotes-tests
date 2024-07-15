import { test, expect } from '@playwright/test';
import { test as base } from '../fixtures/auth';

base.describe('E2E Tests', () => {
    base('Scenario 1: Add 9 discounted items to cart', async ({ page }) => {
        await page.goto('https://enotes.pointschool.ru');
        await page.click('#dropdownBasket');
        await page.click('.actionClearBasket');

        for (let i = 0; i < 9; i++) {
            await page.click('.note-item.hasDiscount .actionBuyProduct');
        }

        const cartCount = await page.textContent('.basket-count-items');
        expect(cartCount).toBe('9');

        await page.click('#dropdownBasket');

        const cartItems = await page.$$('.basket-item');
        expect(cartItems.length).toBe(9);

        await page.click('.btn-primary.btn-sm');

        expect(page.url()).toContain('/basket');
    });

    base('Scenario 2: Add 8 different items to cart with 1 discounted item', async ({ page }) => {
        await page.goto('https://enotes.pointschool.ru');
        await page.click('.note-item.hasDiscount .actionBuyProduct');

        for (let i = 0; i < 8; i++) {
            await page.click('.note-item:not(.hasDiscount) .actionBuyProduct');
        }

        const cartCount = await page.textContent('.basket-count-items');
        expect(cartCount).toBe('9');

        await page.click('#dropdownBasket');

        const cartItems = await page.$$('.basket-item');
        expect(cartItems.length).toBe(9);

        await page.click('.btn-primary.btn-sm');

        expect(page.url()).toContain('/basket');
    });

    base('Scenario 3: Add 1 discounted item to cart', async ({ page }) => {
        await page.goto('https://enotes.pointschool.ru');
        await page.click('#dropdownBasket');
        await page.click('.actionClearBasket');

        await page.click('.note-item.hasDiscount .actionBuyProduct');

        const cartCount = await page.textContent('.basket-count-items');
        expect(cartCount).toBe('1');

        await page.click('#dropdownBasket');

        const cartItems = await page.$$('.basket-item');
        expect(cartItems.length).toBe(1);

        await page.click('.btn-primary.btn-sm');

        expect(page.url()).toContain('/basket');
    });

    base('Scenario 4: Add 1 non-discounted item to cart', async ({ page }) => {
        await page.goto('https://enotes.pointschool.ru');
        await page.click('#dropdownBasket');
        await page.click('.actionClearBasket');

        await page.click('.note-item:not(.hasDiscount) .actionBuyProduct');

        const cartCount = await page.textContent('.basket-count-items');
        expect(cartCount).toBe('1');

        await page.click('#dropdownBasket');

        const cartItems = await page.$$('.basket-item');
        expect(cartItems.length).toBe(1);

        await page.click('.btn-primary.btn-sm');

        expect(page.url()).toContain('/basket');
    });
});