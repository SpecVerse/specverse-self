/**
 * ConventionPatternController
 * Model-specific business logic for ConventionPattern
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * ConventionPatternController class
 */
export class ConventionPatternController {
  
  /**
   * Validate ConventionPattern data
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
   * Create a new ConventionPattern
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.grammarId) {
      prismaData.grammar = { connect: { id: prismaData.grammarId } };
      delete prismaData.grammarId;
    }

    // Create record
    const conventionPattern = await prisma.conventionPattern.create({
      data: prismaData,
      include: {
        grammar: true
      }
    });

    

    return conventionPattern;
  }

  
  /**
   * Retrieve ConventionPattern by ID
   */
  public async retrieve(id: string): Promise<any> {
    const conventionPattern = await prisma.conventionPattern.findUnique({
      where: { id: parseId(id) },
      include: {
        grammar: true
      }
    });

    if (!conventionPattern) {
      throw new Error('ConventionPattern not found');
    }

    return conventionPattern;
  }

  /**
   * Retrieve all ConventionPatterns
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.conventionPattern.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        grammar: true
      }
    });
  }

  
  /**
   * Update ConventionPattern
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
    if (updateData.grammarId) {
      updateData.grammar = { connect: { id: updateData.grammarId } };
      delete updateData.grammarId;
    }

    // Update record
    const conventionPattern = await prisma.conventionPattern.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        grammar: true
      }
    });

    

    return conventionPattern;
  }

  
  /**
   * Evolve ConventionPattern through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.conventionPattern.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('ConventionPattern not found');
    }

    

    // Update record
    const conventionPattern = await prisma.conventionPattern.update({
      where: { id: parseId(id) },
      data,
      include: {
        grammar: true
      }
    });

    return conventionPattern;
  }

  
  /**
   * Delete ConventionPattern
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.conventionPattern.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const conventionPatternController = new ConventionPatternController();
export default conventionPatternController;
