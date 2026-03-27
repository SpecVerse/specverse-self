/**
 * BehaviourSpecController
 * Model-specific business logic for BehaviourSpec
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * BehaviourSpecController class
 */
export class BehaviourSpecController {
  
  /**
   * Validate BehaviourSpec data
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
   * Create a new BehaviourSpec
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
    const behaviourSpec = await prisma.behaviourSpec.create({
      data: prismaData,
      include: {
        module: true
      }
    });

    

    return behaviourSpec;
  }

  
  /**
   * Retrieve BehaviourSpec by ID
   */
  public async retrieve(id: string): Promise<any> {
    const behaviourSpec = await prisma.behaviourSpec.findUnique({
      where: { id: parseId(id) },
      include: {
        module: true
      }
    });

    if (!behaviourSpec) {
      throw new Error('BehaviourSpec not found');
    }

    return behaviourSpec;
  }

  /**
   * Retrieve all BehaviourSpecs
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.behaviourSpec.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        module: true
      }
    });
  }

  
  /**
   * Update BehaviourSpec
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
    const behaviourSpec = await prisma.behaviourSpec.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        module: true
      }
    });

    

    return behaviourSpec;
  }

  
  /**
   * Evolve BehaviourSpec through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.behaviourSpec.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('BehaviourSpec not found');
    }

    

    // Update record
    const behaviourSpec = await prisma.behaviourSpec.update({
      where: { id: parseId(id) },
      data,
      include: {
        module: true
      }
    });

    return behaviourSpec;
  }

  
  /**
   * Delete BehaviourSpec
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.behaviourSpec.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const behaviourSpecController = new BehaviourSpecController();
export default behaviourSpecController;
