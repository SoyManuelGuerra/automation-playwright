# 🏗️ Automated Testing Repository with Page Object Model (POM)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.x-green.svg)](https://playwright.dev/)
[![Jest](https://img.shields.io/badge/Jest-29.x-red.svg)](https://jestjs.io/)
[![Page Object Model](https://img.shields.io/badge/Pattern-POM-purple.svg)](https://playwright.dev/docs/pom)

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Page Object Model](#-page-object-model)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Prerrequisitos](#-prerrequisitos)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Ejecución de Pruebas](#-ejecución-de-pruebas)
- [Mejores Prácticas](#-mejores-prácticas)
- [Contribución](#-contribución)

## 🎯 Descripción del Proyecto

Este repositorio implementa un framework de pruebas automatizadas robusto usando **TypeScript** y el **Page Object Model (POM)**, combinando la potencia de **Playwright** con una arquitectura limpia, mantenible y escalable. POM es un patrón de diseño que encapsula los elementos y comportamientos de una página web en clases separadas, mejorando la reutilización y mantenibilidad del código de pruebas.

### 🚀 Características Principales

- ✅ **TypeScript** para type safety y mejor DX
- ✅ **Playwright** como motor de automatización moderno
- ✅ **Page Object Model** implementado siguiendo mejores prácticas
- ✅ **Separación clara** entre lógica de UI y lógica de pruebas
- ✅ **Reutilización máxima** de código
- ✅ **Pruebas legibles** y fáciles de mantener
- ✅ **Soporte multi-navegador** (Chrome, Firefox, Safari, Edge)
- ✅ **Integración con Jest** para ejecución y reportes
- ✅ **Configuración flexible** mediante archivos de configuración
- ✅ **API Testing** integrado con supertest
- ✅ **Visual Testing** con screenshots y videos
- ✅ **Paralelización** nativa de Playwright
- ✅ **Data-Driven Testing** con JSON y CSV
- ✅ **Component-Based Architecture** para elementos reutilizables

## 🏗️ Page Object Model

El Page Object Model es un patrón de diseño que encapsula los elementos y comportamientos de una página web en clases separadas. Esto proporciona varias ventajas:

### 🎯 **Beneficios del POM:**

1. **Mantenibilidad**: Cambios en la UI solo requieren actualizar la clase Page Object
2. **Reutilización**: Los métodos de página pueden ser reutilizados en múltiples pruebas
3. **Legibilidad**: Las pruebas se leen como especificaciones de negocio
4. **Separación de responsabilidades**: UI logic separada de test logic
5. **Escalabilidad**: Fácil agregar nuevas páginas y funcionalidades

### 📄 **Estructura de un Page Object:**

```typescript
export class LoginPage {
    // Locators (Selectores)
    private readonly emailInput = this.page.locator('[data-testid="email"]');
    private readonly passwordInput = this.page.locator('[data-testid="password"]');
    private readonly loginButton = this.page.locator('[data-testid="login-button"]');
    private readonly errorMessage = this.page.locator('[data-testid="error-message"]');

    constructor(private readonly page: Page) {}

    // Actions (Acciones)
    async navigateToLogin(): Promise<void> {
        await this.page.goto('/login');
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    // Business Methods (Métodos de Negocio)
    async login(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    // Assertions (Verificaciones)
    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }

    async isLoginButtonVisible(): Promise<boolean> {
        return await this.loginButton.isVisible();
    }
}
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── pages/                     # Page Objects
│   ├── base/                  # Clases base y abstracciones
│   │   ├── BasePage.ts        # Clase base para todas las páginas
│   │   ├── BaseComponent.ts   # Clase base para componentes
│   │   └── PageFactory.ts     # Factory para crear páginas
│   ├── auth/                  # Páginas de autenticación
│   │   ├── LoginPage.ts
│   │   ├── RegisterPage.ts
│   │   └── ForgotPasswordPage.ts
│   ├── dashboard/             # Páginas del dashboard
│   │   ├── DashboardPage.ts
│   │   ├── ProfilePage.ts
│   │   └── SettingsPage.ts
│   └── common/                # Páginas comunes
│       ├── HeaderComponent.ts
│       ├── FooterComponent.ts
│       ├── NavigationMenu.ts
│       └── ModalComponent.ts
├── components/                # Componentes reutilizables
│   ├── Button.ts
│   ├── Input.ts
│   ├── Select.ts
│   ├── Table.ts
│   └── Form.ts
├── utils/                     # Utilidades y helpers
│   ├── TestDataGenerator.ts   # Generación de datos de prueba
│   ├── DateUtils.ts          # Manipulación de fechas
│   ├── StringUtils.ts        # Utilidades de strings
│   ├── FileUtils.ts          # Manejo de archivos
│   └── BrowserUtils.ts       # Utilidades del navegador
├── api/                       # Clientes y modelos de API
│   ├── clients/
│   │   ├── UserApiClient.ts
│   │   ├── AuthApiClient.ts
│   │   └── BaseApiClient.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── LoginRequest.ts
│   │   └── ApiResponse.ts
│   └── endpoints/
│       ├── AuthEndpoints.ts
│       └── UserEndpoints.ts
├── config/                    # Configuración del framework
│   ├── TestConfig.ts
│   ├── PlaywrightConfig.ts
│   ├── ApiConfig.ts
│   └── Environment.ts
└── types/                     # Definiciones de tipos TypeScript
    ├── User.ts
    ├── TestData.ts
    └── PageElements.ts

tests/
├── features/                  # Casos de prueba organizados por funcionalidad
│   ├── authentication/
│   │   ├── login.test.ts
│   │   ├── register.test.ts
│   │   ├── logout.test.ts
│   │   └── forgot-password.test.ts
│   ├── dashboard/
│   │   ├── dashboard-navigation.test.ts
│   │   ├── profile-management.test.ts
│   │   └── settings.test.ts
│   ├── user-management/
│   │   ├── create-user.test.ts
│   │   ├── update-user.test.ts
│   │   └── delete-user.test.ts
│   └── e2e/
│       ├── complete-user-journey.test.ts
│       └── critical-path.test.ts
├── api/                       # Pruebas de API
│   ├── auth-api.test.ts
│   ├── user-api.test.ts
│   └── integration.test.ts
├── fixtures/                  # Fixtures y datos de prueba
│   ├── users.fixture.ts
│   ├── test-data.fixture.ts
│   └── api-responses.fixture.ts
├── helpers/                   # Helpers de prueba
│   ├── test-helpers.ts
│   ├── assertion-helpers.ts
│   └── data-helpers.ts
└── setup/                     # Configuración de pruebas
    ├── global-setup.ts
    ├── global-teardown.ts
    └── test-setup.ts

data/                          # Datos de prueba
├── test-data.json
├── users.csv
├── config/
│   ├── test-environments.json
│   └── browser-config.json
└── fixtures/
    ├── sample-files/
    └── mock-responses/

config/
├── playwright.config.ts       # Configuración de Playwright
├── jest.config.ts            # Configuración de Jest
├── tsconfig.json             # Configuración de TypeScript
├── .env                      # Variables de entorno
└── .env.example              # Ejemplo de variables de entorno
```

## 📋 Prerrequisitos

- **Node.js 18+**
- **npm 9+** o **yarn 1.22+**
- **TypeScript 5.x**
- **Git**
- **IDE** (VS Code, WebStorm, IntelliJ IDEA)

## 🛠️ Instalación

1. **Clonar el repositorio:**
```bash
git clone <repository-url>
cd automated-testing-pom
```

2. **Instalar dependencias:**
```bash
npm install
# o
yarn install
```

3. **Instalar navegadores de Playwright:**
```bash
npx playwright install
```

4. **Configurar variables de entorno:**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

5. **Verificar instalación:**
```bash
npm run test:smoke
```

## 📁 Estructura del Proyecto Detallada

### 🏠 **BasePage - Clase Base**

```typescript
// src/pages/base/BasePage.ts
import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Métodos comunes para todas las páginas
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ 
            path: `screenshots/${name}-${Date.now()}.png`,
            fullPage: true 
        });
    }

    // Métodos de utilidad
    protected async waitForElement(locator: Locator, timeout = 10000): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    protected async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    protected async getElementText(locator: Locator): Promise<string> {
        return await locator.textContent() || '';
    }
}
```

### 🔐 **LoginPage - Ejemplo Completo**

```typescript
// src/pages/auth/LoginPage.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { DashboardPage } from '../dashboard/DashboardPage';

export class LoginPage extends BasePage {
    // Locators
    private readonly emailInput = this.page.locator('[data-testid="email"]');
    private readonly passwordInput = this.page.locator('[data-testid="password"]');
    private readonly loginButton = this.page.locator('[data-testid="login-button"]');
    private readonly errorMessage = this.page.locator('[data-testid="error-message"]');
    private readonly forgotPasswordLink = this.page.locator('[data-testid="forgot-password"]');
    private readonly registerLink = this.page.locator('[data-testid="register-link"]');

    constructor(page: Page) {
        super(page);
    }

    // Navigation
    async navigateToLogin(): Promise<void> {
        await this.navigateTo('/login');
        await this.waitForPageLoad();
    }

    // Actions
    async fillEmail(email: string): Promise<void> {
        await this.waitForElement(this.emailInput);
        await this.emailInput.clear();
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.waitForElement(this.passwordInput);
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async clickForgotPassword(): Promise<void> {
        await this.forgotPasswordLink.click();
    }

    async clickRegisterLink(): Promise<void> {
        await this.registerLink.click();
    }

    // Business Methods
    async login(email: string, password: string): Promise<DashboardPage> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginButton();
        
        // Esperar a que la página de dashboard se cargue
        await this.page.waitForURL('**/dashboard');
        
        return new DashboardPage(this.page);
    }

    async loginWithInvalidCredentials(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    // Assertions
    async getErrorMessage(): Promise<string> {
        await this.waitForElement(this.errorMessage);
        return await this.getElementText(this.errorMessage);
    }

    async isLoginButtonEnabled(): Promise<boolean> {
        return await this.loginButton.isEnabled();
    }

    async isErrorMessageVisible(): Promise<boolean> {
        return await this.isElementVisible(this.errorMessage);
    }

    // Validations
    async validateLoginPageElements(): Promise<void> {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        await expect(this.forgotPasswordLink).toBeVisible();
        await expect(this.registerLink).toBeVisible();
    }

    async validateErrorMessage(expectedMessage: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(expectedMessage);
    }
}
```

### 🧩 **Componente Reutilizable**

```typescript
// src/components/Button.ts
import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../pages/base/BaseComponent';

export class Button extends BaseComponent {
    private readonly button: Locator;

    constructor(page: Page, selector: string) {
        super(page);
        this.button = this.page.locator(selector);
    }

    async click(): Promise<void> {
        await this.button.click();
    }

    async isEnabled(): Promise<boolean> {
        return await this.button.isEnabled();
    }

    async isVisible(): Promise<boolean> {
        return await this.button.isVisible();
    }

    async getText(): Promise<string> {
        return await this.getElementText(this.button);
    }

    async hover(): Promise<void> {
        await this.button.hover();
    }
}
```

### 🔧 **Utilidades del Framework**

#### **TestDataGenerator - Generación de Datos**

```typescript
// src/utils/TestDataGenerator.ts
import { TestDataGenerator } from '../utils/TestDataGenerator';

// Generar datos de prueba dinámicos
const testUser = TestDataGenerator.generateTestUser();
const email = TestDataGenerator.generateEmail('example.com');
const password = TestDataGenerator.generatePassword(16);
const phone = TestDataGenerator.generatePhoneNumber();

// Uso en pruebas
test('user registration', async ({ page }) => {
    const user = TestDataGenerator.generateTestUser();
    
    await page.fill('[data-testid="email"]', user.email);
    await page.fill('[data-testid="password"]', user.password);
    await page.fill('[data-testid="firstName"]', user.firstName);
    await page.fill('[data-testid="lastName"]', user.lastName);
});
```

#### **DateUtils - Manipulación de Fechas**

```typescript
// src/utils/DateUtils.ts
import { DateUtils } from '../utils/DateUtils';

// Trabajar con fechas en pruebas
const currentDate = DateUtils.getCurrentDateFormatted(); // "2024-01-15"
const futureDate = DateUtils.getFutureDate(30); // 30 días en el futuro
const birthDate = DateUtils.getRandomBirthDate(); // Fecha de nacimiento aleatoria
const age = DateUtils.getAge(birthDate); // Edad calculada

// Uso en formularios
test('date picker interaction', async ({ page }) => {
    const targetDate = DateUtils.formatDate(DateUtils.getFutureDate(7));
    
    await page.fill('[data-testid="date-input"]', targetDate);
    await page.click('[data-testid="submit-button"]');
});
```

#### **StringUtils - Manipulación de Texto**

```typescript
// src/utils/StringUtils.ts
import { StringUtils } from '../utils/StringUtils';

// Transformar strings
const camelCase = StringUtils.toCamelCase('user name'); // "userName"
const kebabCase = StringUtils.toKebabCase('User Name'); // "user-name"
const slug = StringUtils.generateSlug('My Test Title!'); // "my-test-title"
const truncated = StringUtils.truncate('Very long text...', 10); // "Very lo..."

// Validaciones
const isValidEmail = StringUtils.isValidEmail('test@example.com'); // true
const isValidUrl = StringUtils.isValidUrl('https://example.com'); // true
const isNumeric = StringUtils.isNumeric('12345'); // true

// Uso en pruebas
test('form validation', async ({ page }) => {
    const invalidEmail = 'invalid-email';
    const validEmail = StringUtils.generateRandomString(8) + '@test.com';
    
    await page.fill('[data-testid="email"]', invalidEmail);
    await expect(page.locator('[data-testid="error"]')).toBeVisible();
    
    await page.fill('[data-testid="email"]', validEmail);
    await expect(page.locator('[data-testid="error"]')).toBeHidden();
});
```

#### **FileUtils - Manejo de Archivos**

```typescript
// src/utils/FileUtils.ts
import { FileUtils } from '../utils/FileUtils';

// Leer y escribir archivos
const testData = await FileUtils.readJsonFile('./data/test-data.json');
const csvData = await FileUtils.readCsvFile('./data/users.csv');

// Crear archivos temporales
const tempFile = await FileUtils.createTempFile('Test content', '.txt');

// Verificar archivos
const fileExists = await FileUtils.fileExists('./screenshots/test.png');
const fileSize = await FileUtils.getFileSize('./data/large-file.json');

// Uso en pruebas
test('file upload', async ({ page }) => {
    const testFile = await FileUtils.createTempFile('Test file content');
    
    await page.setInputFiles('[data-testid="file-input"]', testFile);
    await page.click('[data-testid="upload-button"]');
    
    await FileUtils.deleteFile(testFile); // Limpiar
});
```

#### **BrowserUtils - Utilidades del Navegador**

```typescript
// src/utils/BrowserUtils.ts
import { BrowserUtils } from '../utils/BrowserUtils';

// Interacciones avanzadas con el navegador
await BrowserUtils.waitForPageLoad(page);
await BrowserUtils.scrollToElement(page, '[data-testid="footer"]');
await BrowserUtils.takeScreenshot(page, 'test-screenshot');

// Manejo de storage
await BrowserUtils.setLocalStorageItem(page, 'user-token', 'abc123');
const token = await BrowserUtils.getLocalStorageItem(page, 'user-token');
await BrowserUtils.clearAllStorage(page);

// Simulación de teclas
await BrowserUtils.pressEnter(page, '[data-testid="search-input"]');
await BrowserUtils.pressEscape(page);

// Verificaciones de elementos
const isVisible = await BrowserUtils.isElementVisible(page, '[data-testid="modal"]');
const elementText = await BrowserUtils.getElementText(page, '[data-testid="title"]');
const inputValue = await BrowserUtils.getInputValue(page, '[data-testid="email"]');

// Uso en pruebas
test('keyboard navigation', async ({ page }) => {
    await page.goto('/search');
    
    await BrowserUtils.typeText(page, '[data-testid="search"]', 'test query');
    await BrowserUtils.pressEnter(page, '[data-testid="search"]');
    
    await BrowserUtils.waitForElementVisible(page, '[data-testid="results"]');
    await BrowserUtils.takeScreenshot(page, 'search-results');
});
```

## 🚀 Ejecución de Pruebas

### Ejecutar todas las pruebas:
```bash
npm test
# o
yarn test
```

### Ejecutar pruebas específicas:
```bash
# Por feature
npm test -- --testNamePattern="Authentication"

# Por archivo específico
npm test tests/features/authentication/login.test.ts

# Por tag
npm test -- --grep="@smoke"
```

### Ejecutar con navegador específico:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Ejecutar en modo headless:
```bash
npx playwright test --headed=false
```

### Ejecutar con paralelización:
```bash
npx playwright test --workers=4
```

### Ejecutar pruebas de API:
```bash
npm run test:api
```

### Ejecutar pruebas de smoke:
```bash
npm run test:smoke
```

### Ejecutar pruebas de regresión:
```bash
npm run test:regression
```

### Generar reportes:
```bash
npx playwright show-report
```

## 🏆 Mejores Prácticas

### 1. **Nomenclatura de Locators**
```typescript
// ✅ Bueno - Usar data-testid
private readonly emailInput = this.page.locator('[data-testid="email"]');

// ❌ Evitar - Selectores CSS frágiles
private readonly emailInput = this.page.locator('#login-form > div:nth-child(1) input');
```

### 2. **Métodos de Negocio vs Acciones**
```typescript
// ✅ Métodos de negocio (high-level)
async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
}

// ✅ Acciones individuales (low-level)
async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
}
```

### 3. **Manejo de Esperas**
```typescript
// ✅ Esperas explícitas
await this.waitForElement(this.emailInput);
await this.page.waitForURL('**/dashboard');

// ❌ Evitar esperas fijas
await this.page.waitForTimeout(5000);
```

### 4. **Separación de Responsabilidades**
```typescript
// ✅ Page Object solo maneja UI
export class LoginPage extends BasePage {
    async login(email: string, password: string): Promise<void> {
        // Solo lógica de UI
    }
}

// ✅ Test maneja lógica de negocio
test('user can login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = testData.getValidUser();
    
    await loginPage.navigateToLogin();
    await loginPage.login(user.email, user.password);
    
    // Assertions aquí
});
```

### 5. **Reutilización de Código**
```typescript
// ✅ Usar herencia
export class BasePage {
    protected async takeScreenshot(name: string): Promise<void> {
        // Lógica común
    }
}

// ✅ Usar composición
export class LoginPage {
    private readonly header = new HeaderComponent(this.page);
    private readonly footer = new FooterComponent(this.page);
}
```

## 📊 Ejemplo de Prueba Completa

```typescript
// tests/features/authentication/login.test.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/dashboard/DashboardPage';
import { testData } from '../../fixtures/test-data.fixture';

test.describe('Authentication - Login', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.navigateToLogin();
    });

    test('should login successfully with valid credentials', async () => {
        const user = testData.validUser;
        
        const resultPage = await loginPage.login(user.email, user.password);
        
        expect(resultPage).toBeInstanceOf(DashboardPage);
        await expect(page).toHaveURL(/.*dashboard/);
        await dashboardPage.validateUserIsLoggedIn(user.name);
    });

    test('should show error message with invalid credentials', async () => {
        const invalidUser = testData.invalidUser;
        
        await loginPage.loginWithInvalidCredentials(
            invalidUser.email, 
            invalidUser.password
        );
        
        await loginPage.validateErrorMessage('Invalid email or password');
        await expect(page).toHaveURL(/.*login/);
    });

    test('should validate all login page elements', async () => {
        await loginPage.validateLoginPageElements();
    });

    test('should navigate to forgot password page', async () => {
        await loginPage.clickForgotPassword();
        await expect(page).toHaveURL(/.*forgot-password/);
    });

    test('should navigate to register page', async () => {
        await loginPage.clickRegisterLink();
        await expect(page).toHaveURL(/.*register/);
    });
});
```

## 🔧 Configuración Avanzada

### Variables de Entorno (.env)
```bash
# .env
BASE_URL=https://example.com
API_BASE_URL=https://api.example.com
BROWSER=chromium
HEADLESS=true
WORKERS=4
TIMEOUT=30000
SCREENSHOT_ON_FAILURE=true
VIDEO_ON_FAILURE=true
```

### Configuración de Playwright
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    timeout: 30 * 1000,
    
    reporter: [
        ['html', { outputFolder: 'playwright-report' }],
        ['json', { outputFile: 'test-results.json' }],
        ['junit', { outputFile: 'test-results.xml' }]
    ],
    
    use: {
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 10000,
        navigationTimeout: 30000,
    },
    
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'mobile-chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'mobile-safari',
            use: { ...devices['iPhone 12'] },
        }
    ],
    
    webServer: {
        command: 'npm run start',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    }
});
```

## 📈 Métricas y Reportes

- **Playwright HTML Report**: Reportes interactivos con screenshots y videos
- **Jest Coverage**: Cobertura de código de Page Objects
- **Performance Metrics**: Métricas de rendimiento automáticas
- **Visual Testing**: Comparación visual de UI
- **API Testing**: Reportes de pruebas de API
- **Test Execution Reports**: Reportes detallados de ejecución

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de TypeScript establecidas
- Añade tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario
- Usa mensajes de commit descriptivos
- Asegúrate de que todos los tests pasen
- Sigue el patrón Page Object Model establecido

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **Manuel Guerra** - *Desarrollo inicial* - [@manuelguerra](https://github.com/manuelguerra)

## 🙏 Agradecimientos

- Comunidad de Playwright
- Comunidad de TypeScript
- Documentación oficial de Page Object Model
- Todos los contribuidores del proyecto

---

## 📚 Recursos Adicionales

- [Documentación Playwright](https://playwright.dev/)
- [Documentación TypeScript](https://www.typescriptlang.org/)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Jest Documentation](https://jestjs.io/)

## 🐛 Reportar Issues

Si encuentras algún problema, por favor:
1. Verifica que el issue no haya sido reportado anteriormente
2. Proporciona información detallada del problema
3. Incluye pasos para reproducir el error
4. Adjunta logs y screenshots si es necesario

---

**¡Happy Testing with Page Object Model! 🏗️✨**
