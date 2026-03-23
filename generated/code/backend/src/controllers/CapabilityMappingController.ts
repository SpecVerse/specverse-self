/**
 * CapabilityMappingController
 * Model-specific business logic for CapabilityMapping
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/**
 * CapabilityMappingController class
 */
export class CapabilityMappingController {
  
  /**
   * Validate CapabilityMapping data
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
   * Create a new CapabilityMapping
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Create record
    const capabilityMapping = await prisma.capabilityMapping.create({
      data,
      include: {
        manifest: true,
        instanceFactory: true
      }
    });

    

    return capabilityMapping;
  }

  
  /**
   * Retrieve CapabilityMapping by ID
   */
  public async retrieve(id: string): Promise<any> {
    const capabilityMapping = await prisma.capabilityMapping.findUnique({
      where: { id },
      include: {
        manifest: true,
        instanceFactory: true
      }
    });

    if (!capabilityMapping) {
      throw new Error('CapabilityMapping not found');
    }

    return capabilityMapping;
  }

  /**
   * Retrieve all CapabilityMappings
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.capabilityMapping.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        manifest: true,
        instanceFactory: true
      }
    });
  }

  
  /**
   * Update CapabilityMapping
   */
  public async update(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'update' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Update record
    const capabilityMapping = await prisma.capabilityMapping.update({
      where: { id },
      data,
      include: {
        manifest: true,
        instanceFactory: true
      }
    });

    

    return capabilityMapping;
  }

  
  /**
   * Evolve CapabilityMapping through lifecycle
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    

    // Update record
    const capabilityMapping = await prisma.capabilityMapping.update({
      where: { id },
      data,
      include: {
        manifest: true,
        instanceFactory: true
      }
    });

    return capabilityMapping;
  }

  
  /**
   * Delete CapabilityMapping
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.capabilityMapping.delete({
      where: { id }
    });

    
  }

  
}

// Export singleton instance
export const capabilityMappingController = new CapabilityMappingController();
export default capabilityMappingController;
