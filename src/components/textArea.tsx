import { HTMLInputTypeAttribute } from "react";
import { camalize, classNames } from "@/utils";

type InputProps = {
    label?: string;
    rows?: number;
    cols?: number;
    textAreaClassName?: string;
    labelClassName?: string;
    required?: boolean;
    error?: string[] | string | undefined | any;
    [key: string]: any;
    placeholder?: string;
};

export default function TextArea({
    label = "",
    name,
    rows,
    cols,
    textAreaClassName = "",
    labelClassName = "",
    required = false,
    error,
    placeholder = "",
    ...rest
}: InputProps) {
    const labelId = camalize(label);
    const errorClass = error
        ? "border-primary"
        : "";
    return (
        <div className="space-y-1 my-2">
            {label && (
                <label
                    htmlFor={labelId}
                    className={classNames(
                        "block text-sm font-semibold text-gray-700",
                        labelClassName
                    )}
                >
                    {label}
                </label>
            )}
            <div className="mt-1">
                <textarea
                    id={labelId}
                    rows={rows}
                    cols={cols}
                    name={name}
                    className={classNames(
                        "appearance-none block w-full px-3 py-2 border border-primary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm",
                        textAreaClassName,
                        errorClass
                    )}
                    {...rest}
                    placeholder={placeholder}
                />

                <div className="text-red-500 text-xs my-1 px-1">{error}</div>
            </div>
        </div>
    );
}
