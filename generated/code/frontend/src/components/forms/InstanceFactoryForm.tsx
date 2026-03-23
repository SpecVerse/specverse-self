/**
 * InstanceFactoryForm
 * Form component for creating/editing InstanceFactory
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { InstanceFactory } from '../../types/InstanceFactory';

// Zod schema for form validation
const instancefactorySchema = z.object({
    name: z.string().optional(),
  version: z.string().optional(),
  category: z.string().optional(),
  technology: z.string().optional(),
});

type InstanceFactoryFormData = z.infer<typeof instancefactorySchema>;

interface InstanceFactoryFormProps {
  instancefactory?: InstanceFactory;
  onSubmit: (data: InstanceFactoryFormData) => void;
  onValidate?: (data: InstanceFactoryFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * InstanceFactoryForm Component
 */
export function InstanceFactoryForm({ instancefactory, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: InstanceFactoryFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InstanceFactoryFormData>({
    resolver: zodResolver(instancefactorySchema),
    defaultValues: instancefactory || {},
  });

  // Reset form when instancefactory changes
  useEffect(() => {
    if (instancefactory) {
      reset(instancefactory);
    } else {
      reset({});
    }
  }, [instancefactory, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="instancefactory-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['name']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter name"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['name'] && (
            <p className="mt-1 text-xs text-red-400">{errors['name']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="version" className="block text-sm font-medium text-gray-300 mb-1">
            version
          </label>
          <input
            id="version"
            type="text"
            {...register('version')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['version']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter version"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['version'] && (
            <p className="mt-1 text-xs text-red-400">{errors['version']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
            category
          </label>
          <input
            id="category"
            type="text"
            {...register('category')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['category']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter category"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['category'] && (
            <p className="mt-1 text-xs text-red-400">{errors['category']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="technology" className="block text-sm font-medium text-gray-300 mb-1">
            technology
          </label>
          <input
            id="technology"
            type="text"
            {...register('technology')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['technology']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter technology"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['technology'] && (
            <p className="mt-1 text-xs text-red-400">{errors['technology']?.message}</p>
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
