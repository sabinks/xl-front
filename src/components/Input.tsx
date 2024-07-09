
import React from "react";
import { classNames } from "@/utils";

interface InputProps {
    label?: string;
    labelClassName?: string;
    name: string;
    type: string;
    placeholder?: string;
    className?: string;
    value?: string | number;
    onChange?: any;
    multiple?: boolean;
    error?: string[] | string | undefined | any;
    disabled?: boolean;
}
const Input = ({
    label,
    labelClassName = "",
    name,
    type,
    placeholder,
    className = "",
    value,
    onChange,
    multiple = false,
    error,
    disabled = false,
    ...rest
}: InputProps) => {
    return (
        <div className="flex flex-col">
            {
                label && (
                    <label
                        className={classNames(
                            "block text-sm font-semibold text-gray-700 pb-1",
                            labelClassName
                        )}
                    >
                        {label}
                    </label>
                )
            }
            {
                type == 'textarea' && <div>
                    <textarea
                        {...rest}
                        onChange={onChange}
                        rows={7}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        className={classNames(className,
                            "appearance-none block w-2/3 px-3 py-2 border border-primary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primaryGreen focus:border-primaryGreen sm:text-sm")}
                    ></textarea>
                    <div className="py-1">
                        {error && <p className="text-red-500 text-xs ">{error}
                        </p>}
                    </div>
                </div>
            }
            {
                type == 'file' &&
                <div className="">
                    <input
                        {...rest}
                        type="file"
                        onChange={onChange}
                        name={name}
                        value={value}
                        multiple={multiple}
                        placeholder={placeholder}
                        autoComplete="off"
                        className={classNames(className,
                            "appearance-none w-full px-3 py-2 border border-primary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primaryGreen focus:border-primaryGreen sm:text-sm")}
                    />
                    <div className="py-1">
                        {error && <p className="text-red-500 text-xs ">{error}
                        </p>}
                    </div>
                </div>
            }
            {
                ["text", "email", "password", "phone"].includes(type) &&
                <div>
                    <input
                        {...rest}
                        type={type}
                        onChange={onChange}
                        name={name}
                        value={value}
                        id={name + "-unique"}
                        // defaultValue={""}
                        placeholder={placeholder}
                        autoComplete="off"
                        disabled={disabled}

                        className={classNames(className,
                            "appearance-none w-full px-3 py-2 border border-primary rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm")}
                    />
                    <div className="">
                        {error && <p className="text-red-500 text-xs  my-1 px-1 ">{error}
                        </p>}
                    </div>
                </div>
            }
        </div>
    );
};

export default Input;
