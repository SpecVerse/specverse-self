/**
 * MCPToolController
 * Model-specific business logic for MCPTool
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/**
 * MCPToolController class
 */
export class MCPToolController {
  
  /**
   * Validate MCPTool data
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
   * Create a new MCPTool
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Create record
    const mCPTool = await prisma.mCPTool.create({
      data,
      include: {
        server: true
      }
    });

    

    return mCPTool;
  }

  
  /**
   * Retrieve MCPTool by ID
   */
  public async retrieve(id: string): Promise<any> {
    const mCPTool = await prisma.mCPTool.findUnique({
      where: { id },
      include: {
        server: true
      }
    });

    if (!mCPTool) {
      throw new Error('MCPTool not found');
    }

    return mCPTool;
  }

  /**
   * Retrieve all MCPTools
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.mCPTool.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        server: true
      }
    });
  }

  
  /**
   * Update MCPTool
   */
  public async update(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'update' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Update record
    const mCPTool = await prisma.mCPTool.update({
      where: { id },
      data,
      include: {
        server: true
      }
    });

    

    return mCPTool;
  }

  
  /**
   * Evolve MCPTool through lifecycle
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    

    // Update record
    const mCPTool = await prisma.mCPTool.update({
      where: { id },
      data,
      include: {
        server: true
      }
    });

    return mCPTool;
  }

  
  /**
   * Delete MCPTool
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.mCPTool.delete({
      where: { id }
    });

    
  }

  
}

// Export singleton instance
export const mCPToolController = new MCPToolController();
export default mCPToolController;
