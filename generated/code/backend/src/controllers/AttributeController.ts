/**
 * AttributeController
 * Model-specific business logic for Attribute
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * AttributeController class
 */
export class AttributeController {
  
  /**
   * Validate Attribute data
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
   * Create a new Attribute
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.modelId) {
      prismaData.model = { connect: { id: prismaData.modelId } };
      delete prismaData.modelId;
    }

    // Create record
    const attribute = await prisma.attribute.create({
      data: prismaData,
      include: {
        model: true
      }
    });

    

    return attribute;
  }

  
  /**
   * Retrieve Attribute by ID
   */
  public async retrieve(id: string): Promise<any> {
    const attribute = await prisma.attribute.findUnique({
      where: { id: parseId(id) },
      include: {
        model: true
      }
    });

    if (!attribute) {
      throw new Error('Attribute not found');
    }

    return attribute;
  }

  /**
   * Retrieve all Attributes
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.attribute.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        model: true
      }
    });
  }

  
  /**
   * Update Attribute
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
    if (updateData.modelId) {
      updateData.model = { connect: { id: updateData.modelId } };
      delete updateData.modelId;
    }

    // Update record
    const attribute = await prisma.attribute.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        model: true
      }
    });

    

    return attribute;
  }

  
  /**
   * Evolve Attribute through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.attribute.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('Attribute not found');
    }

    

    // Update record
    const attribute = await prisma.attribute.update({
      where: { id: parseId(id) },
      data,
      include: {
        model: true
      }
    });

    return attribute;
  }

  
  /**
   * Delete Attribute
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.attribute.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const attributeController = new AttributeController();
export default attributeController;
