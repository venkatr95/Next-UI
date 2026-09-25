"use client";

import * as React from "react";
import { createContext, useContext } from "react";
import { cn, type BaseComponentProps } from "@next-ui/utils";

export type ValidationBehavior = "native" | "aria";

export interface FormContextValue {
  validationBehavior: ValidationBehavior;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
}

const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
  return useContext(FormContext);
}

export interface FormProps extends BaseComponentProps<HTMLFormElement> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  validationBehavior?: ValidationBehavior;
  children: React.ReactNode;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      onSubmit,
      validationBehavior = "aria",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const ctx: FormContextValue = {
      validationBehavior,
    };

    return (
      <FormContext.Provider value={ctx}>
        <form
          ref={ref}
          onSubmit={onSubmit}
          noValidate={validationBehavior === "aria"}
          className={cn("space-y-4", className)}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = "Form";

export interface FormControlProps extends BaseComponentProps<HTMLDivElement> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorMessage?: React.ReactNode;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      isRequired = false,
      isInvalid = false,
      isDisabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const formCtx = useFormContext();
    const id = React.useId();
    const errorId = `${id}-error`;
    const descriptionId = `${id}-description`;

    return (
      <div ref={ref} className={cn("w-full space-y-1", className)} {...props}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "block text-sm font-medium text-gray-700 dark:text-gray-300",
              isRequired && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </label>
        )}
        {React.isValidElement(children) &&
          React.cloneElement(children as React.ReactElement<{ id?: string; disabled?: boolean; "aria-invalid"?: boolean; "aria-required"?: boolean; "aria-describedby"?: string }>, {
            id,
            disabled: isDisabled || (children as React.ReactElement & { props: { disabled?: boolean } }).props?.disabled,
            "aria-invalid": isInvalid,
            "aria-required": isRequired,
            "aria-describedby": [isInvalid && errorMessage && errorId, helperText && descriptionId]
              .filter(Boolean)
              .join(" ") || undefined,
          })}
        {helperText && !isInvalid && (
          <p id={descriptionId} className="text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
        {errorMessage && isInvalid && (
          <p id={errorId} className="text-sm text-red-600 dark:text-red-400" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

FormControl.displayName = "FormControl";
