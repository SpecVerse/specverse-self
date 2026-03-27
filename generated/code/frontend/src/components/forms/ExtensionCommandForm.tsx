/**
 * ExtensionCommandForm
 * Form component for creating/editing ExtensionCommand
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { ExtensionCommand } from '../../types/ExtensionCommand';

// Zod schema for form validation
const extensioncommandSchema = z.object({
    command: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  enablement: z.string().optional(),
  keybinding: z.string().optional(),
});

type ExtensionCommandFormData = z.infer<typeof extensioncommandSchema>;

interface ExtensionCommandFormProps {
  extensioncommand?: ExtensionCommand;
  onSubmit: (data: ExtensionCommandFormData) => void;
  onValidate?: (data: ExtensionCommandFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * ExtensionCommandForm Component
 */
export function ExtensionCommandForm({ extensioncommand, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: ExtensionCommandFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExtensionCommandFormData>({
    resolver: zodResolver(extensioncommandSchema),
    defaultValues: extensioncommand || {},
  });

  // Reset form when extensioncommand changes
  useEffect(() => {
    if (extensioncommand) {
      reset(extensioncommand);
    } else {
      reset({});
    }
  }, [extensioncommand, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="extensioncommand-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="command" className="block text-sm font-medium text-gray-300 mb-1">
            command
          </label>
          <input
            id="command"
            type="text"
            {...register('command')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['command']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter command"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['command'] && (
            <p className="mt-1 text-xs text-red-400">{errors['command']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            title
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['title']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter title"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['title'] && (
            <p className="mt-1 text-xs text-red-400">{errors['title']?.message}</p>
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
          <label htmlFor="enablement" className="block text-sm font-medium text-gray-300 mb-1">
            enablement
          </label>
          <input
            id="enablement"
            type="text"
            {...register('enablement')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['enablement']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter enablement"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['enablement'] && (
            <p className="mt-1 text-xs text-red-400">{errors['enablement']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="keybinding" className="block text-sm font-medium text-gray-300 mb-1">
            keybinding
          </label>
          <input
            id="keybinding"
            type="text"
            {...register('keybinding')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['keybinding']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter keybinding"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['keybinding'] && (
            <p className="mt-1 text-xs text-red-400">{errors['keybinding']?.message}</p>
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
