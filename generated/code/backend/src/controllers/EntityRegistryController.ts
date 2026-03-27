/**
 * EntityRegistryController
 * Model-specific business logic for EntityRegistry
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * EntityRegistryController class
 */
export class EntityRegistryController {
  
  /**
   * Validate EntityRegistry data
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
   * Create a new EntityRegistry
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
    const entityRegistry = await prisma.entityRegistry.create({
      data: prismaData
    });

    

    return entityRegistry;
  }

  
  /**
   * Retrieve EntityRegistry by ID
   */
  public async retrieve(id: string): Promise<any> {
    const entityRegistry = await prisma.entityRegistry.findUnique({
      where: { id: parseId(id) }
    });

    if (!entityRegistry) {
      throw new Error('EntityRegistry not found');
    }

    return entityRegistry;
  }

  /**
   * Retrieve all EntityRegistrys
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.entityRegistry.findMany({
      skip: options.skip,
      take: options.take
    });
  }

  
  /**
   * Update EntityRegistry
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
    const entityRegistry = await prisma.entityRegistry.update({
      where: { id: parseId(id) },
      data: updateData
    });

    

    return entityRegistry;
  }

  
  /**
   * Evolve EntityRegistry through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.entityRegistry.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('EntityRegistry not found');
    }

    

    // Update record
    const entityRegistry = await prisma.entityRegistry.update({
      where: { id: parseId(id) },
      data
    });

    return entityRegistry;
  }

  
  /**
   * Delete EntityRegistry
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.entityRegistry.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const entityRegistryController = new EntityRegistryController();
export default entityRegistryController;
