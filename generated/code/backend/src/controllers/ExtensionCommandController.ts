/**
 * ExtensionCommandController
 * Model-specific business logic for ExtensionCommand
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * ExtensionCommandController class
 */
export class ExtensionCommandController {
  
  /**
   * Validate ExtensionCommand data
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
   * Create a new ExtensionCommand
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.extensionId) {
      prismaData.extension = { connect: { id: prismaData.extensionId } };
      delete prismaData.extensionId;
    }

    // Create record
    const extensionCommand = await prisma.extensionCommand.create({
      data: prismaData,
      include: {
        extension: true
      }
    });

    

    return extensionCommand;
  }

  
  /**
   * Retrieve ExtensionCommand by ID
   */
  public async retrieve(id: string): Promise<any> {
    const extensionCommand = await prisma.extensionCommand.findUnique({
      where: { id: parseId(id) },
      include: {
        extension: true
      }
    });

    if (!extensionCommand) {
      throw new Error('ExtensionCommand not found');
    }

    return extensionCommand;
  }

  /**
   * Retrieve all ExtensionCommands
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.extensionCommand.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        extension: true
      }
    });
  }

  
  /**
   * Update ExtensionCommand
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
    if (updateData.extensionId) {
      updateData.extension = { connect: { id: updateData.extensionId } };
      delete updateData.extensionId;
    }

    // Update record
    const extensionCommand = await prisma.extensionCommand.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        extension: true
      }
    });

    

    return extensionCommand;
  }

  
  /**
   * Evolve ExtensionCommand through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.extensionCommand.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('ExtensionCommand not found');
    }

    

    // Update record
    const extensionCommand = await prisma.extensionCommand.update({
      where: { id: parseId(id) },
      data,
      include: {
        extension: true
      }
    });

    return extensionCommand;
  }

  
  /**
   * Delete ExtensionCommand
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.extensionCommand.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const extensionCommandController = new ExtensionCommandController();
export default extensionCommandController;
