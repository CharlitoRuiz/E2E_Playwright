import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/login.pages';
import Data from '../fixtures/data.json';

const user = Data.login.user, 
pass = Data.login.pass, 
name = Data.checkout.name, lastName = Data.checkout.lastName, zip = Data.checkout.zip;

test.beforeEach('Login', async ({ page }) => {
  const loginpage = new  loginPage(page);
  await loginpage.goto('/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
  await loginpage.enterLogin(user,pass);
  await expect(loginpage.txtMainTitle).toContainText('Swag Labs');
})

// buy a bike lights
test('buy a bike lights correctly', {tag:"@smoke"},async({page})=>{
  const loginpage = new  loginPage(page);
  
  await loginpage.addToCart();
  await loginpage.viewCart();
  await loginpage.checkoutProduct(name, lastName, zip)
  await expect(loginpage.txtProductDescription).toContainText('Sauce Labs Bike Light');
  await expect(loginpage.txtPrice).toContainText('$9.99');
  await loginpage.finishCheckout();
  await expect(loginpage.txtTitleOrderComplete).toContainText('Thank you for your order!');
  await expect(loginpage.imgCheck).toBeVisible();
  await expect(loginpage.txtOrderDispatched).toBeVisible();
  await expect(loginpage.txtTitleCheckout).toContainText('Checkout: Complete!');
  await loginpage.backHome();
  await loginpage.openMenu();
  await loginpage.logOut();
  await expect(loginpage.btnLogin).toBeVisible();
})

test.afterEach('Final test status',async ()=>{
  console.log(`Finished ${test.info().title} with status ${test.info().status}`);
})
