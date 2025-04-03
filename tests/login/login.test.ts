import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'
import { getRandomUser} from '../../utilities/standard-functions'
import loginPageLocators from '../../object-locators/loginPage.object-locators'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    // Navigate to page
    await page.goto('http://localhost:8080/login')

    // Select a random user from the database and log user details to console
    const existingUser = getRandomUser(existingUsers);
    // Log user details
    console.log(existingUser)

    // Wait for page and input email
    await page.locator(loginPageLocators.emailInput).fill(existingUser.email)

    // Wait for page and input password
      await page.locator(loginPageLocators.passwordInput).fill(existingUser.password)

    // Click on the Login button
    await page.locator(loginPageLocators.loginButton).click()

    // Validate successful login. 
    await expect(page.getByText('Log out')).toBeVisible({timeout: 5000})
    // Validate correct account
    await expect(page.getByText(existingUser.firstName && existingUser.lastName)).toBeVisible({timeout: 5000})
    
    // Take a screenshot for evidence and save to the screenshots folder
    await page.screenshot({ path: 'screenshots/LoginTestScreenshot.png' });
  })
})
