/**
 * SchemaFragmentForm
 * Form component for creating/editing SchemaFragment
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { SchemaFragment } from '../../types/SchemaFragment';

// Zod schema for form validation
const schemafragmentSchema = z.object({
    schemaId: z.string().optional(),
  description: z.string().optional(),
  defsCount: z.number().optional(),
  fragmentType: z.string().optional(),
});

type SchemaFragmentFormData = z.infer<typeof schemafragmentSchema>;

interface SchemaFragmentFormProps {
  schemafragment?: SchemaFragment;
  onSubmit: (data: SchemaFragmentFormData) => void;
  onValidate?: (data: SchemaFragmentFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * SchemaFragmentForm Component
 */
export function SchemaFragmentForm({ schemafragment, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: SchemaFragmentFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchemaFragmentFormData>({
    resolver: zodResolver(schemafragmentSchema),
    defaultValues: schemafragment || {},
  });

  // Reset form when schemafragment changes
  useEffect(() => {
    if (schemafragment) {
      reset(schemafragment);
    } else {
      reset({});
    }
  }, [schemafragment, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="schemafragment-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="schemaId" className="block text-sm font-medium text-gray-300 mb-1">
            schemaId
          </label>
          <input
            id="schemaId"
            type="text"
            {...register('schemaId')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['schemaId']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter schemaId"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['schemaId'] && (
            <p className="mt-1 text-xs text-red-400">{errors['schemaId']?.message}</p>
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
          <label htmlFor="defsCount" className="block text-sm font-medium text-gray-300 mb-1">
            defsCount
          </label>
          <input
            id="defsCount"
            type="number"
            {...register('defsCount')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['defsCount']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter defsCount"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['defsCount'] && (
            <p className="mt-1 text-xs text-red-400">{errors['defsCount']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="fragmentType" className="block text-sm font-medium text-gray-300 mb-1">
            fragmentType
          </label>
          <input
            id="fragmentType"
            type="text"
            {...register('fragmentType')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['fragmentType']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter fragmentType"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['fragmentType'] && (
            <p className="mt-1 text-xs text-red-400">{errors['fragmentType']?.message}</p>
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
