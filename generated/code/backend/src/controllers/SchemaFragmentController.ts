/**
 * SchemaFragmentController
 * Model-specific business logic for SchemaFragment
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * SchemaFragmentController class
 */
export class SchemaFragmentController {
  
  /**
   * Validate SchemaFragment data
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
   * Create a new SchemaFragment
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.moduleId) {
      prismaData.module = { connect: { id: prismaData.moduleId } };
      delete prismaData.moduleId;
    }

    // Create record
    const schemaFragment = await prisma.schemaFragment.create({
      data: prismaData,
      include: {
        module: true
      }
    });

    

    return schemaFragment;
  }

  
  /**
   * Retrieve SchemaFragment by ID
   */
  public async retrieve(id: string): Promise<any> {
    const schemaFragment = await prisma.schemaFragment.findUnique({
      where: { id: parseId(id) },
      include: {
        module: true
      }
    });

    if (!schemaFragment) {
      throw new Error('SchemaFragment not found');
    }

    return schemaFragment;
  }

  /**
   * Retrieve all SchemaFragments
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.schemaFragment.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        module: true
      }
    });
  }

  
  /**
   * Update SchemaFragment
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
    if (updateData.moduleId) {
      updateData.module = { connect: { id: updateData.moduleId } };
      delete updateData.moduleId;
    }

    // Update record
    const schemaFragment = await prisma.schemaFragment.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        module: true
      }
    });

    

    return schemaFragment;
  }

  
  /**
   * Evolve SchemaFragment through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.schemaFragment.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('SchemaFragment not found');
    }

    

    // Update record
    const schemaFragment = await prisma.schemaFragment.update({
      where: { id: parseId(id) },
      data,
      include: {
        module: true
      }
    });

    return schemaFragment;
  }

  
  /**
   * Delete SchemaFragment
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.schemaFragment.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const schemaFragmentController = new SchemaFragmentController();
export default schemaFragmentController;
