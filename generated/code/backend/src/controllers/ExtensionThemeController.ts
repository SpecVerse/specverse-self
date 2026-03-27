/**
 * ExtensionThemeController
 * Model-specific business logic for ExtensionTheme
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * ExtensionThemeController class
 */
export class ExtensionThemeController {
  
  /**
   * Validate ExtensionTheme data
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
   * Create a new ExtensionTheme
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
    const extensionTheme = await prisma.extensionTheme.create({
      data: prismaData,
      include: {
        extension: true
      }
    });

    

    return extensionTheme;
  }

  
  /**
   * Retrieve ExtensionTheme by ID
   */
  public async retrieve(id: string): Promise<any> {
    const extensionTheme = await prisma.extensionTheme.findUnique({
      where: { id: parseId(id) },
      include: {
        extension: true
      }
    });

    if (!extensionTheme) {
      throw new Error('ExtensionTheme not found');
    }

    return extensionTheme;
  }

  /**
   * Retrieve all ExtensionThemes
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.extensionTheme.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        extension: true
      }
    });
  }

  
  /**
   * Update ExtensionTheme
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
    const extensionTheme = await prisma.extensionTheme.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        extension: true
      }
    });

    

    return extensionTheme;
  }

  
  /**
   * Evolve ExtensionTheme through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.extensionTheme.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('ExtensionTheme not found');
    }

    

    // Update record
    const extensionTheme = await prisma.extensionTheme.update({
      where: { id: parseId(id) },
      data,
      include: {
        extension: true
      }
    });

    return extensionTheme;
  }

  
  /**
   * Delete ExtensionTheme
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.extensionTheme.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const extensionThemeController = new ExtensionThemeController();
export default extensionThemeController;
