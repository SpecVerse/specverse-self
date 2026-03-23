/**
 * RuleTemplateForm
 * Form component for creating/editing RuleTemplate
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { RuleTemplate } from '../../types/RuleTemplate';

// Zod schema for form validation
const ruletemplateSchema = z.object({
    templateType: z.string().optional(),
  content: z.string().optional(),
});

type RuleTemplateFormData = z.infer<typeof ruletemplateSchema>;

interface RuleTemplateFormProps {
  ruletemplate?: RuleTemplate;
  onSubmit: (data: RuleTemplateFormData) => void;
  onValidate?: (data: RuleTemplateFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * RuleTemplateForm Component
 */
export function RuleTemplateForm({ ruletemplate, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: RuleTemplateFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RuleTemplateFormData>({
    resolver: zodResolver(ruletemplateSchema),
    defaultValues: ruletemplate || {},
  });

  // Reset form when ruletemplate changes
  useEffect(() => {
    if (ruletemplate) {
      reset(ruletemplate);
    } else {
      reset({});
    }
  }, [ruletemplate, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ruletemplate-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="templateType" className="block text-sm font-medium text-gray-300 mb-1">
            templateType
          </label>
          <input
            id="templateType"
            type="text"
            {...register('templateType')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['templateType']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter templateType"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['templateType'] && (
            <p className="mt-1 text-xs text-red-400">{errors['templateType']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
            content
          </label>
          <input
            id="content"
            type="text"
            {...register('content')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['content']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter content"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['content'] && (
            <p className="mt-1 text-xs text-red-400">{errors['content']?.message}</p>
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
