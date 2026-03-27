/**
 * LifecycleTransitionController
 * Model-specific business logic for LifecycleTransition
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * LifecycleTransitionController class
 */
export class LifecycleTransitionController {
  
  /**
   * Validate LifecycleTransition data
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
   * Create a new LifecycleTransition
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.lifecycleId) {
      prismaData.lifecycle = { connect: { id: prismaData.lifecycleId } };
      delete prismaData.lifecycleId;
    }

    // Create record
    const lifecycleTransition = await prisma.lifecycleTransition.create({
      data: prismaData,
      include: {
        lifecycle: true
      }
    });

    

    return lifecycleTransition;
  }

  
  /**
   * Retrieve LifecycleTransition by ID
   */
  public async retrieve(id: string): Promise<any> {
    const lifecycleTransition = await prisma.lifecycleTransition.findUnique({
      where: { id: parseId(id) },
      include: {
        lifecycle: true
      }
    });

    if (!lifecycleTransition) {
      throw new Error('LifecycleTransition not found');
    }

    return lifecycleTransition;
  }

  /**
   * Retrieve all LifecycleTransitions
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.lifecycleTransition.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        lifecycle: true
      }
    });
  }

  
  /**
   * Update LifecycleTransition
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
    if (updateData.lifecycleId) {
      updateData.lifecycle = { connect: { id: updateData.lifecycleId } };
      delete updateData.lifecycleId;
    }

    // Update record
    const lifecycleTransition = await prisma.lifecycleTransition.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        lifecycle: true
      }
    });

    

    return lifecycleTransition;
  }

  
  /**
   * Evolve LifecycleTransition through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.lifecycleTransition.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('LifecycleTransition not found');
    }

    

    // Update record
    const lifecycleTransition = await prisma.lifecycleTransition.update({
      where: { id: parseId(id) },
      data,
      include: {
        lifecycle: true
      }
    });

    return lifecycleTransition;
  }

  
  /**
   * Delete LifecycleTransition
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.lifecycleTransition.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const lifecycleTransitionController = new LifecycleTransitionController();
export default lifecycleTransitionController;
