/**
 * LifecycleTransitionForm
 * Form component for creating/editing LifecycleTransition
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { LifecycleTransition } from '../../types/LifecycleTransition';

// Zod schema for form validation
const lifecycletransitionSchema = z.object({
    name: z.string().optional(),
  fromState: z.string().optional(),
  toState: z.string().optional(),
  action: z.string().optional(),
});

type LifecycleTransitionFormData = z.infer<typeof lifecycletransitionSchema>;

interface LifecycleTransitionFormProps {
  lifecycletransition?: LifecycleTransition;
  onSubmit: (data: LifecycleTransitionFormData) => void;
  onValidate?: (data: LifecycleTransitionFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * LifecycleTransitionForm Component
 */
export function LifecycleTransitionForm({ lifecycletransition, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: LifecycleTransitionFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LifecycleTransitionFormData>({
    resolver: zodResolver(lifecycletransitionSchema),
    defaultValues: lifecycletransition || {},
  });

  // Reset form when lifecycletransition changes
  useEffect(() => {
    if (lifecycletransition) {
      reset(lifecycletransition);
    } else {
      reset({});
    }
  }, [lifecycletransition, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lifecycletransition-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
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
          <label htmlFor="fromState" className="block text-sm font-medium text-gray-300 mb-1">
            fromState
          </label>
          <input
            id="fromState"
            type="text"
            {...register('fromState')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['fromState']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter fromState"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['fromState'] && (
            <p className="mt-1 text-xs text-red-400">{errors['fromState']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="toState" className="block text-sm font-medium text-gray-300 mb-1">
            toState
          </label>
          <input
            id="toState"
            type="text"
            {...register('toState')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['toState']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter toState"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['toState'] && (
            <p className="mt-1 text-xs text-red-400">{errors['toState']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="action" className="block text-sm font-medium text-gray-300 mb-1">
            action
          </label>
          <input
            id="action"
            type="text"
            {...register('action')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['action']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter action"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['action'] && (
            <p className="mt-1 text-xs text-red-400">{errors['action']?.message}</p>
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
