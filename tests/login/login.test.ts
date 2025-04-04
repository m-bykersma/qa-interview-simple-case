import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'
import { getRandomUser, validateVisibilityAndFill, buttonEnabledAndClick} from '../../utilities/standard-functions'
import loginPageLocators from '../../object-locators/loginPage.object-locators'
import landingPageLocators from '../../object-locators/landingPage.object-locators'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    // Navigate to page
    await page.goto('http://localhost:8080/')

    // Select a random user from the database and log user details to console
    const existingUser = getRandomUser(existingUsers);

    // Set relevant inputs to locator type for functions
    const emailInput = page.locator(loginPageLocators.emailInput)
    const passwordInput = page.locator(loginPageLocators.passwordInput)
    const loginButton = page.locator(loginPageLocators.loginButton)
    const logoutButton = page.locator(landingPageLocators.logoutButton)

    // Input email and password
    await validateVisibilityAndFill(emailInput,existingUser.email)
    await validateVisibilityAndFill(passwordInput,existingUser.password)

    // Validate button has been enabled and click. This is required for login and signup when minimum requirements are met.
    await buttonEnabledAndClick(loginButton)

    // Validate successful login for correct user and take a screenshot for evidence.
    await expect(logoutButton).toBeVisible({timeout: 5000})
    await expect(page.getByText(existingUser.firstName && existingUser.lastName)).toBeVisible({timeout: 5000})
    await page.screenshot({ path: 'screenshots/LoginTestScreenshot.png' });

    // Test case teardown - logout
    await buttonEnabledAndClick(logoutButton)
  })
})