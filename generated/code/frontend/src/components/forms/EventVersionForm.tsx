/**
 * EventVersionForm
 * Form component for creating/editing EventVersion
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { EventVersion } from '../../types/EventVersion';

// Zod schema for form validation
const eventversionSchema = z.object({
    version: z.number().optional(),
  compatibility: z.string().optional(),
  deprecated: z.boolean().optional(),
  deprecationMessage: z.string().optional(),
});

type EventVersionFormData = z.infer<typeof eventversionSchema>;

interface EventVersionFormProps {
  eventversion?: EventVersion;
  onSubmit: (data: EventVersionFormData) => void;
  onValidate?: (data: EventVersionFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * EventVersionForm Component
 */
export function EventVersionForm({ eventversion, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: EventVersionFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventVersionFormData>({
    resolver: zodResolver(eventversionSchema),
    defaultValues: eventversion || {},
  });

  // Reset form when eventversion changes
  useEffect(() => {
    if (eventversion) {
      reset(eventversion);
    } else {
      reset({});
    }
  }, [eventversion, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="eventversion-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
      {/* Hidden fake fields to trick password managers */}
      <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <label htmlFor="version" className="block text-sm font-medium text-gray-300 mb-1">
            version
          </label>
          <input
            id="version"
            type="number"
            {...register('version')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['version']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter version"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['version'] && (
            <p className="mt-1 text-xs text-red-400">{errors['version']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="compatibility" className="block text-sm font-medium text-gray-300 mb-1">
            compatibility
          </label>
          <input
            id="compatibility"
            type="text"
            {...register('compatibility')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['compatibility']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter compatibility"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['compatibility'] && (
            <p className="mt-1 text-xs text-red-400">{errors['compatibility']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="deprecated" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="deprecated"
              type="checkbox"
              {...register('deprecated')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            deprecated
          </label>
          {errors['deprecated'] && (
            <p className="mt-1 text-xs text-red-400">{errors['deprecated']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="deprecationMessage" className="block text-sm font-medium text-gray-300 mb-1">
            deprecationMessage
          </label>
          <input
            id="deprecationMessage"
            type="text"
            {...register('deprecationMessage')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['deprecationMessage']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter deprecationMessage"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['deprecationMessage'] && (
            <p className="mt-1 text-xs text-red-400">{errors['deprecationMessage']?.message}</p>
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
