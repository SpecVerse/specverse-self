/**
 * InferenceRuleForm
 * Form component for creating/editing InferenceRule
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { InferenceRule } from '../../types/InferenceRule';

// Zod schema for form validation
const inferenceruleSchema = z.object({
    ruleId: z.string().optional(),
  description: z.string().optional(),
  pattern: z.string().optional(),
  priority: z.number().optional(),
  category: z.string().optional(),
  conditionExpression: z.string().optional(),
  isActive: z.boolean().optional(),
});

type InferenceRuleFormData = z.infer<typeof inferenceruleSchema>;

interface InferenceRuleFormProps {
  inferencerule?: InferenceRule;
  onSubmit: (data: InferenceRuleFormData) => void;
  onValidate?: (data: InferenceRuleFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * InferenceRuleForm Component
 */
export function InferenceRuleForm({ inferencerule, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: InferenceRuleFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InferenceRuleFormData>({
    resolver: zodResolver(inferenceruleSchema),
    defaultValues: inferencerule || {},
  });

  // Reset form when inferencerule changes
  useEffect(() => {
    if (inferencerule) {
      reset(inferencerule);
    } else {
      reset({});
    }
  }, [inferencerule, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="inferencerule-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="ruleId" className="block text-sm font-medium text-gray-300 mb-1">
            ruleId
          </label>
          <input
            id="ruleId"
            type="text"
            {...register('ruleId')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['ruleId']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter ruleId"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['ruleId'] && (
            <p className="mt-1 text-xs text-red-400">{errors['ruleId']?.message}</p>
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
          <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
            priority
          </label>
          <input
            id="priority"
            type="number"
            {...register('priority')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['priority']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter priority"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['priority'] && (
            <p className="mt-1 text-xs text-red-400">{errors['priority']?.message}</p>
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
          <label htmlFor="conditionExpression" className="block text-sm font-medium text-gray-300 mb-1">
            conditionExpression
          </label>
          <input
            id="conditionExpression"
            type="text"
            {...register('conditionExpression')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['conditionExpression']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter conditionExpression"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['conditionExpression'] && (
            <p className="mt-1 text-xs text-red-400">{errors['conditionExpression']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="isActive" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="isActive"
              type="checkbox"
              {...register('isActive')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            isActive
          </label>
          {errors['isActive'] && (
            <p className="mt-1 text-xs text-red-400">{errors['isActive']?.message}</p>
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
