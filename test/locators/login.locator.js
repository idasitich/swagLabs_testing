const {By} = require("selenium-webdriver");

const LoginLocator ={
     url: "https://www.saucedemo.com",

    selectors: {
        usernameInput: By.id("user-name"),
        passwordInput: By.id("password"),
        loginButton: By.id("login-button"),
        shoppingCart: By.xpath("//*[@data-test='shopping-cart-link']"),
        errorMessage: By.xpath("//*[@data-test='error']"),
    },
}
  module.exports = LoginLocator;