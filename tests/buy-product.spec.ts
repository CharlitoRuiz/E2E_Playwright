import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/login.pages';

test.beforeEach('Login', async ({ page }) => {
  const loginpage = new  loginPage(page);
  await loginpage.goto('/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
  await loginpage.enterLogin('standard_user','secret_sauce');
  await expect(loginpage.txtMainTitle).toContainText('Swag Labs');
})

// buy a bike lights
test('buy a bike lights correctly', async({page})=>{
  const loginpage = new  loginPage(page);
  
  await loginpage.addToCart();
  await loginpage.viewCart();
  await loginpage.checkoutProduct("Carlos", "Test", "10001")
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