/**
 * RuleTemplateController
 * Model-specific business logic for RuleTemplate
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * RuleTemplateController class
 */
export class RuleTemplateController {
  
  /**
   * Validate RuleTemplate data
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
   * Create a new RuleTemplate
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.ruleId) {
      prismaData.rule = { connect: { id: prismaData.ruleId } };
      delete prismaData.ruleId;
    }

    // Create record
    const ruleTemplate = await prisma.ruleTemplate.create({
      data: prismaData,
      include: {
        rule: true
      }
    });

    

    return ruleTemplate;
  }

  
  /**
   * Retrieve RuleTemplate by ID
   */
  public async retrieve(id: string): Promise<any> {
    const ruleTemplate = await prisma.ruleTemplate.findUnique({
      where: { id: parseId(id) },
      include: {
        rule: true
      }
    });

    if (!ruleTemplate) {
      throw new Error('RuleTemplate not found');
    }

    return ruleTemplate;
  }

  /**
   * Retrieve all RuleTemplates
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.ruleTemplate.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        rule: true
      }
    });
  }

  
  /**
   * Update RuleTemplate
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
    if (updateData.ruleId) {
      updateData.rule = { connect: { id: updateData.ruleId } };
      delete updateData.ruleId;
    }

    // Update record
    const ruleTemplate = await prisma.ruleTemplate.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        rule: true
      }
    });

    

    return ruleTemplate;
  }

  
  /**
   * Evolve RuleTemplate through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.ruleTemplate.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('RuleTemplate not found');
    }

    

    // Update record
    const ruleTemplate = await prisma.ruleTemplate.update({
      where: { id: parseId(id) },
      data,
      include: {
        rule: true
      }
    });

    return ruleTemplate;
  }

  
  /**
   * Delete RuleTemplate
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.ruleTemplate.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const ruleTemplateController = new RuleTemplateController();
export default ruleTemplateController;
