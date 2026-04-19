import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-charcoal font-sans"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`w-full rounded-lg border bg-white px-4 py-3 text-base text-charcoal placeholder:text-charcoal-light/60 transition-colors font-sans resize-y
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-sage/30 focus:border-sage focus:ring-sage/20'}
            focus:outline-none focus:ring-2
            ${className}`}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-charcoal-light font-sans">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-red-500 font-sans">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
