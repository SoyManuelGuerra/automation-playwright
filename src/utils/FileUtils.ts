import { promises as fs } from 'fs';
import * as path from 'path';

/**
 * FileUtils - Utilidades para manejo de archivos en pruebas
 */
export class FileUtils {
    /**
     * Lee un archivo JSON y lo parsea
     */
    static async readJsonFile(filePath: string): Promise<any> {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Error reading JSON file ${filePath}: ${error}`);
        }
    }

    /**
     * Escribe un objeto a un archivo JSON
     */
    static async writeJsonFile(filePath: string, data: any): Promise<void> {
        try {
            const jsonString = JSON.stringify(data, null, 2);
            await fs.writeFile(filePath, jsonString, 'utf8');
        } catch (error) {
            throw new Error(`Error writing JSON file ${filePath}: ${error}`);
        }
    }

    /**
     * Lee un archivo CSV y lo convierte a array de objetos
     */
    static async readCsvFile(filePath: string): Promise<any[]> {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const lines = data.split('\n').filter(line => line.trim());
            
            if (lines.length === 0) return [];
            
            const headers = lines[0].split(',').map(header => header.trim());
            const result: any[] = [];
            
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(value => value.trim());
                const obj: any = {};
                
                headers.forEach((header, index) => {
                    obj[header] = values[index] || '';
                });
                
                result.push(obj);
            }
            
            return result;
        } catch (error) {
            throw new Error(`Error reading CSV file ${filePath}: ${error}`);
        }
    }

    /**
     * Escribe un array de objetos a un archivo CSV
     */
    static async writeCsvFile(filePath: string, data: any[]): Promise<void> {
        try {
            if (data.length === 0) {
                await fs.writeFile(filePath, '', 'utf8');
                return;
            }
            
            const headers = Object.keys(data[0]);
            const csvContent = [
                headers.join(','),
                ...data.map(row => headers.map(header => row[header] || '').join(','))
            ].join('\n');
            
            await fs.writeFile(filePath, csvContent, 'utf8');
        } catch (error) {
            throw new Error(`Error writing CSV file ${filePath}: ${error}`);
        }
    }

    /**
     * Verifica si un archivo existe
     */
    static async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Verifica si un directorio existe
     */
    static async directoryExists(dirPath: string): Promise<boolean> {
        try {
            const stats = await fs.stat(dirPath);
            return stats.isDirectory();
        } catch {
            return false;
        }
    }

    /**
     * Crea un directorio si no existe
     */
    static async ensureDirectoryExists(dirPath: string): Promise<void> {
        try {
            await fs.mkdir(dirPath, { recursive: true });
        } catch (error) {
            throw new Error(`Error creating directory ${dirPath}: ${error}`);
        }
    }

    /**
     * Obtiene la extensión de un archivo
     */
    static getFileExtension(filePath: string): string {
        return path.extname(filePath).toLowerCase();
    }

    /**
     * Obtiene el nombre del archivo sin extensión
     */
    static getFileNameWithoutExtension(filePath: string): string {
        return path.basename(filePath, path.extname(filePath));
    }

    /**
     * Obtiene el directorio padre de un archivo
     */
    static getDirectoryName(filePath: string): string {
        return path.dirname(filePath);
    }

    /**
     * Genera un nombre de archivo único con timestamp
     */
    static generateUniqueFileName(baseName: string, extension: string): string {
        const timestamp = Date.now();
        return `${baseName}_${timestamp}${extension}`;
    }

    /**
     * Copia un archivo a otra ubicación
     */
    static async copyFile(sourcePath: string, destinationPath: string): Promise<void> {
        try {
            await fs.copyFile(sourcePath, destinationPath);
        } catch (error) {
            throw new Error(`Error copying file from ${sourcePath} to ${destinationPath}: ${error}`);
        }
    }

    /**
     * Elimina un archivo
     */
    static async deleteFile(filePath: string): Promise<void> {
        try {
            await fs.unlink(filePath);
        } catch (error) {
            throw new Error(`Error deleting file ${filePath}: ${error}`);
        }
    }

    /**
     * Obtiene el tamaño de un archivo en bytes
     */
    static async getFileSize(filePath: string): Promise<number> {
        try {
            const stats = await fs.stat(filePath);
            return stats.size;
        } catch (error) {
            throw new Error(`Error getting file size for ${filePath}: ${error}`);
        }
    }

    /**
     * Lista archivos en un directorio
     */
    static async listFiles(dirPath: string, extension?: string): Promise<string[]> {
        try {
            const files = await fs.readdir(dirPath);
            
            if (extension) {
                return files.filter(file => file.toLowerCase().endsWith(extension.toLowerCase()));
            }
            
            return files;
        } catch (error) {
            throw new Error(`Error listing files in ${dirPath}: ${error}`);
        }
    }

    /**
     * Lee un archivo de texto
     */
    static async readTextFile(filePath: string): Promise<string> {
        try {
            return await fs.readFile(filePath, 'utf8');
        } catch (error) {
            throw new Error(`Error reading text file ${filePath}: ${error}`);
        }
    }

    /**
     * Escribe un archivo de texto
     */
    static async writeTextFile(filePath: string, content: string): Promise<void> {
        try {
            await fs.writeFile(filePath, content, 'utf8');
        } catch (error) {
            throw new Error(`Error writing text file ${filePath}: ${error}`);
        }
    }

    /**
     * Añade contenido a un archivo existente
     */
    static async appendToFile(filePath: string, content: string): Promise<void> {
        try {
            await fs.appendFile(filePath, content, 'utf8');
        } catch (error) {
            throw new Error(`Error appending to file ${filePath}: ${error}`);
        }
    }

    /**
     * Crea un archivo temporal con contenido específico
     */
    static async createTempFile(content: string, extension: string = '.tmp'): Promise<string> {
        const tempDir = path.join(process.cwd(), 'temp');
        await this.ensureDirectoryExists(tempDir);
        
        const fileName = this.generateUniqueFileName('temp', extension);
        const filePath = path.join(tempDir, fileName);
        
        await this.writeTextFile(filePath, content);
        return filePath;
    }

    /**
     * Limpia archivos temporales
     */
    static async cleanupTempFiles(tempDir: string = 'temp'): Promise<void> {
        try {
            const files = await fs.readdir(tempDir);
            
            for (const file of files) {
                const filePath = path.join(tempDir, file);
                await fs.unlink(filePath);
            }
        } catch (error) {
            // Ignorar errores de limpieza
            console.warn(`Warning: Could not cleanup temp files: ${error}`);
        }
    }
}
