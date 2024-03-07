import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.pages';
import Data from '../fixtures/data.json';

const user = Data.login.user, 
pass = Data.login.pass, 
name = Data.checkout.name, lastName = Data.checkout.lastName, zip = Data.checkout.zip;

test.beforeEach('Login', async ({ page }) => {
  const mainpage = new  MainPage(page);
  await mainpage.goto('/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
  await mainpage.enterLogin(user,pass);
  await expect(mainpage.txtMainTitle).toContainText('Swag Labs');
})

// buy a bike lights
test('buy a bike lights correctly', {tag:"@smoke"},async({page})=>{
  const mainpage = new  MainPage(page);
  
  await mainpage.addBikeLightToCart();
  await mainpage.viewCart();
  await mainpage.checkoutProduct(name, lastName, zip)
  await expect(mainpage.txtProductDescription).toContainText('Sauce Labs Bike Light');
  await expect(mainpage.txtPrice).toContainText('$9.99');
  await mainpage.finishCheckout();
  await expect(mainpage.txtTitleOrderComplete).toContainText('Thank you for your order!');
  await expect(mainpage.imgCheck).toBeVisible();
  await expect(mainpage.txtOrderDispatched).toBeVisible();
  await expect(mainpage.txtTitleCheckout).toContainText('Checkout: Complete!');
  await mainpage.backHome();
  await mainpage.openMenu();
  await mainpage.logOut();
  await expect(mainpage.btnLogin).toBeVisible();
})

test('buy 3 different products', {tag: "@smoke"}, async({page})=>{
  const mainpage = new  MainPage(page);
  await mainpage.add3FirstProducts();
  await expect(mainpage.numberCart).toContainText('3');
  await mainpage.viewCart();
  await expect(mainpage.containerPrice).toContainText('$29.99');
  await expect(mainpage.containerPrice).toContainText('$15.99');
  await expect(mainpage.containerPrice).toContainText('$7.99');

  await mainpage.checkoutProduct(name, lastName, zip)
  await expect(mainpage.txtPrice).toContainText('Total: $58.29');
  await mainpage.finishCheckout();
  await expect(mainpage.txtTitleOrderComplete).toContainText('Thank you for your order!');
  await mainpage.backHome();
  await mainpage.openMenu();
  await mainpage.logOut();
  await expect(mainpage.btnLogin).toBeVisible();
});

test.afterEach('Final test status',async ()=>{
  console.log(`Finished ${test.info().title} with status ${test.info().status}`);
})
