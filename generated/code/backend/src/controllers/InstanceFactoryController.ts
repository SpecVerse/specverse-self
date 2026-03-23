/**
 * InstanceFactoryController
 * Model-specific business logic for InstanceFactory
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

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

    // Create record
    const instanceFactory = await prisma.instanceFactory.create({
      data,
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
      where: { id },
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

    // Update record
    const instanceFactory = await prisma.instanceFactory.update({
      where: { id },
      data,
      include: {
        manifest: true
      }
    });

    

    return instanceFactory;
  }

  
  /**
   * Evolve InstanceFactory through lifecycle
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    

    // Update record
    const instanceFactory = await prisma.instanceFactory.update({
      where: { id },
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
      where: { id }
    });

    
  }

  
}

// Export singleton instance
export const instanceFactoryController = new InstanceFactoryController();
export default instanceFactoryController;
