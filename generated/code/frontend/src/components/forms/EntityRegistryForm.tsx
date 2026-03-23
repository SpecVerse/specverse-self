/**
 * EntityRegistryForm
 * Form component for creating/editing EntityRegistry
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { EntityRegistry } from '../../types/EntityRegistry';

// Zod schema for form validation
const entityregistrySchema = z.object({
    moduleCount: z.number().optional(),
  usesKahnsAlgorithm: z.boolean().optional(),
});

type EntityRegistryFormData = z.infer<typeof entityregistrySchema>;

interface EntityRegistryFormProps {
  entityregistry?: EntityRegistry;
  onSubmit: (data: EntityRegistryFormData) => void;
  onValidate?: (data: EntityRegistryFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * EntityRegistryForm Component
 */
export function EntityRegistryForm({ entityregistry, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: EntityRegistryFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EntityRegistryFormData>({
    resolver: zodResolver(entityregistrySchema),
    defaultValues: entityregistry || {},
  });

  // Reset form when entityregistry changes
  useEffect(() => {
    if (entityregistry) {
      reset(entityregistry);
    } else {
      reset({});
    }
  }, [entityregistry, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entityregistry-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="moduleCount" className="block text-sm font-medium text-gray-300 mb-1">
            moduleCount
          </label>
          <input
            id="moduleCount"
            type="number"
            {...register('moduleCount')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['moduleCount']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter moduleCount"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['moduleCount'] && (
            <p className="mt-1 text-xs text-red-400">{errors['moduleCount']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="usesKahnsAlgorithm" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="usesKahnsAlgorithm"
              type="checkbox"
              {...register('usesKahnsAlgorithm')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            usesKahnsAlgorithm
          </label>
          {errors['usesKahnsAlgorithm'] && (
            <p className="mt-1 text-xs text-red-400">{errors['usesKahnsAlgorithm']?.message}</p>
          )}
        </div>
      </div>

      <div className="form-actions flex flex-wrap gap-2 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>

        {onValidate && (
          <button
            type="button"
            onClick={handleValidateClick}
            disabled={isValidating}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            {isValidating ? 'Validating...' : 'Validate'}
          </button>
        )}

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        )}

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-slate-600 text-gray-200 font-medium rounded hover:bg-slate-500 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
