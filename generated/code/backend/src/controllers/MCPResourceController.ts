/**
 * MCPResourceController
 * Model-specific business logic for MCPResource
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/**
 * MCPResourceController class
 */
export class MCPResourceController {
  
  /**
   * Validate MCPResource data
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
   * Create a new MCPResource
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Create record
    const mCPResource = await prisma.mCPResource.create({
      data,
      include: {
        server: true
      }
    });

    

    return mCPResource;
  }

  
  /**
   * Retrieve MCPResource by ID
   */
  public async retrieve(id: string): Promise<any> {
    const mCPResource = await prisma.mCPResource.findUnique({
      where: { id },
      include: {
        server: true
      }
    });

    if (!mCPResource) {
      throw new Error('MCPResource not found');
    }

    return mCPResource;
  }

  /**
   * Retrieve all MCPResources
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.mCPResource.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        server: true
      }
    });
  }

  
  /**
   * Update MCPResource
   */
  public async update(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'update' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Update record
    const mCPResource = await prisma.mCPResource.update({
      where: { id },
      data,
      include: {
        server: true
      }
    });

    

    return mCPResource;
  }

  
  /**
   * Evolve MCPResource through lifecycle
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    

    // Update record
    const mCPResource = await prisma.mCPResource.update({
      where: { id },
      data,
      include: {
        server: true
      }
    });

    return mCPResource;
  }

  
  /**
   * Delete MCPResource
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.mCPResource.delete({
      where: { id }
    });

    
  }

  
}

// Export singleton instance
export const mCPResourceController = new MCPResourceController();
export default mCPResourceController;
