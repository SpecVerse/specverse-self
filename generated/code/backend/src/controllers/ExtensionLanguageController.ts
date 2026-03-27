/**
 * ExtensionLanguageController
 * Model-specific business logic for ExtensionLanguage
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * ExtensionLanguageController class
 */
export class ExtensionLanguageController {
  
  /**
   * Validate ExtensionLanguage data
   * Unified validation method for all operations
   */
  public validate(
    _data: any,
    _context: { operation: 'create' | 'update' | 'evolve' }
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // No validation rules defined

    return {
      valid: errors.length === 0,
      errors
    };
  }

  
  /**
   * Create a new ExtensionLanguage
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.extensionId) {
      prismaData.extension = { connect: { id: prismaData.extensionId } };
      delete prismaData.extensionId;
    }

    // Create record
    const extensionLanguage = await prisma.extensionLanguage.create({
      data: prismaData,
      include: {
        extension: true
      }
    });

    

    return extensionLanguage;
  }

  
  /**
   * Retrieve ExtensionLanguage by ID
   */
  public async retrieve(id: string): Promise<any> {
    const extensionLanguage = await prisma.extensionLanguage.findUnique({
      where: { id: parseId(id) },
      include: {
        extension: true
      }
    });

    if (!extensionLanguage) {
      throw new Error('ExtensionLanguage not found');
    }

    return extensionLanguage;
  }

  /**
   * Retrieve all ExtensionLanguages
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.extensionLanguage.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        extension: true
      }
    });
  }

  
  /**
   * Update ExtensionLanguage
   */
  public async update(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'update' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Strip nested relations and id — only send scalar fields to Prisma
    const updateData: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === 'id') continue;
      if (Array.isArray(value)) continue;
      if (value !== null && typeof value === 'object' && !(value instanceof Date)) continue;
      updateData[key] = value;
    }

    // Transform FK fields to Prisma connect format
    if (updateData.extensionId) {
      updateData.extension = { connect: { id: updateData.extensionId } };
      delete updateData.extensionId;
    }

    // Update record
    const extensionLanguage = await prisma.extensionLanguage.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        extension: true
      }
    });

    

    return extensionLanguage;
  }

  
  /**
   * Evolve ExtensionLanguage through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.extensionLanguage.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('ExtensionLanguage not found');
    }

    

    // Update record
    const extensionLanguage = await prisma.extensionLanguage.update({
      where: { id: parseId(id) },
      data,
      include: {
        extension: true
      }
    });

    return extensionLanguage;
  }

  
  /**
   * Delete ExtensionLanguage
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.extensionLanguage.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const extensionLanguageController = new ExtensionLanguageController();
export default extensionLanguageController;
