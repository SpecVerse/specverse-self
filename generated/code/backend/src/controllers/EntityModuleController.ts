/**
 * EntityModuleController
 * Model-specific business logic for EntityModule
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * EntityModuleController class
 */
export class EntityModuleController {
  
  /**
   * Validate EntityModule data
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
   * Create a new EntityModule
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
    const entityModule = await prisma.entityModule.create({
      data: prismaData
    });

    

    return entityModule;
  }

  
  /**
   * Retrieve EntityModule by ID
   */
  public async retrieve(id: string): Promise<any> {
    const entityModule = await prisma.entityModule.findUnique({
      where: { id: parseId(id) }
    });

    if (!entityModule) {
      throw new Error('EntityModule not found');
    }

    return entityModule;
  }

  /**
   * Retrieve all EntityModules
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.entityModule.findMany({
      skip: options.skip,
      take: options.take
    });
  }

  
  /**
   * Update EntityModule
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
    const entityModule = await prisma.entityModule.update({
      where: { id: parseId(id) },
      data: updateData
    });

    

    return entityModule;
  }

  
  /**
   * Evolve EntityModule through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.entityModule.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('EntityModule not found');
    }

    

    // Update record
    const entityModule = await prisma.entityModule.update({
      where: { id: parseId(id) },
      data
    });

    return entityModule;
  }

  
  /**
   * Delete EntityModule
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.entityModule.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const entityModuleController = new EntityModuleController();
export default entityModuleController;
