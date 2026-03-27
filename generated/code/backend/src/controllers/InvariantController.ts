/**
 * InvariantController
 * Model-specific business logic for Invariant
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * InvariantController class
 */
export class InvariantController {
  
  /**
   * Validate Invariant data
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
   * Create a new Invariant
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.specId) {
      prismaData.spec = { connect: { id: prismaData.specId } };
      delete prismaData.specId;
    }

    // Create record
    const invariant = await prisma.invariant.create({
      data: prismaData,
      include: {
        spec: true
      }
    });

    

    return invariant;
  }

  
  /**
   * Retrieve Invariant by ID
   */
  public async retrieve(id: string): Promise<any> {
    const invariant = await prisma.invariant.findUnique({
      where: { id: parseId(id) },
      include: {
        spec: true
      }
    });

    if (!invariant) {
      throw new Error('Invariant not found');
    }

    return invariant;
  }

  /**
   * Retrieve all Invariants
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.invariant.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        spec: true
      }
    });
  }

  
  /**
   * Update Invariant
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
    if (updateData.specId) {
      updateData.spec = { connect: { id: updateData.specId } };
      delete updateData.specId;
    }

    // Update record
    const invariant = await prisma.invariant.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        spec: true
      }
    });

    

    return invariant;
  }

  
  /**
   * Evolve Invariant through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.invariant.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('Invariant not found');
    }

    

    // Update record
    const invariant = await prisma.invariant.update({
      where: { id: parseId(id) },
      data,
      include: {
        spec: true
      }
    });

    return invariant;
  }

  
  /**
   * Delete Invariant
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.invariant.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const invariantController = new InvariantController();
export default invariantController;
