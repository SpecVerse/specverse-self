/**
 * DeploymentController
 * Model-specific business logic for Deployment
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * DeploymentController class
 */
export class DeploymentController {
  
  /**
   * Validate Deployment data
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
   * Create a new Deployment
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.specificationId) {
      prismaData.specification = { connect: { id: prismaData.specificationId } };
      delete prismaData.specificationId;
    }

    // Create record
    const deployment = await prisma.deployment.create({
      data: prismaData,
      include: {
        specification: true,
        instances: true,
        channels: true
      }
    });

    

    return deployment;
  }

  
  /**
   * Retrieve Deployment by ID
   */
  public async retrieve(id: string): Promise<any> {
    const deployment = await prisma.deployment.findUnique({
      where: { id: parseId(id) },
      include: {
        specification: true,
        instances: true,
        channels: true
      }
    });

    if (!deployment) {
      throw new Error('Deployment not found');
    }

    return deployment;
  }

  /**
   * Retrieve all Deployments
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.deployment.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        specification: true,
        instances: true,
        channels: true
      }
    });
  }

  
  /**
   * Update Deployment
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
    if (updateData.specificationId) {
      updateData.specification = { connect: { id: updateData.specificationId } };
      delete updateData.specificationId;
    }

    // Update record
    const deployment = await prisma.deployment.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        specification: true,
        instances: true,
        channels: true
      }
    });

    

    return deployment;
  }

  
  /**
   * Evolve Deployment through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.deployment.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('Deployment not found');
    }

    

    // Update record
    const deployment = await prisma.deployment.update({
      where: { id: parseId(id) },
      data,
      include: {
        specification: true,
        instances: true,
        channels: true
      }
    });

    return deployment;
  }

  
  /**
   * Delete Deployment
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.deployment.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const deploymentController = new DeploymentController();
export default deploymentController;
