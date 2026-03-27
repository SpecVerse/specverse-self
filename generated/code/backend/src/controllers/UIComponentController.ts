/**
 * UIComponentController
 * Model-specific business logic for UIComponent
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * UIComponentController class
 */
export class UIComponentController {
  
  /**
   * Validate UIComponent data
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
   * Create a new UIComponent
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.viewId) {
      prismaData.view = { connect: { id: prismaData.viewId } };
      delete prismaData.viewId;
    }

    // Create record
    const uIComponent = await prisma.uIComponent.create({
      data: prismaData,
      include: {
        view: true
      }
    });

    

    return uIComponent;
  }

  
  /**
   * Retrieve UIComponent by ID
   */
  public async retrieve(id: string): Promise<any> {
    const uIComponent = await prisma.uIComponent.findUnique({
      where: { id: parseId(id) },
      include: {
        view: true
      }
    });

    if (!uIComponent) {
      throw new Error('UIComponent not found');
    }

    return uIComponent;
  }

  /**
   * Retrieve all UIComponents
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.uIComponent.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        view: true
      }
    });
  }

  
  /**
   * Update UIComponent
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
    if (updateData.viewId) {
      updateData.view = { connect: { id: updateData.viewId } };
      delete updateData.viewId;
    }

    // Update record
    const uIComponent = await prisma.uIComponent.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        view: true
      }
    });

    

    return uIComponent;
  }

  
  /**
   * Evolve UIComponent through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.uIComponent.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('UIComponent not found');
    }

    

    // Update record
    const uIComponent = await prisma.uIComponent.update({
      where: { id: parseId(id) },
      data,
      include: {
        view: true
      }
    });

    return uIComponent;
  }

  
  /**
   * Delete UIComponent
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.uIComponent.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const uIComponentController = new UIComponentController();
export default uIComponentController;
