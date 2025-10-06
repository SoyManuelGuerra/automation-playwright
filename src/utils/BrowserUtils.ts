import { Page, Browser, BrowserContext } from '@playwright/test';

/**
 * BrowserUtils - Utilidades para manejo del navegador en pruebas
 */
export class BrowserUtils {
    /**
     * Espera a que la página esté completamente cargada
     */
    static async waitForPageLoad(page: Page, timeout: number = 30000): Promise<void> {
        await page.waitForLoadState('networkidle', { timeout });
    }

    /**
     * Espera a que un elemento esté visible
     */
    static async waitForElementVisible(page: Page, selector: string, timeout: number = 10000): Promise<void> {
        await page.waitForSelector(selector, { state: 'visible', timeout });
    }

    /**
     * Espera a que un elemento esté oculto
     */
    static async waitForElementHidden(page: Page, selector: string, timeout: number = 10000): Promise<void> {
        await page.waitForSelector(selector, { state: 'hidden', timeout });
    }

    /**
     * Espera a que se abra una nueva pestaña/ventana
     */
    static async waitForNewPage(browser: Browser, context: BrowserContext): Promise<Page> {
        return new Promise((resolve) => {
            context.on('page', (page) => {
                resolve(page);
            });
        });
    }

    /**
     * Cierra todas las pestañas excepto la actual
     */
    static async closeOtherTabs(page: Page): Promise<void> {
        const pages = page.context().pages();
        const currentPage = page;
        
        for (const p of pages) {
            if (p !== currentPage) {
                await p.close();
            }
        }
    }

    /**
     * Cambia a una pestaña específica por su URL
     */
    static async switchToTabByUrl(page: Page, urlPattern: string): Promise<Page | null> {
        const pages = page.context().pages();
        
        for (const p of pages) {
            const currentUrl = p.url();
            if (currentUrl.includes(urlPattern)) {
                await p.bringToFront();
                return p;
            }
        }
        
        return null;
    }

    /**
     * Obtiene todas las URLs de las pestañas abiertas
     */
    static async getAllTabUrls(page: Page): Promise<string[]> {
        const pages = page.context().pages();
        return pages.map(p => p.url());
    }

    /**
     * Limpia el localStorage del navegador
     */
    static async clearLocalStorage(page: Page): Promise<void> {
        await page.evaluate(() => {
            localStorage.clear();
        });
    }

    /**
     * Limpia el sessionStorage del navegador
     */
    static async clearSessionStorage(page: Page): Promise<void> {
        await page.evaluate(() => {
            sessionStorage.clear();
        });
    }

    /**
     * Limpia todas las cookies
     */
    static async clearCookies(page: Page): Promise<void> {
        await page.context().clearCookies();
    }

    /**
     * Limpia todo el almacenamiento del navegador
     */
    static async clearAllStorage(page: Page): Promise<void> {
        await this.clearLocalStorage(page);
        await this.clearSessionStorage(page);
        await this.clearCookies(page);
    }

    /**
     * Establece un elemento del localStorage
     */
    static async setLocalStorageItem(page: Page, key: string, value: string): Promise<void> {
        await page.evaluate(({ key, value }) => {
            localStorage.setItem(key, value);
        }, { key, value });
    }

    /**
     * Obtiene un elemento del localStorage
     */
    static async getLocalStorageItem(page: Page, key: string): Promise<string | null> {
        return await page.evaluate((key) => {
            return localStorage.getItem(key);
        }, key);
    }

    /**
     * Establece una cookie
     */
    static async setCookie(page: Page, name: string, value: string, options?: any): Promise<void> {
        await page.context().addCookies([{
            name,
            value,
            domain: options?.domain || new URL(page.url()).hostname,
            path: options?.path || '/',
            ...options
        }]);
    }

    /**
     * Obtiene todas las cookies
     */
    static async getCookies(page: Page): Promise<any[]> {
        return await page.context().cookies();
    }

    /**
     * Obtiene una cookie específica
     */
    static async getCookie(page: Page, name: string): Promise<any | null> {
        const cookies = await this.getCookies(page);
        return cookies.find(cookie => cookie.name === name) || null;
    }

