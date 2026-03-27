/**
 * ProfileController
 * Model-specific business logic for Profile
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * ProfileController class
 */
export class ProfileController {
  
  /**
   * Validate Profile data
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
   * Create a new Profile
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.modelId) {
      prismaData.model = { connect: { id: prismaData.modelId } };
      delete prismaData.modelId;
    }

    // Create record
    const profile = await prisma.profile.create({
      data: prismaData,
      include: {
        model: true
      }
    });

    

    return profile;
  }

  
  /**
   * Retrieve Profile by ID
   */
  public async retrieve(id: string): Promise<any> {
    const profile = await prisma.profile.findUnique({
      where: { id: parseId(id) },
      include: {
        model: true
      }
    });

    if (!profile) {
      throw new Error('Profile not found');
    }

    return profile;
  }

  /**
   * Retrieve all Profiles
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.profile.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        model: true
      }
    });
  }

  
  /**
   * Update Profile
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
    if (updateData.modelId) {
      updateData.model = { connect: { id: updateData.modelId } };
      delete updateData.modelId;
    }

    // Update record
    const profile = await prisma.profile.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        model: true
      }
    });

    

    return profile;
  }

  
  /**
   * Evolve Profile through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.profile.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('Profile not found');
    }

    

    // Update record
    const profile = await prisma.profile.update({
      where: { id: parseId(id) },
      data,
      include: {
        model: true
      }
    });

    return profile;
  }

  
  /**
   * Delete Profile
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.profile.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const profileController = new ProfileController();
export default profileController;
