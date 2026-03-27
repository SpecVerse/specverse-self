/**
 * LayoutController
 * Model-specific business logic for Layout
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * LayoutController class
 */
export class LayoutController {
  
  /**
   * Validate Layout data
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
   * Create a new Layout
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
    const layout = await prisma.layout.create({
      data: prismaData,
      include: {
        view: true
      }
    });

    

    return layout;
  }

  
  /**
   * Retrieve Layout by ID
   */
  public async retrieve(id: string): Promise<any> {
    const layout = await prisma.layout.findUnique({
      where: { id: parseId(id) },
      include: {
        view: true
      }
    });

    if (!layout) {
      throw new Error('Layout not found');
    }

    return layout;
  }

  /**
   * Retrieve all Layouts
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.layout.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        view: true
      }
    });
  }

  
  /**
   * Update Layout
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
    const layout = await prisma.layout.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        view: true
      }
    });

    

    return layout;
  }

  
  /**
   * Evolve Layout through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.layout.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('Layout not found');
    }

    

    // Update record
    const layout = await prisma.layout.update({
      where: { id: parseId(id) },
      data,
      include: {
        view: true
      }
    });

    return layout;
  }

  
  /**
   * Delete Layout
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.layout.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const layoutController = new LayoutController();
export default layoutController;
