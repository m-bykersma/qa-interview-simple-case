import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'

// Modified Test Case - Login in with existing account

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    // Changed page URL to explictly match output of npm run dev
    await page.goto('http://localhost:8080/login')

    // Select a random user from the database and log user details to console
    const randomUser = Math.floor(Math.random() * existingUsers.length)
    console.log(randomUser, existingUsers[randomUser])
    const existingUser = existingUsers[randomUser]

    // Wait for page and input email
    // Changed presssequentially to fill and updated locator to id 
    await page.locator('id=email').fill(existingUser.email)

    // Wait for page and input password
    // Changed presssequentially to fill and updated locator to id
      await page.locator('id=password').fill(existingUser.password)

    // Click on the Login button
    await page.locator('//button[contains(text(),"Login")]').click()

    // Validate successful login. 
    // Removed static wait, added timeout to expect and validates correct user login
    await expect(page.getByText('Log out')).toBeVisible({timeout: 5000})
    await expect(page.getByText(existingUsers[randomUser].firstName && existingUsers[randomUser].lastName)).toBeVisible({timeout: 5000})
    // Take a screenshot for evidence and save to the screenshots folder
    await page.screenshot({ path: 'screenshots/LoginTestScreenshot.png' });
  })
})
