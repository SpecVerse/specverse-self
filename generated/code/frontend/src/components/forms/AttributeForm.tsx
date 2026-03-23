/**
 * AttributeForm
 * Form component for creating/editing Attribute
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { Attribute } from '../../types/Attribute';

// Zod schema for form validation
const attributeSchema = z.object({
    name: z.string().optional(),
  attrType: z.string().optional(),
  required: z.boolean().optional(),
  unique: z.boolean().optional(),
  searchable: z.boolean().optional(),
  verified: z.boolean().optional(),
  defaultValue: z.string().optional(),
  auto: z.string().optional(),
});

type AttributeFormData = z.infer<typeof attributeSchema>;

interface AttributeFormProps {
  attribute?: Attribute;
  onSubmit: (data: AttributeFormData) => void;
  onValidate?: (data: AttributeFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * AttributeForm Component
 */
export function AttributeForm({ attribute, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: AttributeFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AttributeFormData>({
    resolver: zodResolver(attributeSchema),
    defaultValues: attribute || {},
  });

  // Reset form when attribute changes
  useEffect(() => {
    if (attribute) {
      reset(attribute);
    } else {
      reset({});
    }
  }, [attribute, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="attribute-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
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
          <label htmlFor="attrType" className="block text-sm font-medium text-gray-300 mb-1">
            attrType
          </label>
          <input
            id="attrType"
            type="text"
            {...register('attrType')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['attrType']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter attrType"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['attrType'] && (
            <p className="mt-1 text-xs text-red-400">{errors['attrType']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="required" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="required"
              type="checkbox"
              {...register('required')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            required
          </label>
          {errors['required'] && (
            <p className="mt-1 text-xs text-red-400">{errors['required']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="unique" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="unique"
              type="checkbox"
              {...register('unique')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            unique
          </label>
          {errors['unique'] && (
            <p className="mt-1 text-xs text-red-400">{errors['unique']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="searchable" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="searchable"
              type="checkbox"
              {...register('searchable')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            searchable
          </label>
          {errors['searchable'] && (
            <p className="mt-1 text-xs text-red-400">{errors['searchable']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="verified" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="verified"
              type="checkbox"
              {...register('verified')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            verified
          </label>
          {errors['verified'] && (
            <p className="mt-1 text-xs text-red-400">{errors['verified']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="defaultValue" className="block text-sm font-medium text-gray-300 mb-1">
            defaultValue
          </label>
          <input
            id="defaultValue"
            type="text"
            {...register('defaultValue')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['defaultValue']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter defaultValue"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['defaultValue'] && (
            <p className="mt-1 text-xs text-red-400">{errors['defaultValue']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="auto" className="block text-sm font-medium text-gray-300 mb-1">
            auto
          </label>
          <input
            id="auto"
            type="text"
            {...register('auto')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['auto']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter auto"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['auto'] && (
            <p className="mt-1 text-xs text-red-400">{errors['auto']?.message}</p>
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
