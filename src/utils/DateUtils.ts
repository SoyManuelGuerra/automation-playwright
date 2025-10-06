/**
 * DateUtils - Utilidades para manejo de fechas en pruebas
 */
export class DateUtils {
    /**
     * Obtiene la fecha actual en formato ISO
     */
    static getCurrentDateISO(): string {
        return new Date().toISOString();
    }

    /**
     * Obtiene la fecha actual en formato YYYY-MM-DD
     */
    static getCurrentDateFormatted(): string {
        const now = new Date();
        return now.toISOString().split('T')[0];
    }

    /**
     * Obtiene la fecha y hora actual en formato legible
     */
    static getCurrentDateTime(): string {
        return new Date().toLocaleString();
    }

    /**
     * Agrega días a una fecha
     */
    static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    /**
     * Agrega meses a una fecha
     */
    static addMonths(date: Date, months: number): Date {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }

    /**
     * Agrega años a una fecha
     */
    static addYears(date: Date, years: number): Date {
        const result = new Date(date);
        result.setFullYear(result.getFullYear() + years);
        return result;
    }

    /**
     * Obtiene una fecha futura (X días desde hoy)
     */
    static getFutureDate(days: number): Date {
        return this.addDays(new Date(), days);
    }

    /**
     * Obtiene una fecha pasada (X días atrás desde hoy)
     */
    static getPastDate(days: number): Date {
        return this.addDays(new Date(), -days);
    }

    /**
     * Formatea una fecha a string YYYY-MM-DD
     */
    static formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    /**
     * Formatea una fecha a string con hora HH:MM:SS
     */
    static formatDateTime(date: Date): string {
        return date.toISOString().replace('T', ' ').split('.')[0];
    }

    /**
     * Obtiene el timestamp actual
     */
    static getTimestamp(): number {
        return Date.now();
    }

    /**
     * Genera una fecha aleatoria entre dos fechas
     */
    static getRandomDateBetween(startDate: Date, endDate: Date): Date {
        const start = startDate.getTime();
        const end = endDate.getTime();
        const randomTime = start + Math.random() * (end - start);
        return new Date(randomTime);
    }

    /**
     * Verifica si una fecha es válida
     */
    static isValidDate(date: any): boolean {
        return date instanceof Date && !isNaN(date.getTime());
    }

    /**
     * Obtiene la diferencia en días entre dos fechas
     */
    static getDaysDifference(date1: Date, date2: Date): number {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    /**
     * Obtiene el primer día del mes
     */
    static getFirstDayOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    /**
     * Obtiene el último día del mes
     */
    static getLastDayOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    /**
     * Obtiene una fecha de nacimiento aleatoria para un adulto (18-65 años)
     */
    static getRandomBirthDate(): Date {
        const now = new Date();
        const maxAge = 65;
        const minAge = 18;
        
        const maxDate = this.addYears(now, -minAge);
        const minDate = this.addYears(now, -maxAge);
        
        return this.getRandomDateBetween(minDate, maxDate);
    }

    /**
     * Obtiene la edad basada en una fecha de nacimiento
     */
    static getAge(birthDate: Date): number {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }
}
