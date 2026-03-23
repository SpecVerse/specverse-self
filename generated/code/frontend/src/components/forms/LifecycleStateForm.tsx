/**
 * LifecycleStateForm
 * Form component for creating/editing LifecycleState
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { LifecycleState } from '../../types/LifecycleState';

// Zod schema for form validation
const lifecyclestateSchema = z.object({
    name: z.string().optional(),
  isInitial: z.boolean().optional(),
  isTerminal: z.boolean().optional(),
});

type LifecycleStateFormData = z.infer<typeof lifecyclestateSchema>;

interface LifecycleStateFormProps {
  lifecyclestate?: LifecycleState;
  onSubmit: (data: LifecycleStateFormData) => void;
  onValidate?: (data: LifecycleStateFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * LifecycleStateForm Component
 */
export function LifecycleStateForm({ lifecyclestate, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: LifecycleStateFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LifecycleStateFormData>({
    resolver: zodResolver(lifecyclestateSchema),
    defaultValues: lifecyclestate || {},
  });

  // Reset form when lifecyclestate changes
  useEffect(() => {
    if (lifecyclestate) {
      reset(lifecyclestate);
    } else {
      reset({});
    }
  }, [lifecyclestate, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lifecyclestate-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
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
          <label htmlFor="isInitial" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="isInitial"
              type="checkbox"
              {...register('isInitial')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            isInitial
          </label>
          {errors['isInitial'] && (
            <p className="mt-1 text-xs text-red-400">{errors['isInitial']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="isTerminal" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="isTerminal"
              type="checkbox"
              {...register('isTerminal')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            isTerminal
          </label>
          {errors['isTerminal'] && (
            <p className="mt-1 text-xs text-red-400">{errors['isTerminal']?.message}</p>
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
