import { expect, Locator } from "playwright/test";

// Select a random user from the database and log user details to console
export function getRandomUser(items: readonly { email: string, password: string, firstName: string, lastName: string }[]) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex]; 
}

// Validate input field is visible and fill text
export async function validateVisibilityAndFill(objectlocator: Locator, text: string){
    await expect(objectlocator).toBeVisible();
    await objectlocator.fill(text);
}

// Validate button has been enabled and click
export async function buttonEnabledAndClick(objectlocator: Locator) {
    await expect(objectlocator).toBeEnabled();
    await objectlocator.click()
}

