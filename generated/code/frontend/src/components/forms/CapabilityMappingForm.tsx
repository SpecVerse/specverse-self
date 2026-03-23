/**
 * CapabilityMappingForm
 * Form component for creating/editing CapabilityMapping
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { CapabilityMapping } from '../../types/CapabilityMapping';

// Zod schema for form validation
const capabilitymappingSchema = z.object({
    capability: z.string().optional(),
  factoryName: z.string().optional(),
});

type CapabilityMappingFormData = z.infer<typeof capabilitymappingSchema>;

interface CapabilityMappingFormProps {
  capabilitymapping?: CapabilityMapping;
  onSubmit: (data: CapabilityMappingFormData) => void;
  onValidate?: (data: CapabilityMappingFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * CapabilityMappingForm Component
 */
export function CapabilityMappingForm({ capabilitymapping, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: CapabilityMappingFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CapabilityMappingFormData>({
    resolver: zodResolver(capabilitymappingSchema),
    defaultValues: capabilitymapping || {},
  });

  // Reset form when capabilitymapping changes
  useEffect(() => {
    if (capabilitymapping) {
      reset(capabilitymapping);
    } else {
      reset({});
    }
  }, [capabilitymapping, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="capabilitymapping-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="capability" className="block text-sm font-medium text-gray-300 mb-1">
            capability
          </label>
          <input
            id="capability"
            type="text"
            {...register('capability')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['capability']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter capability"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['capability'] && (
            <p className="mt-1 text-xs text-red-400">{errors['capability']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="factoryName" className="block text-sm font-medium text-gray-300 mb-1">
            factoryName
          </label>
          <input
            id="factoryName"
            type="text"
            {...register('factoryName')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['factoryName']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter factoryName"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['factoryName'] && (
            <p className="mt-1 text-xs text-red-400">{errors['factoryName']?.message}</p>
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
