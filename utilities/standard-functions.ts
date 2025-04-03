//import { existingUsers } from '../test-setup/localstorage.setup'

    // Select a random user from the database and log user details to console
    export function getRandomUser(items: readonly { email: string, password: string, firstName: string, lastName: string }[]) {
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex]; 
    }
