import { test } from "@playwright/test";

test("SEP Practice", async ({ page }) => {
  const CODE = Buffer.from(
    `${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`
  ).toString("base64");

  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${CODE}`,
  });

  await page.goto("https://qa.sep.tdtm.cydeo.com/taws");

  //  await page.waitForTimeout(3000);

  // Step1: Start application
  let firstNameInputBox = page.locator("//input[@formcontrolname='firstName']");
  await firstNameInputBox.fill("Muhtar");

  let lastNameInputBox = page.locator("//input[@formcontrolname='lastName']");
  await lastNameInputBox.fill("Mahmut");

  let emailInputBox = page.locator("//input[@formcontrolname='email']");
  await emailInputBox.fill("mahmut.muhtar@sep.com");

  let phoneNumberInputBox = page.locator(
    "//input[@formcontrolname='phoneNumber']"
  );
  await phoneNumberInputBox.fill("5395551234");

  let howDidYouHearAboutUsDropDown = page.locator(
    "//mat-label[text()='How did you hear about us?']"
  );
  await howDidYouHearAboutUsDropDown.click();

  let emailOption = page.locator("//span[text()='Email']");
  await emailOption.click();
  await page.waitForTimeout(1000);
  //await page.click("//span[text()='Email']");

  // <button _ngcontent-ng-c3758746842="" type="submit" class="next-button"> Next</button>

  let nextButton1 = page.locator("//button[@type= 'submit']");
  await nextButton1.click();

  // Step2: Payment Plan
  let upfrontPaymentPlan = page.locator(
    "#mat-expansion-panel-header-0"
  );
  await upfrontPaymentPlan.click();

  let nextButton2 = page.locator("//button[contains(@class, 'next-button') and text()='Next']");
  await nextButton2.click();

  // Step2: Review
  let paymentFrame = page.frameLocator("//iframe[@title='Secure payment input frame']");

  let cardNumberInputBox = paymentFrame.locator("//input[@id='Field-numberInput']");
  await cardNumberInputBox.fill("4242424242424242");

  let expirationDateInputBox = paymentFrame.locator("//input[@id='Field-expiryInput']");
  await expirationDateInputBox.fill("12/30");

  let securityCodeInputBox = paymentFrame.locator("//input[@id='Field-cvcInput']");
  await securityCodeInputBox.fill("123");

  let zipCodeInputBox = paymentFrame.locator("//input[@id='Field-postalCodeInput']");
  await zipCodeInputBox.fill("12345");

  let termsAndConditionsCheckbox = page.locator("//input[@id='defaultCheck2']");
  await termsAndConditionsCheckbox.check();

  await page.waitForTimeout(3000);

  let payButton = page.locator("//button[contains(@class, 'next-button') and contains(., 'Pay')]");
  await payButton.click();

  await page.waitForTimeout(3000);


});

// Come back at 11:30 AM

