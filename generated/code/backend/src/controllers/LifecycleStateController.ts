/**
 * LifecycleStateController
 * Model-specific business logic for LifecycleState
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * LifecycleStateController class
 */
export class LifecycleStateController {
  
  /**
   * Validate LifecycleState data
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
   * Create a new LifecycleState
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
    const lifecycleState = await prisma.lifecycleState.create({
      data: prismaData,
      include: {
        lifecycle: true
      }
    });

    

    return lifecycleState;
  }

  
  /**
   * Retrieve LifecycleState by ID
   */
  public async retrieve(id: string): Promise<any> {
    const lifecycleState = await prisma.lifecycleState.findUnique({
      where: { id: parseId(id) },
      include: {
        lifecycle: true
      }
    });

    if (!lifecycleState) {
      throw new Error('LifecycleState not found');
    }

    return lifecycleState;
  }

  /**
   * Retrieve all LifecycleStates
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.lifecycleState.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        lifecycle: true
      }
    });
  }

  
  /**
   * Update LifecycleState
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
    const lifecycleState = await prisma.lifecycleState.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        lifecycle: true
      }
    });

    

    return lifecycleState;
  }

  
  /**
   * Evolve LifecycleState through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.lifecycleState.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('LifecycleState not found');
    }

    

    // Update record
    const lifecycleState = await prisma.lifecycleState.update({
      where: { id: parseId(id) },
      data,
      include: {
        lifecycle: true
      }
    });

    return lifecycleState;
  }

  
  /**
   * Delete LifecycleState
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.lifecycleState.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const lifecycleStateController = new LifecycleStateController();
export default lifecycleStateController;
