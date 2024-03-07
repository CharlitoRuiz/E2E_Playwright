import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.pages';
import Data from '../fixtures/data.json';

const locked_user = Data.locked_login.user, 
pass = Data.login.pass, 
bad_pass = Data.invalid_login.pass;

test.beforeEach('Enter to Sauce  Labs', async ({ page }) => {
  const mainpage = new MainPage(page);
  await mainpage.goto("/")
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
})

test('locked user', {tag: "@functional"}, async({page})=>{
  const mainpage = new MainPage(page);
  await mainpage.enterLogin(locked_user, pass)
  await expect(mainpage.txtErrorLogin).toBeVisible();
  await expect(mainpage.txtErrorLogin).toContainText('Epic sadface: Sorry, this user has been locked out.');
})

test('bad password', {tag: "@functional"},async({page})=>{
  const mainpage = new MainPage(page);
  await mainpage.enterLogin(locked_user, bad_pass)
  await expect(mainpage.txtErrorLogin).toBeVisible();
  await expect(mainpage.txtErrorLogin).toContainText('Epic sadface: Username and password do not match any user in this service');
})

test.afterEach('Final test status',async ()=>{
  console.log(`Finished ${test.info().title} with status ${test.info().status}`);
})
