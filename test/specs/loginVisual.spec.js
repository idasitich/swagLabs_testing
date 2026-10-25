const { Builder, until} = require("selenium-webdriver");
const LoginPage = require("../pages/login.page")
const CommonPage = require("../pages/common.page")
const VisualRegressionHelper = require("../../utilities/visualRegression.helper");
const assert = require("assert");
const common = require("mocha/lib/interfaces/common");



describe("Regression Testing", function () {
    let driver;
    let login;
    let common;
    let visualHelper;

    beforeEach(async function () {

        driver = await new Builder()
            .forBrowser("chrome")
            .build();
            
            login = new LoginPage(driver);
            common = new CommonPage(driver);
            visualHelper = new VisualRegressionHelper();

            await login.openBrowser();

            // console.log("open browser")
    });

    afterEach (async function(){
       await driver.quit()
    });

it("Success Login - Standard User", async function () {
        await login.inputUsername("standard_user");
        await login.inputPassword("secret_sauce");
        await login.clickLoginButton();
        await login.isShoppingCartVisible();

        // take full screenshot after successful login
        await common.fullScreenshot("visual_standard_user");

        // Copy screenshot to visual-current
        visualHelper.saveCurrentScreenshot(
            "screenshots/visual_standard_user.png",
            "visual_standard_user.png"
        );

        // Compare with baseline
        const result = await visualHelper.compareImages(
            "visual_standard_user.png"
        );

        console.log(result);

        // If baseline doesn't exist
        if (!result.hasBaseline) {

            visualHelper.saveAsBaseline(
                "visual_standard_user.png"
            );

            console.log(
                "Baseline created: visual_standard_user.png"
            );

        } else {

            assert.strictEqual(
                result.match,
                true,
                result.message
            );

        }
    });

    it.skip("Success Login - Performance Glitch User", async function () {
        await login.inputUsername("performance_glitch_user");
        await login.inputPassword("secret_sauce");
        await login.clickLoginButton();
        await login.isShoppingCartVisible();

        // take element screenshot of shopping cart after successful login
        await common.elementScreenshot(By.xpath("//*[@data-test='shopping-cart-link']"), 
        "shopping_cart_performance_glitch_user");
    });

});