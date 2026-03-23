/**
 * ImportForm
 * Form component for creating/editing Import
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { Import } from '../../types/Import';

// Zod schema for form validation
const importSchema = z.object({
    from: z.string().optional(),
  file: z.string().optional(),
  package: z.string().optional(),
  namespace: z.string().optional(),
  version: z.string().optional(),
  select: z.string().optional(),
});

type ImportFormData = z.infer<typeof importSchema>;

interface ImportFormProps {
  import?: Import;
  onSubmit: (data: ImportFormData) => void;
  onValidate?: (data: ImportFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * ImportForm Component
 */
export function ImportForm({ import, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: ImportFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ImportFormData>({
    resolver: zodResolver(importSchema),
    defaultValues: import || {},
  });

  // Reset form when import changes
  useEffect(() => {
    if (import) {
      reset(import);
    } else {
      reset({});
    }
  }, [import, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="import-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="from" className="block text-sm font-medium text-gray-300 mb-1">
            from
          </label>
          <input
            id="from"
            type="text"
            {...register('from')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['from']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter from"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['from'] && (
            <p className="mt-1 text-xs text-red-400">{errors['from']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-1">
            file
          </label>
          <input
            id="file"
            type="text"
            {...register('file')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['file']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter file"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['file'] && (
            <p className="mt-1 text-xs text-red-400">{errors['file']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="package" className="block text-sm font-medium text-gray-300 mb-1">
            package
          </label>
          <input
            id="package"
            type="text"
            {...register('package')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['package']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter package"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['package'] && (
            <p className="mt-1 text-xs text-red-400">{errors['package']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="namespace" className="block text-sm font-medium text-gray-300 mb-1">
            namespace
          </label>
          <input
            id="namespace"
            type="text"
            {...register('namespace')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['namespace']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter namespace"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['namespace'] && (
            <p className="mt-1 text-xs text-red-400">{errors['namespace']?.message}</p>
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
          <label htmlFor="select" className="block text-sm font-medium text-gray-300 mb-1">
            select
          </label>
          <input
            id="select"
            type="text"
            {...register('select')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['select']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter select"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['select'] && (
            <p className="mt-1 text-xs text-red-400">{errors['select']?.message}</p>
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
