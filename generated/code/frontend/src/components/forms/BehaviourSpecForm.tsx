/**
 * BehaviourSpecForm
 * Form component for creating/editing BehaviourSpec
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { BehaviourSpec } from '../../types/BehaviourSpec';

// Zod schema for form validation
const behaviourspecSchema = z.object({
    entityType: z.string().optional(),
  invariantCount: z.number().optional(),
  ruleCount: z.number().optional(),
  verificationStatus: z.string().optional(),
});

type BehaviourSpecFormData = z.infer<typeof behaviourspecSchema>;

interface BehaviourSpecFormProps {
  behaviourspec?: BehaviourSpec;
  onSubmit: (data: BehaviourSpecFormData) => void;
  onValidate?: (data: BehaviourSpecFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * BehaviourSpecForm Component
 */
export function BehaviourSpecForm({ behaviourspec, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: BehaviourSpecFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BehaviourSpecFormData>({
    resolver: zodResolver(behaviourspecSchema),
    defaultValues: behaviourspec || {},
  });

  // Reset form when behaviourspec changes
  useEffect(() => {
    if (behaviourspec) {
      reset(behaviourspec);
    } else {
      reset({});
    }
  }, [behaviourspec, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="behaviourspec-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="entityType" className="block text-sm font-medium text-gray-300 mb-1">
            entityType
          </label>
          <input
            id="entityType"
            type="text"
            {...register('entityType')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['entityType']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter entityType"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['entityType'] && (
            <p className="mt-1 text-xs text-red-400">{errors['entityType']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="invariantCount" className="block text-sm font-medium text-gray-300 mb-1">
            invariantCount
          </label>
          <input
            id="invariantCount"
            type="number"
            {...register('invariantCount')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['invariantCount']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter invariantCount"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['invariantCount'] && (
            <p className="mt-1 text-xs text-red-400">{errors['invariantCount']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="ruleCount" className="block text-sm font-medium text-gray-300 mb-1">
            ruleCount
          </label>
          <input
            id="ruleCount"
            type="number"
            {...register('ruleCount')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['ruleCount']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter ruleCount"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['ruleCount'] && (
            <p className="mt-1 text-xs text-red-400">{errors['ruleCount']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="verificationStatus" className="block text-sm font-medium text-gray-300 mb-1">
            verificationStatus
          </label>
          <input
            id="verificationStatus"
            type="text"
            {...register('verificationStatus')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['verificationStatus']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter verificationStatus"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['verificationStatus'] && (
            <p className="mt-1 text-xs text-red-400">{errors['verificationStatus']?.message}</p>
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
