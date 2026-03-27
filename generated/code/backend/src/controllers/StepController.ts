/**
 * StepController
 * Model-specific business logic for Step
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * StepController class
 */
export class StepController {
  
  /**
   * Validate Step data
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
   * Create a new Step
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.operationId) {
      prismaData.operation = { connect: { id: prismaData.operationId } };
      delete prismaData.operationId;
    }

    // Create record
    const step = await prisma.step.create({
      data: prismaData,
      include: {
        operation: true,
        expandedOperation: true
      }
    });

    

    return step;
  }

  
  /**
   * Retrieve Step by ID
   */
  public async retrieve(id: string): Promise<any> {
    const step = await prisma.step.findUnique({
      where: { id: parseId(id) },
      include: {
        operation: true,
        expandedOperation: true
      }
    });

    if (!step) {
      throw new Error('Step not found');
    }

    return step;
  }

  /**
   * Retrieve all Steps
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.step.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        operation: true,
        expandedOperation: true
      }
    });
  }

  
  /**
   * Update Step
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
    if (updateData.operationId) {
      updateData.operation = { connect: { id: updateData.operationId } };
      delete updateData.operationId;
    }

    // Update record
    const step = await prisma.step.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        operation: true,
        expandedOperation: true
      }
    });

    

    return step;
  }

  
  /**
   * Evolve Step through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.step.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('Step not found');
    }

    

    // Update record
    const step = await prisma.step.update({
      where: { id: parseId(id) },
      data,
      include: {
        operation: true,
        expandedOperation: true
      }
    });

    return step;
  }

  
  /**
   * Delete Step
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.step.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const stepController = new StepController();
export default stepController;
