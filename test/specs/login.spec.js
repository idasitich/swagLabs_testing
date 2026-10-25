const { Builder, By, until} = require("selenium-webdriver");
const LoginPage = require("../pages/login.page")
const CommonPage = require("../pages/common.page")



describe("Regression Testing", function () {
    let driver;
    let login;
    let common;

    beforeEach(async function () {

        driver = await new Builder()
            .forBrowser("chrome")
            .build();
            
            login = new LoginPage(driver);
            common = new CommonPage(driver);
            await login.openBrowser();

            // console.log("open browser")
    });

    afterEach (async function(){
       await driver.quit()
    });


  it("Login Success", async function () {
        await login.inputUsername("standard_user");
        await login.inputPassword("secret_sauce");
        await login.clickLoginButton();
        await login.isShoppingCartVisible();

        // take full screenshot after successful login
        await common.fullScreenshot("login_standard_user");
    });

    it("invalid username", async function () {
        await login.inputUsername("L");
        await login.inputPassword("secret_sauce");
        await login.clickLoginButton();
        await login.isErrorMessageVisible();

        // take element screenshot of error message
        await common.elementScreenshot(By.xpath("//*[@data-test='error']"), 
        "invalid username");
    });

    it("wrong password", async function () {
        await login.inputUsername("standard_user");
        await login.inputPassword("admin");
        await login.clickLoginButton();
        await login.isWrongPassword();

        // take element screenshot of shopping cart after successful login
        await common.elementScreenshot(By.xpath("//*[@data-test='error']"), 
        "wrong password");
    });

     it("locked_out_user", async function () {
        await login.inputUsername("locked_out_user");
        await login.inputPassword("secret_sauce");
        await login.clickLoginButton();
        await login.isLockedUser();

        // take element screenshot of shopping cart after successful login
        await common.elementScreenshot(By.xpath("//*[@data-test='error']"), 
        "Locked User");
    });

});