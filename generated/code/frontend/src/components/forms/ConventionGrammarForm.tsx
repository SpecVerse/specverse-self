/**
 * ConventionGrammarForm
 * Form component for creating/editing ConventionGrammar
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { ConventionGrammar } from '../../types/ConventionGrammar';

// Zod schema for form validation
const conventiongrammarSchema = z.object({
    domain: z.string().optional(),
  entityType: z.string().optional(),
  conventionCount: z.number().optional(),
});

type ConventionGrammarFormData = z.infer<typeof conventiongrammarSchema>;

interface ConventionGrammarFormProps {
  conventiongrammar?: ConventionGrammar;
  onSubmit: (data: ConventionGrammarFormData) => void;
  onValidate?: (data: ConventionGrammarFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * ConventionGrammarForm Component
 */
export function ConventionGrammarForm({ conventiongrammar, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: ConventionGrammarFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConventionGrammarFormData>({
    resolver: zodResolver(conventiongrammarSchema),
    defaultValues: conventiongrammar || {},
  });

  // Reset form when conventiongrammar changes
  useEffect(() => {
    if (conventiongrammar) {
      reset(conventiongrammar);
    } else {
      reset({});
    }
  }, [conventiongrammar, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="conventiongrammar-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="domain" className="block text-sm font-medium text-gray-300 mb-1">
            domain
          </label>
          <input
            id="domain"
            type="text"
            {...register('domain')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['domain']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter domain"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['domain'] && (
            <p className="mt-1 text-xs text-red-400">{errors['domain']?.message}</p>
          )}
        </div>

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
          <label htmlFor="conventionCount" className="block text-sm font-medium text-gray-300 mb-1">
            conventionCount
          </label>
          <input
            id="conventionCount"
            type="number"
            {...register('conventionCount')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['conventionCount']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter conventionCount"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['conventionCount'] && (
            <p className="mt-1 text-xs text-red-400">{errors['conventionCount']?.message}</p>
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