    /**
     * Toma una captura de pantalla con nombre personalizado
     */
    static async takeScreenshot(page: Page, name: string, fullPage: boolean = true): Promise<void> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${name}_${timestamp}.png`;
        const filePath = `screenshots/${fileName}`;
        
        await page.screenshot({ 
            path: filePath, 
            fullPage 
        });
    }

    /**
     * Hace scroll hasta un elemento específico
     */
    static async scrollToElement(page: Page, selector: string): Promise<void> {
        await page.locator(selector).scrollIntoViewIfNeeded();
    }

    /**
     * Hace scroll hasta el final de la página
     */
    static async scrollToBottom(page: Page): Promise<void> {
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    /**
     * Hace scroll hasta el inicio de la página
     */
    static async scrollToTop(page: Page): Promise<void> {
        await page.evaluate(() => {
            window.scrollTo(0, 0);
        });
    }

    /**
     * Simula un hover sobre un elemento
     */
    static async hoverElement(page: Page, selector: string): Promise<void> {
        await page.hover(selector);
    }

    /**
     * Simula un doble click en un elemento
     */
    static async doubleClickElement(page: Page, selector: string): Promise<void> {
        await page.dblclick(selector);
    }

    /**
     * Simula un click derecho en un elemento
     */
    static async rightClickElement(page: Page, selector: string): Promise<void> {
        await page.click(selector, { button: 'right' });
    }

    /**
     * Simula la tecla Enter en un elemento
     */
    static async pressEnter(page: Page, selector: string): Promise<void> {
        await page.press(selector, 'Enter');
    }

    /**
     * Simula la tecla Tab en un elemento
     */
    static async pressTab(page: Page, selector: string): Promise<void> {
        await page.press(selector, 'Tab');
    }

    /**
     * Simula la tecla Escape
     */
    static async pressEscape(page: Page): Promise<void> {
        await page.keyboard.press('Escape');
    }

    /**
     * Simula escribir texto en un elemento
     */
    static async typeText(page: Page, selector: string, text: string, delay?: number): Promise<void> {
        await page.fill(selector, text);
        if (delay) {
            await page.waitForTimeout(delay);
        }
    }

    /**
     * Obtiene el título de la página
     */
    static async getPageTitle(page: Page): Promise<string> {
        return await page.title();
    }

    /**
     * Obtiene la URL actual
     */
    static async getCurrentUrl(page: Page): Promise<string> {
        return page.url();
    }

    /**
     * Verifica si un elemento existe en la página
     */
    static async elementExists(page: Page, selector: string): Promise<boolean> {
        try {
            await page.waitForSelector(selector, { timeout: 1000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Obtiene el texto de un elemento
     */
    static async getElementText(page: Page, selector: string): Promise<string> {
        return await page.textContent(selector) || '';
    }

    /**
     * Obtiene el valor de un input
     */
    static async getInputValue(page: Page, selector: string): Promise<string> {
        return await page.inputValue(selector);
    }

    /**
     * Verifica si un checkbox está marcado
     */
    static async isCheckboxChecked(page: Page, selector: string): Promise<boolean> {
        return await page.isChecked(selector);
    }

    /**
     * Verifica si un elemento está visible
     */
    static async isElementVisible(page: Page, selector: string): Promise<boolean> {
        return await page.isVisible(selector);
    }

    /**
     * Verifica si un elemento está habilitado
     */
    static async isElementEnabled(page: Page, selector: string): Promise<boolean> {
        return await page.isEnabled(selector);
    }

    /**
     * Obtiene el atributo de un elemento
     */
    static async getElementAttribute(page: Page, selector: string, attribute: string): Promise<string | null> {
        return await page.getAttribute(selector, attribute);
    }

    /**
     * Ejecuta JavaScript en la página
     */
    static async executeScript(page: Page, script: string, ...args: any[]): Promise<any> {
        return await page.evaluate(script, ...args);
    }

    /**
     * Espera a que se complete una función específica
     */
    static async waitForFunction(page: Page, fn: Function, ...args: any[]): Promise<void> {
        await page.waitForFunction(fn, ...args);
    }

    /**
     * Intercepta y modifica peticiones de red
     */
    static async interceptRequest(page: Page, urlPattern: string, handler: (request: any) => void): Promise<void> {
        await page.route(urlPattern, handler);
    }

    /**
     * Bloquea recursos específicos (imágenes, CSS, etc.)
     */
    static async blockResources(page: Page, resourceTypes: string[] = ['image', 'stylesheet', 'font']): Promise<void> {
        await page.route('**/*', (route) => {
            if (resourceTypes.includes(route.request().resourceType())) {
                route.abort();
            } else {
                route.continue();
            }
        });
    }
}
