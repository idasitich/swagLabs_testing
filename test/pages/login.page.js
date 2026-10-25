const { By, until } = require("selenium-webdriver"); // untuk memanggil selector
const LoginLocator = require("../locators/login.locator");
const assert = require("assert");

class LoginPage {
    constructor(driver){ // untuk menidentify drivernya
        this.driver = driver; //variable driver yang bisa dipanggil dan dirubah-rubah
    }

    async openBrowser (){
        await this.driver.get(LoginLocator.url);
        await this.driver.get(async ()=>{
            const url = await this.driver.getCurrentUrl();
            return url === LoginLocator.url;
        },5000).catch(()=>{
        });
    }

    async inputUsername(username){
        const inputUsername = await this.driver.findElement(LoginLocator.selectors.usernameInput);
        await inputUsername.sendKeys(username);
    }

    async inputPassword(password){
        const inputPassword = await this.driver.findElement(LoginLocator.selectors.passwordInput);
        await inputPassword.sendKeys(password);
    } 

    async clickLoginButton() {
        const loginButton = await this.driver.findElement(LoginLocator.selectors.loginButton);
        await loginButton.click();
    }

    async isShoppingCartVisible() {
    const cart = await this.driver.wait(
        until.elementLocated(LoginLocator.selectors.shoppingCart),
        10000
    );

    return await cart.isDisplayed();
}

    async isErrorMessageVisible() {
       const headerElement = await this.driver.wait(
            until.elementLocated(LoginLocator.selectors.errorMessage),
            10000
        );

        const errorMessage = await headerElement.getText();
        assert.strictEqual(
            errorMessage,
            "Epic sadface: Username and password do not match any user in this service"
        );
    }

    async isWrongPassword() {
       const headerElement = await this.driver.wait(
            until.elementLocated(LoginLocator.selectors.errorMessage),
            10000
        );

        const errorMessage = await headerElement.getText();
        assert.strictEqual(
            errorMessage,
            "Epic sadface: Username and password do not match any user in this service"
        );
    } 

    async isLockedUser() {
       const headerElement = await this.driver.wait(
            until.elementLocated(LoginLocator.selectors.errorMessage),
            10000
        );

        const errorMessage = await headerElement.getText();
        assert.strictEqual(
            errorMessage,
            "Epic sadface: Sorry, this user has been locked out."
        );
    } 
}   

module.exports = LoginPage;
