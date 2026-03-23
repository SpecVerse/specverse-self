/**
 * ConventionPatternForm
 * Form component for creating/editing ConventionPattern
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { ConventionPattern } from '../../types/ConventionPattern';

// Zod schema for form validation
const conventionpatternSchema = z.object({
    name: z.string().optional(),
  pattern: z.string().optional(),
  expandsTo: z.string().optional(),
  description: z.string().optional(),
  templateName: z.string().optional(),
  templateBody: z.string().optional(),
});

type ConventionPatternFormData = z.infer<typeof conventionpatternSchema>;

interface ConventionPatternFormProps {
  conventionpattern?: ConventionPattern;
  onSubmit: (data: ConventionPatternFormData) => void;
  onValidate?: (data: ConventionPatternFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * ConventionPatternForm Component
 */
export function ConventionPatternForm({ conventionpattern, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: ConventionPatternFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConventionPatternFormData>({
    resolver: zodResolver(conventionpatternSchema),
    defaultValues: conventionpattern || {},
  });

  // Reset form when conventionpattern changes
  useEffect(() => {
    if (conventionpattern) {
      reset(conventionpattern);
    } else {
      reset({});
    }
  }, [conventionpattern, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="conventionpattern-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
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
          <label htmlFor="pattern" className="block text-sm font-medium text-gray-300 mb-1">
            pattern
          </label>
          <input
            id="pattern"
            type="text"
            {...register('pattern')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['pattern']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter pattern"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['pattern'] && (
            <p className="mt-1 text-xs text-red-400">{errors['pattern']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="expandsTo" className="block text-sm font-medium text-gray-300 mb-1">
            expandsTo
          </label>
          <input
            id="expandsTo"
            type="text"
            {...register('expandsTo')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['expandsTo']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter expandsTo"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['expandsTo'] && (
            <p className="mt-1 text-xs text-red-400">{errors['expandsTo']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            description
          </label>
          <input
            id="description"
            type="text"
            {...register('description')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['description']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter description"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['description'] && (
            <p className="mt-1 text-xs text-red-400">{errors['description']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="templateName" className="block text-sm font-medium text-gray-300 mb-1">
            templateName
          </label>
          <input
            id="templateName"
            type="text"
            {...register('templateName')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['templateName']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter templateName"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['templateName'] && (
            <p className="mt-1 text-xs text-red-400">{errors['templateName']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="templateBody" className="block text-sm font-medium text-gray-300 mb-1">
            templateBody
          </label>
          <input
            id="templateBody"
            type="text"
            {...register('templateBody')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['templateBody']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter templateBody"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['templateBody'] && (
            <p className="mt-1 text-xs text-red-400">{errors['templateBody']?.message}</p>
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
