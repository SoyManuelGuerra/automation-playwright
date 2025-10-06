/**
 * StringUtils - Utilidades para manipulación de strings en pruebas
 */
export class StringUtils {
    /**
     * Capitaliza la primera letra de un string
     */
    static capitalize(str: string): string {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /**
     * Capitaliza cada palabra de un string
     */
    static capitalizeWords(str: string): string {
        if (!str) return str;
        return str.split(' ')
            .map(word => this.capitalize(word))
            .join(' ');
    }

    /**
     * Convierte un string a camelCase
     */
    static toCamelCase(str: string): string {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    /**
     * Convierte un string a kebab-case
     */
    static toKebabCase(str: string): string {
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }

    /**
     * Convierte un string a snake_case
     */
    static toSnakeCase(str: string): string {
        return str
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[\s-]+/g, '_')
            .toLowerCase();
    }

    /**
     * Genera un slug a partir de un string
     */
    static generateSlug(str: string): string {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    /**
     * Trunca un string a una longitud específica
     */
    static truncate(str: string, length: number, suffix: string = '...'): string {
        if (str.length <= length) return str;
        return str.substring(0, length - suffix.length) + suffix;
    }

    /**
     * Remueve espacios en blanco de ambos lados
     */
    static trim(str: string): string {
        return str.trim();
    }

    /**
     * Remueve todos los espacios en blanco
     */
    static removeWhitespace(str: string): string {
        return str.replace(/\s/g, '');
    }

    /**
     * Verifica si un string está vacío o solo contiene espacios
     */
    static isEmpty(str: string): boolean {
        return !str || str.trim().length === 0;
    }

    /**
     * Verifica si un string contiene solo números
     */
    static isNumeric(str: string): boolean {
        return /^\d+$/.test(str);
    }

    /**
     * Verifica si un string es un email válido
     */
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Verifica si un string es una URL válida
     */
    static isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Extrae números de un string
     */
    static extractNumbers(str: string): string {
        return str.replace(/\D/g, '');
    }

    /**
     * Extrae letras de un string
     */
    static extractLetters(str: string): string {
        return str.replace(/[^a-zA-Z]/g, '');
    }

    /**
     * Remueve caracteres especiales de un string
     */
    static removeSpecialCharacters(str: string): string {
        return str.replace(/[^a-zA-Z0-9\s]/g, '');
    }

    /**
     * Convierte un string a formato de moneda
     */
    static formatCurrency(amount: number, currency: string = 'USD'): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    /**
     * Convierte un string a formato de número con separadores de miles
     */
    static formatNumber(num: number): string {
        return new Intl.NumberFormat('en-US').format(num);
    }

    /**
     * Genera un string aleatorio de una longitud específica
     */
    static generateRandomString(length: number, includeNumbers: boolean = true): string {
        const chars = includeNumbers 
            ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Convierte bytes a formato legible
     */
    static formatBytes(bytes: number, decimals: number = 2): string {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    /**
     * Escapa caracteres especiales para HTML
     */
    static escapeHtml(str: string): string {
        const map: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return str.replace(/[&<>"']/g, (m) => map[m]);
    }

    /**
     * Desescapa caracteres HTML
     */
    static unescapeHtml(str: string): string {
        const map: { [key: string]: string } = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#39;': "'"
        };
        return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (m) => map[m]);
    }
}
