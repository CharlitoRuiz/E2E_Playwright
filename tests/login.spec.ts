import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/login.pages';


test.beforeEach('Enter to Sauce  Labs', async ({ page }) => {
  const loginpage = new loginPage(page);
  await loginpage.goto("/")
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
})

test('locked user', {tag: "@functional"}, async({page})=>{
  const loginpage = new loginPage(page);
  await loginpage.enterLogin("locked_out_user", "secret_sauce")
  await expect(loginpage.txtErrorLogin).toBeVisible();
  await expect(loginpage.txtErrorLogin).toContainText('Epic sadface: Sorry, this user has been locked out.');
})

test('bad password', {tag: "@functional"},async({page})=>{
  const loginpage = new loginPage(page);
  await loginpage.enterLogin("locked_out_user", "secret_sauce1")
  await expect(loginpage.txtErrorLogin).toBeVisible();
  await expect(loginpage.txtErrorLogin).toContainText('Epic sadface: Username and password do not match any user in this service');
})

test.afterEach('Final test status',async ()=>{
  console.log(`Finished ${test.info().title} with status ${test.info().status}`);
})
