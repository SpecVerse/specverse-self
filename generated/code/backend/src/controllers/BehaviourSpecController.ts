/**
 * BehaviourSpecController
 * Model-specific business logic for BehaviourSpec
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

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

    // Create record
    const behaviourSpec = await prisma.behaviourSpec.create({
      data,
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
      where: { id },
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

    // Update record
    const behaviourSpec = await prisma.behaviourSpec.update({
      where: { id },
      data,
      include: {
        module: true
      }
    });

    

    return behaviourSpec;
  }

  
  /**
   * Evolve BehaviourSpec through lifecycle
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    

    // Update record
    const behaviourSpec = await prisma.behaviourSpec.update({
      where: { id },
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
      where: { id }
    });

    
  }

  
}

// Export singleton instance
export const behaviourSpecController = new BehaviourSpecController();
export default behaviourSpecController;
