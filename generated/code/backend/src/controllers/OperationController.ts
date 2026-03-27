/**
 * OperationController
 * Model-specific business logic for Operation
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * OperationController class
 */
export class OperationController {
  
  /**
   * Validate Operation data
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
   * Create a new Operation
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
    const operation = await prisma.operation.create({
      data: prismaData,
      include: {
        parameters: true,
        publishes: true,
        steps: true
      }
    });

    

    return operation;
  }

  
  /**
   * Retrieve Operation by ID
   */
  public async retrieve(id: string): Promise<any> {
    const operation = await prisma.operation.findUnique({
      where: { id: parseId(id) },
      include: {
        parameters: true,
        publishes: true,
        steps: true
      }
    });

    if (!operation) {
      throw new Error('Operation not found');
    }

    return operation;
  }

  /**
   * Retrieve all Operations
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.operation.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        parameters: true,
        publishes: true,
        steps: true
      }
    });
  }

  
  /**
   * Update Operation
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
    const operation = await prisma.operation.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        parameters: true,
        publishes: true,
        steps: true
      }
    });

    

    return operation;
  }

  
  /**
   * Evolve Operation through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.operation.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('Operation not found');
    }

    

    // Update record
    const operation = await prisma.operation.update({
      where: { id: parseId(id) },
      data,
      include: {
        parameters: true,
        publishes: true,
        steps: true
      }
    });

    return operation;
  }

  
  /**
   * Delete Operation
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.operation.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const operationController = new OperationController();
export default operationController;
