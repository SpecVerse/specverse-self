/**
 * ViewForm
 * Form component for creating/editing View
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { View } from '../../types/View';

// Zod schema for form validation
const viewSchema = z.object({
    name: z.string().optional(),
  viewType: z.string().optional(),
  primaryModel: z.string().optional(),
  tags: z.string().optional(),
  export: z.boolean().optional(),
  hasProfileSupport: z.boolean().optional(),
});

type ViewFormData = z.infer<typeof viewSchema>;

interface ViewFormProps {
  view?: View;
  onSubmit: (data: ViewFormData) => void;
  onValidate?: (data: ViewFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * ViewForm Component
 */
export function ViewForm({ view, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: ViewFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ViewFormData>({
    resolver: zodResolver(viewSchema),
    defaultValues: view || {},
  });

  // Reset form when view changes
  useEffect(() => {
    if (view) {
      reset(view);
    } else {
      reset({});
    }
  }, [view, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="view-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
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
          <label htmlFor="viewType" className="block text-sm font-medium text-gray-300 mb-1">
            viewType
          </label>
          <input
            id="viewType"
            type="text"
            {...register('viewType')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['viewType']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter viewType"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['viewType'] && (
            <p className="mt-1 text-xs text-red-400">{errors['viewType']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="primaryModel" className="block text-sm font-medium text-gray-300 mb-1">
            primaryModel
          </label>
          <input
            id="primaryModel"
            type="text"
            {...register('primaryModel')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['primaryModel']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter primaryModel"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['primaryModel'] && (
            <p className="mt-1 text-xs text-red-400">{errors['primaryModel']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
            tags
          </label>
          <input
            id="tags"
            type="text"
            {...register('tags')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['tags']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter tags"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['tags'] && (
            <p className="mt-1 text-xs text-red-400">{errors['tags']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="export" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="export"
              type="checkbox"
              {...register('export')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            export
          </label>
          {errors['export'] && (
            <p className="mt-1 text-xs text-red-400">{errors['export']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="hasProfileSupport" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="hasProfileSupport"
              type="checkbox"
              {...register('hasProfileSupport')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            hasProfileSupport
          </label>
          {errors['hasProfileSupport'] && (
            <p className="mt-1 text-xs text-red-400">{errors['hasProfileSupport']?.message}</p>
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
