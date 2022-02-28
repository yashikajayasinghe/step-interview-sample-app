const {test, expect} = require('@playwright/test');

test.describe('Title Search From Landing page', () => {

    test('search for a valid title will show title details', async ({page}) => {
        await page.goto('/');
        await expect(await page.locator('input').getAttribute('placeholder')).toEqual('Enter a title number');
        await page.locator('input').fill("1");
        await page.locator('button').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(await page.locator('table.table tr:nth-child(1) td')).toContainText('Lot 1 on Block 1');
        await expect(await page.locator('table.table tr:nth-child(2) td')).toContainText('Jane Doe');


    })
    test('search for an invalid title will show a validation error', async ({page}) => {
        await page.goto('/');
        await expect(await page.locator('input').getAttribute('placeholder')).toEqual('Enter a title number');
        await page.locator('input').fill("1000");
        await page.locator('button').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(await page.locator('h1')).toContainText('Title Number 1000 Is Invalid.');
    })
})