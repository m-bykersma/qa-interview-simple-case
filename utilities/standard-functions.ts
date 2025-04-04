import { expect, Locator } from "playwright/test";
import * as fs from 'fs';
import * as path from 'path';

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
    await objectlocator.click();
}

// Validate element is visible and click
export async function validateVisibilityandClick(objectlocator: Locator){
    await expect(objectlocator).toBeVisible();
    await objectlocator.click();
}

// Generate a random string for test data
export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&';
    let output = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        output += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return output;
}

//Generate a unique email address
export function generateUniqueEmail(length: number): string {
    const timestamp = Date.now();
    const randomString = generateRandomString(length); // To make it more unique
    return `${randomString}${timestamp}@mail.com`;
  }

  // Generate a random string for test data
export function generateRandomName(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let output = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        output += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return output;
}

// Set file path for following read/write data functions
const filePath = path.join(__dirname, 'generated-data.ts');

// Function to read existing data from the file
export function readExistingData(): any[] {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    const match = data.match(/export const generatedUsers = (\[.*\]);/s);
    return match ? JSON.parse(match[1]) : [];
  }
  return [];
}

// Function to append new data to the file
export function appendGeneratedData(data: any): void {
  const existingData = readExistingData();
  existingData.push(data);
  const updatedData = `export const generatedUsers = ${JSON.stringify(existingData, null, 2)};\n`;

  fs.writeFileSync(filePath, updatedData, 'utf8');
  console.log(`Data has been appended to ${filePath}`);
}