/**
 * VSCodeExtensionController
 * Model-specific business logic for VSCodeExtension
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * VSCodeExtensionController class
 */
export class VSCodeExtensionController {
  
  /**
   * Validate VSCodeExtension data
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
   * Create a new VSCodeExtension
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    

    // Create record
    const vSCodeExtension = await prisma.vSCodeExtension.create({
      data: prismaData,
      include: {
        languages: true,
        commands: true,
        themes: true
      }
    });

    

    return vSCodeExtension;
  }

  
  /**
   * Retrieve VSCodeExtension by ID
   */
  public async retrieve(id: string): Promise<any> {
    const vSCodeExtension = await prisma.vSCodeExtension.findUnique({
      where: { id: parseId(id) },
      include: {
        languages: true,
        commands: true,
        themes: true
      }
    });

    if (!vSCodeExtension) {
      throw new Error('VSCodeExtension not found');
    }

    return vSCodeExtension;
  }

  /**
   * Retrieve all VSCodeExtensions
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.vSCodeExtension.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        languages: true,
        commands: true,
        themes: true
      }
    });
  }

  
  /**
   * Update VSCodeExtension
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
    

    // Update record
    const vSCodeExtension = await prisma.vSCodeExtension.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        languages: true,
        commands: true,
        themes: true
      }
    });

    

    return vSCodeExtension;
  }

  
  /**
   * Evolve VSCodeExtension through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.vSCodeExtension.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('VSCodeExtension not found');
    }

    

    // Update record
    const vSCodeExtension = await prisma.vSCodeExtension.update({
      where: { id: parseId(id) },
      data,
      include: {
        languages: true,
        commands: true,
        themes: true
      }
    });

    return vSCodeExtension;
  }

  
  /**
   * Delete VSCodeExtension
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.vSCodeExtension.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const vSCodeExtensionController = new VSCodeExtensionController();
export default vSCodeExtensionController;
