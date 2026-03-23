/**
 * CodeTemplateController
 * Model-specific business logic for CodeTemplate
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/**
 * CodeTemplateController class
 */
export class CodeTemplateController {
  
  /**
   * Validate CodeTemplate data
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
   * Create a new CodeTemplate
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Create record
    const codeTemplate = await prisma.codeTemplate.create({
      data,
      include: {
        entityModule: true
      }
    });

    

    return codeTemplate;
  }

  
  /**
   * Retrieve CodeTemplate by ID
   */
  public async retrieve(id: string): Promise<any> {
    const codeTemplate = await prisma.codeTemplate.findUnique({
      where: { id },
      include: {
        entityModule: true
      }
    });

    if (!codeTemplate) {
      throw new Error('CodeTemplate not found');
    }

    return codeTemplate;
  }

  /**
   * Retrieve all CodeTemplates
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.codeTemplate.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        entityModule: true
      }
    });
  }

  
  /**
   * Update CodeTemplate
   */
  public async update(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'update' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Update record
    const codeTemplate = await prisma.codeTemplate.update({
      where: { id },
      data,
      include: {
        entityModule: true
      }
    });

    

    return codeTemplate;
  }

  
  /**
   * Evolve CodeTemplate through lifecycle
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    

    // Update record
    const codeTemplate = await prisma.codeTemplate.update({
      where: { id },
      data,
      include: {
        entityModule: true
      }
    });

    return codeTemplate;
  }

  
  /**
   * Delete CodeTemplate
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.codeTemplate.delete({
      where: { id }
    });

    
  }

  
}

// Export singleton instance
export const codeTemplateController = new CodeTemplateController();
export default codeTemplateController;
