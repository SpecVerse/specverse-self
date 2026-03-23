/**
 * EntityModuleForm
 * Form component for creating/editing EntityModule
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import type { EntityModule } from '../../types/EntityModule';

// Zod schema for form validation
const entitymoduleSchema = z.object({
    name: z.string().optional(),
  moduleType: z.string().optional(),
  version: z.string().optional(),
  hasFacetSchema: z.boolean().optional(),
  hasFacetConventions: z.boolean().optional(),
  hasFacetInference: z.boolean().optional(),
  hasFacetBehaviour: z.boolean().optional(),
  hasFacetGenerators: z.boolean().optional(),
  hasFacetDiagrams: z.boolean().optional(),
  hasFacetDocs: z.boolean().optional(),
  hasFacetTests: z.boolean().optional(),
});

type EntityModuleFormData = z.infer<typeof entitymoduleSchema>;

interface EntityModuleFormProps {
  entitymodule?: EntityModule;
  onSubmit: (data: EntityModuleFormData) => void;
  onValidate?: (data: EntityModuleFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
  isValidating?: boolean;
}

/**
 * EntityModuleForm Component
 */
export function EntityModuleForm({ entitymodule, onSubmit, onValidate, onDelete, onCancel, isDeleting, isValidating }: EntityModuleFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EntityModuleFormData>({
    resolver: zodResolver(entitymoduleSchema),
    defaultValues: entitymodule || {},
  });

  // Reset form when entitymodule changes
  useEffect(() => {
    if (entitymodule) {
      reset(entitymodule);
    } else {
      reset({});
    }
  }, [entitymodule, reset]);

  const handleValidateClick = () => {
    if (onValidate) {
      const data = getValues();
      onValidate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entitymodule-form space-y-4" autoComplete="off" data-lpignore="true" data-form-type="other">
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
          <label htmlFor="moduleType" className="block text-sm font-medium text-gray-300 mb-1">
            moduleType
          </label>
          <input
            id="moduleType"
            type="text"
            {...register('moduleType')}
            className={`w-full px-3 py-2 rounded bg-slate-700 border transition-colors text-gray-200
              ${errors['moduleType']
                ? 'border-red-500 focus:border-red-400'
                : 'border-slate-600 focus:border-blue-500'
              } focus:outline-none focus:ring-0`}
            placeholder="Enter moduleType"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
          />
          {errors['moduleType'] && (
            <p className="mt-1 text-xs text-red-400">{errors['moduleType']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="version" className="block text-sm font-medium text-gray-300 mb-1">
            version
          </label>
          <input
            id="version"
            type="text"
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
          <label htmlFor="hasFacetSchema" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="hasFacetSchema"
              type="checkbox"
              {...register('hasFacetSchema')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            hasFacetSchema
          </label>
          {errors['hasFacetSchema'] && (
            <p className="mt-1 text-xs text-red-400">{errors['hasFacetSchema']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="hasFacetConventions" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="hasFacetConventions"
              type="checkbox"
              {...register('hasFacetConventions')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            hasFacetConventions
          </label>
          {errors['hasFacetConventions'] && (
            <p className="mt-1 text-xs text-red-400">{errors['hasFacetConventions']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="hasFacetInference" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="hasFacetInference"
              type="checkbox"
              {...register('hasFacetInference')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            hasFacetInference
          </label>
          {errors['hasFacetInference'] && (
            <p className="mt-1 text-xs text-red-400">{errors['hasFacetInference']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="hasFacetBehaviour" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="hasFacetBehaviour"
              type="checkbox"
              {...register('hasFacetBehaviour')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            hasFacetBehaviour
          </label>
          {errors['hasFacetBehaviour'] && (
            <p className="mt-1 text-xs text-red-400">{errors['hasFacetBehaviour']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="hasFacetGenerators" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="hasFacetGenerators"
              type="checkbox"
              {...register('hasFacetGenerators')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            hasFacetGenerators
          </label>
          {errors['hasFacetGenerators'] && (
            <p className="mt-1 text-xs text-red-400">{errors['hasFacetGenerators']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="hasFacetDiagrams" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="hasFacetDiagrams"
              type="checkbox"
              {...register('hasFacetDiagrams')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            hasFacetDiagrams
          </label>
          {errors['hasFacetDiagrams'] && (
            <p className="mt-1 text-xs text-red-400">{errors['hasFacetDiagrams']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="hasFacetDocs" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="hasFacetDocs"
              type="checkbox"
              {...register('hasFacetDocs')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            hasFacetDocs
          </label>
          {errors['hasFacetDocs'] && (
            <p className="mt-1 text-xs text-red-400">{errors['hasFacetDocs']?.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="hasFacetTests" className="flex items-center text-sm font-medium text-gray-300">
            <input
              id="hasFacetTests"
              type="checkbox"
              {...register('hasFacetTests')}
              className="mr-2"
              autoComplete="off"
              data-lpignore="true"
            />
            hasFacetTests
          </label>
          {errors['hasFacetTests'] && (
            <p className="mt-1 text-xs text-red-400">{errors['hasFacetTests']?.message}</p>
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
