/**
 * StepController
 * Model-specific business logic for Step
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

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

    // Create record
    const step = await prisma.step.create({
      data,
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
      where: { id },
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

    // Update record
    const step = await prisma.step.update({
      where: { id },
      data,
      include: {
        operation: true,
        expandedOperation: true
      }
    });

    

    return step;
  }

  
  /**
   * Evolve Step through lifecycle
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    

    // Update record
    const step = await prisma.step.update({
      where: { id },
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
      where: { id }
    });

    
  }

  
}

// Export singleton instance
export const stepController = new StepController();
export default stepController;
