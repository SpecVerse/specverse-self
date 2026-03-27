/**
 * InstanceFactoryController
 * Model-specific business logic for InstanceFactory
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * InstanceFactoryController class
 */
export class InstanceFactoryController {
  
  /**
   * Validate InstanceFactory data
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
   * Create a new InstanceFactory
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.manifestId) {
      prismaData.manifest = { connect: { id: prismaData.manifestId } };
      delete prismaData.manifestId;
    }

    // Create record
    const instanceFactory = await prisma.instanceFactory.create({
      data: prismaData,
      include: {
        manifest: true
      }
    });

    

    return instanceFactory;
  }

  
  /**
   * Retrieve InstanceFactory by ID
   */
  public async retrieve(id: string): Promise<any> {
    const instanceFactory = await prisma.instanceFactory.findUnique({
      where: { id: parseId(id) },
      include: {
        manifest: true
      }
    });

    if (!instanceFactory) {
      throw new Error('InstanceFactory not found');
    }

    return instanceFactory;
  }

  /**
   * Retrieve all InstanceFactorys
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.instanceFactory.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        manifest: true
      }
    });
  }

  
  /**
   * Update InstanceFactory
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
    if (updateData.manifestId) {
      updateData.manifest = { connect: { id: updateData.manifestId } };
      delete updateData.manifestId;
    }

    // Update record
    const instanceFactory = await prisma.instanceFactory.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        manifest: true
      }
    });

    

    return instanceFactory;
  }

  
  /**
   * Evolve InstanceFactory through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.instanceFactory.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('InstanceFactory not found');
    }

    

    // Update record
    const instanceFactory = await prisma.instanceFactory.update({
      where: { id: parseId(id) },
      data,
      include: {
        manifest: true
      }
    });

    return instanceFactory;
  }

  
  /**
   * Delete InstanceFactory
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.instanceFactory.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const instanceFactoryController = new InstanceFactoryController();
export default instanceFactoryController;
