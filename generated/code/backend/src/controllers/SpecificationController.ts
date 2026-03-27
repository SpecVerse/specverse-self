/**
 * SpecificationController
 * Model-specific business logic for Specification
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * SpecificationController class
 */
export class SpecificationController {
  
  /**
   * Validate Specification data
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
   * Create a new Specification
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    

    // Create record
    const specification = await prisma.specification.create({
      data: prismaData,
      include: {
        components: true,
        deployments: true,
        manifests: true
      }
    });

    

    return specification;
  }

  
  /**
   * Retrieve Specification by ID
   */
  public async retrieve(id: string): Promise<any> {
    const specification = await prisma.specification.findUnique({
      where: { id: parseId(id) },
      include: {
        components: true,
        deployments: true,
        manifests: true
      }
    });

    if (!specification) {
      throw new Error('Specification not found');
    }

    return specification;
  }

  /**
   * Retrieve all Specifications
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.specification.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        components: true,
        deployments: true,
        manifests: true
      }
    });
  }

  
  /**
   * Update Specification
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
    

    // Update record
    const specification = await prisma.specification.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        components: true,
        deployments: true,
        manifests: true
      }
    });

    

    return specification;
  }

  
  /**
   * Evolve Specification through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.specification.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('Specification not found');
    }

    

    // Update record
    const specification = await prisma.specification.update({
      where: { id: parseId(id) },
      data,
      include: {
        components: true,
        deployments: true,
        manifests: true
      }
    });

    return specification;
  }

  
  /**
   * Delete Specification
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.specification.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const specificationController = new SpecificationController();
export default specificationController;
