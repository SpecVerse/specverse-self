/**
 * CodeTemplateController
 * Model-specific business logic for CodeTemplate
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

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

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.entityModuleId) {
      prismaData.entityModule = { connect: { id: prismaData.entityModuleId } };
      delete prismaData.entityModuleId;
    }

    // Create record
    const codeTemplate = await prisma.codeTemplate.create({
      data: prismaData,
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
      where: { id: parseId(id) },
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

    // Strip nested relations and id — only send scalar fields to Prisma
    const updateData: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === 'id') continue;
      if (Array.isArray(value)) continue;
      if (value !== null && typeof value === 'object' && !(value instanceof Date)) continue;
      updateData[key] = value;
    }

    // Transform FK fields to Prisma connect format
    if (updateData.entityModuleId) {
      updateData.entityModule = { connect: { id: updateData.entityModuleId } };
      delete updateData.entityModuleId;
    }

    // Update record
    const codeTemplate = await prisma.codeTemplate.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        entityModule: true
      }
    });

    

    return codeTemplate;
  }

  
  /**
   * Evolve CodeTemplate through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.codeTemplate.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('CodeTemplate not found');
    }

    

    // Update record
    const codeTemplate = await prisma.codeTemplate.update({
      where: { id: parseId(id) },
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
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const codeTemplateController = new CodeTemplateController();
export default codeTemplateController;
