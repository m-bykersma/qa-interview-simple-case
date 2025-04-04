import { test, expect } from '@playwright/test'
import {validateVisibilityAndFill, buttonEnabledAndClick, validateVisibilityandClick, generateRandomString, generateUniqueEmail, generateRandomName, appendGeneratedData} from '../../utilities/standard-functions'
import loginPageLocators from '../../object-locators/loginPage.object-locators'
import signupPageLocators from '../../object-locators/signupPage.object-locators'
import { generatedUsers} from '../../utilities/generated-data'

test.describe.configure({ mode: 'serial' })

test.describe('signup form tests', () => {
  test('create a new account via sign up page', async ({ page }) => {
    // Navigate to page
    await page.goto('http://localhost:8080/')

    // Set relevant inputs to locator type for functions
    const signupNavLink = page.locator(loginPageLocators.signUpNavLink)
    const firstNameInput = page.locator(signupPageLocators.firstNameInput)
    const lastNameInput = page.locator(signupPageLocators.lastNameInput)
    const emailInput = page.locator(signupPageLocators.emailInput)
    const passwordInput = page.locator(signupPageLocators.passwordInput)
    const submitButton = page.locator(signupPageLocators.submitButton)
    const loginButton = page.locator(loginPageLocators.loginButton)
    const logoutButton = page.locator(signupPageLocators.logoutButton)
 
    // Click sign up link
    await validateVisibilityandClick(signupNavLink)

    // Generate a unique name, email and password for user signup. This can be done more easily using external libraries.
    // For this challenge I have coded the functions to generate random strings of suitable characters
    const newUserFirstName = generateRandomName(5);
    const newUserLastName = generateRandomName(5);
    const newUserEmail = generateUniqueEmail(4);
    const newUserPassword = generateRandomString(10); 
    
    // Log new values to console / Write new values to data file
    // Prepare the data object to append
    const userData = {
        newUserFirstName,
        newUserLastName,
        newUserEmail,
        newUserPassword,
    };
    console.log(userData);
    // Append the generated user data to the external generated-data file
    appendGeneratedData(userData);

    // Input first name, last name, email and password
    await validateVisibilityAndFill(firstNameInput,newUserFirstName)
    await validateVisibilityAndFill(lastNameInput,newUserLastName)
    await validateVisibilityAndFill(emailInput,newUserEmail)
    await validateVisibilityAndFill(passwordInput,newUserPassword)

    // Validate button has been enabled and click. This is required for login and signup when minimum requirements are met.
    await buttonEnabledAndClick(submitButton)

    // Validate successful signup for correct user and take a screenshot for evidence.
    await expect(logoutButton).toBeVisible({timeout: 5000})
    await expect(page.getByText(newUserFirstName && newUserLastName)).toBeVisible({timeout: 5000})
    await page.screenshot({ path: 'screenshots/SignUpTestScreenshot.png' });

    // Log out and validate new login
    await buttonEnabledAndClick(logoutButton)

    // Validate that new user can sign in. Input email and password for new user and click login.
    await validateVisibilityAndFill(emailInput,newUserEmail)
    await validateVisibilityAndFill(passwordInput,newUserPassword)
    await buttonEnabledAndClick(loginButton)

    await expect(logoutButton).toBeVisible({timeout: 5000})
    await expect(page.getByText(newUserFirstName && newUserLastName)).toBeVisible({timeout: 5000})
    await page.screenshot({ path: 'screenshots/NewUserLoginScreenshot.png' });

    // Log out and validate new login
    await buttonEnabledAndClick(logoutButton)
    await page.screenshot({ path: 'screenshots/NewUserLogoutScreenshot.png' });
  })
})