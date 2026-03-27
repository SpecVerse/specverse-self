/**
 * ExtensionLanguageForm
 * Form component for creating/editing ExtensionLanguage
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { ExtensionLanguage } from '../../types/ExtensionLanguage';

// Zod schema for form validation
const extensionlanguageSchema = z.object({
    languageId: z.string().optional(),
  extensions: z.string().optional(),
  configuration: z.string().optional(),
  grammarScopeName: z.string().optional(),
  grammarPath: z.string().optional(),
});

type ExtensionLanguageFormData = z.infer<typeof extensionlanguageSchema>;

interface ExtensionLanguageFormProps {
  extensionlanguage?: ExtensionLanguage;
  onSubmit: (data: ExtensionLanguageFormData) => void;
  onValidate?: (data: ExtensionLanguageFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * ExtensionLanguageForm Component
 */
export function ExtensionLanguageForm({ extensionlanguage, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: ExtensionLanguageFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExtensionLanguageFormData>({
    resolver: zodResolver(extensionlanguageSchema),
    defaultValues: extensionlanguage || {},
  });

  // Reset form when extensionlanguage changes
  useEffect(() => {
    if (extensionlanguage) {
      reset(extensionlanguage);
    } else {
      reset({});
    }
  }, [extensionlanguage, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="extensionlanguage-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="languageId" className="block text-sm font-medium text-gray-300 mb-1">
            languageId
          </label>
          <input
            id="languageId"
            type="text"
            {...register('languageId')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['languageId']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter languageId"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['languageId'] && (
            <p className="mt-1 text-xs text-red-400">{errors['languageId']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="extensions" className="block text-sm font-medium text-gray-300 mb-1">
            extensions
          </label>
          <input
            id="extensions"
            type="text"
            {...register('extensions')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['extensions']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter extensions"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['extensions'] && (
            <p className="mt-1 text-xs text-red-400">{errors['extensions']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="configuration" className="block text-sm font-medium text-gray-300 mb-1">
            configuration
          </label>
          <input
            id="configuration"
            type="text"
            {...register('configuration')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['configuration']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter configuration"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['configuration'] && (
            <p className="mt-1 text-xs text-red-400">{errors['configuration']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="grammarScopeName" className="block text-sm font-medium text-gray-300 mb-1">
            grammarScopeName
          </label>
          <input
            id="grammarScopeName"
            type="text"
            {...register('grammarScopeName')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['grammarScopeName']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter grammarScopeName"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['grammarScopeName'] && (
            <p className="mt-1 text-xs text-red-400">{errors['grammarScopeName']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="grammarPath" className="block text-sm font-medium text-gray-300 mb-1">
            grammarPath
          </label>
          <input
            id="grammarPath"
            type="text"
            {...register('grammarPath')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['grammarPath']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter grammarPath"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['grammarPath'] && (
            <p className="mt-1 text-xs text-red-400">{errors['grammarPath']?.message}</p>
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
