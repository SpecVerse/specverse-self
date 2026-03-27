/**
 * ViewController
 * Model-specific business logic for View
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * ViewController class
 */
export class ViewController {
  
  /**
   * Validate View data
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
   * Create a new View
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.componentId) {
      prismaData.component = { connect: { id: prismaData.componentId } };
      delete prismaData.componentId;
    }

    // Create record
    const view = await prisma.view.create({
      data: prismaData,
      include: {
        component: true,
        layout: true,
        uiComponents: true,
        subscriptions: true
      }
    });

    

    return view;
  }

  
  /**
   * Retrieve View by ID
   */
  public async retrieve(id: string): Promise<any> {
    const view = await prisma.view.findUnique({
      where: { id: parseId(id) },
      include: {
        component: true,
        layout: true,
        uiComponents: true,
        subscriptions: true
      }
    });

    if (!view) {
      throw new Error('View not found');
    }

    return view;
  }

  /**
   * Retrieve all Views
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.view.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        component: true,
        layout: true,
        uiComponents: true,
        subscriptions: true
      }
    });
  }

  
  /**
   * Update View
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
    if (updateData.componentId) {
      updateData.component = { connect: { id: updateData.componentId } };
      delete updateData.componentId;
    }

    // Update record
    const view = await prisma.view.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        component: true,
        layout: true,
        uiComponents: true,
        subscriptions: true
      }
    });

    

    return view;
  }

  
  /**
   * Evolve View through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.view.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('View not found');
    }

    

    // Update record
    const view = await prisma.view.update({
      where: { id: parseId(id) },
      data,
      include: {
        component: true,
        layout: true,
        uiComponents: true,
        subscriptions: true
      }
    });

    return view;
  }

  
  /**
   * Delete View
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.view.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const viewController = new ViewController();
export default viewController;
