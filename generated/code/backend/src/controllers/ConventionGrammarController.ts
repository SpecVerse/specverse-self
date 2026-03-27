/**
 * ConventionGrammarController
 * Model-specific business logic for ConventionGrammar
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * ConventionGrammarController class
 */
export class ConventionGrammarController {
  
  /**
   * Validate ConventionGrammar data
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
   * Create a new ConventionGrammar
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
    const conventionGrammar = await prisma.conventionGrammar.create({
      data: prismaData
    });

    

    return conventionGrammar;
  }

  
  /**
   * Retrieve ConventionGrammar by ID
   */
  public async retrieve(id: string): Promise<any> {
    const conventionGrammar = await prisma.conventionGrammar.findUnique({
      where: { id: parseId(id) }
    });

    if (!conventionGrammar) {
      throw new Error('ConventionGrammar not found');
    }

    return conventionGrammar;
  }

  /**
   * Retrieve all ConventionGrammars
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.conventionGrammar.findMany({
      skip: options.skip,
      take: options.take
    });
  }

  
  /**
   * Update ConventionGrammar
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
    const conventionGrammar = await prisma.conventionGrammar.update({
      where: { id: parseId(id) },
      data: updateData
    });

    

    return conventionGrammar;
  }

  
  /**
   * Evolve ConventionGrammar through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.conventionGrammar.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('ConventionGrammar not found');
    }

    

    // Update record
    const conventionGrammar = await prisma.conventionGrammar.update({
      where: { id: parseId(id) },
      data
    });

    return conventionGrammar;
  }

  
  /**
   * Delete ConventionGrammar
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.conventionGrammar.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const conventionGrammarController = new ConventionGrammarController();
export default conventionGrammarController;
