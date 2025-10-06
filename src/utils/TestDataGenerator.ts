/**
 * TestDataGenerator - Utilidades para generar datos de prueba dinámicos
 */
export class TestDataGenerator {
    /**
     * Genera un email válido aleatorio
     */
    static generateEmail(domain: string = 'test.com'): string {
        const randomString = Math.random().toString(36).substring(2, 15);
        return `user_${randomString}@${domain}`;
    }

    /**
     * Genera una contraseña segura
     */
    static generatePassword(length: number = 12): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return password;
    }

    /**
     * Genera un nombre aleatorio
     */
    static generateName(): string {
        const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emma', 'Chris', 'Lisa'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
        
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        return `${firstName} ${lastName}`;
    }

    /**
     * Genera un número de teléfono aleatorio
     */
    static generatePhoneNumber(): string {
        const areaCode = Math.floor(Math.random() * 900) + 100;
        const firstThree = Math.floor(Math.random() * 900) + 100;
        const lastFour = Math.floor(Math.random() * 9000) + 1000;
        
        return `(${areaCode}) ${firstThree}-${lastFour}`;
    }

    /**
     * Genera una dirección aleatoria
     */
    static generateAddress(): { street: string; city: string; state: string; zipCode: string } {
        const streetNumbers = ['123', '456', '789', '321', '654', '987'];
        const streetNames = ['Main St', 'Oak Ave', 'Pine Rd', 'Cedar Ln', 'Maple Dr', 'Elm St'];
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];
        const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA'];
        
        return {
            street: `${streetNumbers[Math.floor(Math.random() * streetNumbers.length)]} ${streetNames[Math.floor(Math.random() * streetNames.length)]}`,
            city: cities[Math.floor(Math.random() * cities.length)],
            state: states[Math.floor(Math.random() * states.length)],
            zipCode: Math.floor(Math.random() * 90000) + 10000 + ''
        };
    }

    /**
     * Genera un UUID v4
     */
    static generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Genera un string aleatorio
     */
    static generateRandomString(length: number = 10): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return result;
    }

    /**
     * Genera un usuario completo para pruebas
     */
    static generateTestUser(): {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        fullName: string;
        phoneNumber: string;
        address: { street: string; city: string; state: string; zipCode: string };
    } {
        const fullName = this.generateName();
        const nameParts = fullName.split(' ');
        
        return {
            email: this.generateEmail(),
            password: this.generatePassword(),
            firstName: nameParts[0],
            lastName: nameParts[1],
            fullName,
            phoneNumber: this.generatePhoneNumber(),
            address: this.generateAddress()
        };
    }
}
