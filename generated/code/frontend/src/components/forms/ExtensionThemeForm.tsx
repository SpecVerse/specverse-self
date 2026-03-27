/**
 * ExtensionThemeForm
 * Form component for creating/editing ExtensionTheme
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { ExtensionTheme } from '../../types/ExtensionTheme';

// Zod schema for form validation
const extensionthemeSchema = z.object({
    label: z.string().optional(),
  uiTheme: z.string().optional(),
  path: z.string().optional(),
});

type ExtensionThemeFormData = z.infer<typeof extensionthemeSchema>;

interface ExtensionThemeFormProps {
  extensiontheme?: ExtensionTheme;
  onSubmit: (data: ExtensionThemeFormData) => void;
  onValidate?: (data: ExtensionThemeFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * ExtensionThemeForm Component
 */
export function ExtensionThemeForm({ extensiontheme, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: ExtensionThemeFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExtensionThemeFormData>({
    resolver: zodResolver(extensionthemeSchema),
    defaultValues: extensiontheme || {},
  });

  // Reset form when extensiontheme changes
  useEffect(() => {
    if (extensiontheme) {
      reset(extensiontheme);
    } else {
      reset({});
    }
  }, [extensiontheme, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="extensiontheme-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="label" className="block text-sm font-medium text-gray-300 mb-1">
            label
          </label>
          <input
            id="label"
            type="text"
            {...register('label')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['label']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter label"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['label'] && (
            <p className="mt-1 text-xs text-red-400">{errors['label']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="uiTheme" className="block text-sm font-medium text-gray-300 mb-1">
            uiTheme
          </label>
          <input
            id="uiTheme"
            type="text"
            {...register('uiTheme')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['uiTheme']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter uiTheme"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['uiTheme'] && (
            <p className="mt-1 text-xs text-red-400">{errors['uiTheme']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="path" className="block text-sm font-medium text-gray-300 mb-1">
            path
          </label>
          <input
            id="path"
            type="text"
            {...register('path')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['path']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter path"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['path'] && (
            <p className="mt-1 text-xs text-red-400">{errors['path']?.message}</p>
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
