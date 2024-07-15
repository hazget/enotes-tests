import { test as base } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.goto('https://enotes.pointschool.ru/login');
        await page.fill('#loginform-username', 'test');
        await page.fill('#loginform-password', 'test');

        await page.waitForSelector('button[name="login-button"]:not([disabled])');

        await page.click('button[name="login-button"]');
        await use(page);
    },
});