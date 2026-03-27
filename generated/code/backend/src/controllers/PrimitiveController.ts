/**
 * PrimitiveController
 * Model-specific business logic for Primitive
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * PrimitiveController class
 */
export class PrimitiveController {
  
  /**
   * Validate Primitive data
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
   * Create a new Primitive
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
    const primitive = await prisma.primitive.create({
      data: prismaData
    });

    

    return primitive;
  }

  
  /**
   * Retrieve Primitive by ID
   */
  public async retrieve(id: string): Promise<any> {
    const primitive = await prisma.primitive.findUnique({
      where: { id: parseId(id) }
    });

    if (!primitive) {
      throw new Error('Primitive not found');
    }

    return primitive;
  }

  /**
   * Retrieve all Primitives
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.primitive.findMany({
      skip: options.skip,
      take: options.take
    });
  }

  
  /**
   * Update Primitive
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
    const primitive = await prisma.primitive.update({
      where: { id: parseId(id) },
      data: updateData
    });

    

    return primitive;
  }

  
  /**
   * Evolve Primitive through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.primitive.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('Primitive not found');
    }

    

    // Update record
    const primitive = await prisma.primitive.update({
      where: { id: parseId(id) },
      data
    });

    return primitive;
  }

  
  /**
   * Delete Primitive
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.primitive.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const primitiveController = new PrimitiveController();
export default primitiveController;
