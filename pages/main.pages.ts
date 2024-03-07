import { type Locator, type Page } from '@playwright/test';

export class MainPage {
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
  readonly lnkBackPack: Locator;
  readonly lnkBoltTShit: Locator;
  readonly lnkOnesie: Locator;

  // locators
  readonly txtMainTitle: Locator;
  readonly txtErrorLogin: Locator;
  readonly numberCart: Locator;
  readonly txtProductDescription: Locator;
  readonly txtPrice: Locator;
  readonly txtTitleOrderComplete: Locator;
  readonly imgCheck: Locator;
  readonly txtOrderDispatched: Locator;
  readonly txtTitleCheckout: Locator;
  readonly containerPrice: Locator;


  constructor(page:Page){
    this.page = page;
    this.txtUser = page.locator('[data-test="username"]');
    this.txtPass = page.locator('[data-test="password"]');
    this.btnLogin = page.locator('[data-test="login-button"]');
    
    // buy a bike
    this.lnkBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.btnCart = page.locator('#shopping_cart_container a');
    this.btnCheckOut = page.locator('[data-test="checkout"]');
    this.txtName = page.locator('[data-test="firstName"]');
    this.txtLastName = page.locator('[data-test="lastName"]');
    this.txtZipCode = page.locator('[data-test="postalCode"]');
    this.btnContinue = page.locator('[data-test="continue"]');
    this.btnFinish = page.locator('[data-test="finish"]')
    this.btnBackHome = page.locator('[data-test="back-to-products"]')
    this.btnMenu = page.getByRole('button', { name: 'Open Menu' })
    this.btnLogout = page.getByRole('link', { name: 'Logout' })

    // buy 3 products
    this.lnkBackPack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.lnkBoltTShit = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.lnkOnesie = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');

    // locators
    this.txtMainTitle = page.locator('#header_container');
    this.txtErrorLogin = page.locator('[data-test="error"]')
    this.numberCart = page.locator('#shopping_cart_container');
    this.txtProductDescription = page.locator('#item_0_title_link');
    this.txtPrice = page.locator('#checkout_summary_container');
    this.txtTitleOrderComplete = page.getByRole('heading');
    this.imgCheck = page.getByRole('img', { name: 'Pony Express' });
    this.txtOrderDispatched = page.getByText('Your order has been');
    this.txtTitleCheckout = page.locator('span');
    this.containerPrice = page.locator('#cart_contents_container');
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
  async addBikeLightToCart(){
   await this.lnkBikeLight.click(); 
  }
  async add3FirstProducts(){
    await this.lnkBackPack.click(); 
    await this.lnkBoltTShit.click(); 
    await this.lnkOnesie.click(); 
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