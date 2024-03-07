import { expect, type Locator, type Page } from '@playwright/test';

export class loginPage {
  readonly page: Page;
  readonly txtUser: Locator;
  readonly txtPass: Locator;
  readonly btnLogin: Locator;
  readonly lnkBikeLight: Locator;
  readonly btnCart: Locator;
  readonly btnCheckOut: Locator;
  readonly txtName: Locator;
  readonly txtLastName: Locator;
  readonly txtZipCode: Locator;
  readonly btnFinish: Locator;
  readonly btnContinue: Locator;
  readonly btnBackHome: Locator;
  readonly btnMenu: Locator;
  readonly btnLogout: Locator;

  // locators
  readonly txtMainTitle: Locator;
  readonly txtErrorLogin: Locator;
  readonly txtProductDescription: Locator;
  readonly txtPrice: Locator;
  readonly txtTitleOrderComplete: Locator;
  readonly imgCheck: Locator;
  readonly txtOrderDispatched: Locator;
  readonly txtTitleCheckout: Locator;


  constructor(page:Page){
    this.page = page;
    this.txtUser = page.locator('[data-test="username"]');
    this.txtPass = page.locator('[data-test="password"]');
    this.btnLogin = page.locator('[data-test="login-button"]');
    
    // buy a bike
    this.lnkBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.btnCart = page.locator('a').filter({ hasText: '1' });
    this.btnCheckOut = page.locator('[data-test="checkout"]');
    this.txtName = page.locator('[data-test="firstName"]');
    this.txtLastName = page.locator('[data-test="lastName"]');
    this.txtZipCode = page.locator('[data-test="postalCode"]');
    this.btnContinue = page.locator('[data-test="continue"]');
    this.btnFinish = page.locator('[data-test="finish"]')
    this.btnBackHome = page.locator('[data-test="back-to-products"]')
    this.btnMenu = page.getByRole('button', { name: 'Open Menu' })
    this.btnLogout = page.getByRole('link', { name: 'Logout' })

    // locators
    this.txtMainTitle = page.locator('#header_container');
    this.txtErrorLogin = page.locator('[data-test="error"]')
    this.txtProductDescription = page.locator('#item_0_title_link');
    this.txtPrice = page.locator('#checkout_summary_container');
    this.txtTitleOrderComplete = page.getByRole('heading');
    this.imgCheck = page.getByRole('img', { name: 'Pony Express' });
    this.txtOrderDispatched = page.getByText('Your order has been');
    this.txtTitleCheckout = page.locator('span');
  }

  // Methods
  async goto(url){
    await this.page.goto(url);
  }
  async enterLogin(user, pass){
    await this.txtUser.fill(user);
    await this.txtPass.fill(pass);
    await this.btnLogin.click();
  }
  async addToCart(){
   await this.lnkBikeLight.click(); 
  }
  async viewCart(){
    await this.btnCart.click();
  }
  async checkoutProduct(name, lastName, zip) {
    await this.btnCheckOut.click();
    await this.txtName.fill(name);
    await this.txtLastName.fill(lastName);
    await this.txtZipCode.fill(zip);
    await this.btnContinue.click();
  }
  async finishCheckout(){
    await this.btnFinish.click();
  }
  async backHome(){
    await this.btnBackHome.click();
  }
  async openMenu(){
    await this.btnMenu.click();
  }
  async logOut(){
    await this.btnLogout.click();
  }
}