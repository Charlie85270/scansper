import React, { FC, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { Validator } from "../DelegateForm/DelegateForm";
import { truncateString } from "../../../utils/Utils";

interface ValidatorSelectorProps {
  validators: Validator[];
  onValidatorChange: (validator: Validator) => void;
  selectedValidator?: Validator;
}

const ValidatorSelector: FC<ValidatorSelectorProps> = ({
  validators,
  selectedValidator,
  onValidatorChange,
}) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [open, setIsOpen] = useState(false);
  useClickOutside(listRef, () => setIsOpen(false));
  return (
    <div className="w-full">
      <div className="relative">
        <div className="relative my-4" ref={listRef}>
          <span className="block py-2 text-primary">Select a validator</span>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative w-full py-3 pl-3 pr-10 text-left border rounded-md cursor-default dark:border-gray-900 background-card focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <span className="flex items-center justify-between">
              {selectedValidator?.publicKey ? (
                <>
                  <div className="flex items-center">
                    <img
                      src={selectedValidator.img}
                      alt={selectedValidator.name}
                      className="flex-shrink-0 w-6 h-6 rounded-full"
                    />
                    <span className="hidden block ml-3 font-normal truncate lg:block">
                      {truncateString(
                        selectedValidator.name ||
                          selectedValidator.publicKey ||
                          "",
                        30
                      )}
                    </span>
                    <span className="block ml-3 font-normal truncate lg:hidden">
                      {truncateString(
                        selectedValidator.name ||
                          selectedValidator.publicKey ||
                          "",
                        15
                      )}
                    </span>
                  </div>
                  <p>
                    <span className="text-xs text-secondary">Fees :</span>{" "}
                    {selectedValidator.fee}%
                  </p>
                </>
              ) : (
                <p className="text-secondary">Select a validator</p>
              )}
            </span>

            <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
          {open && (
            <div className="absolute z-10 w-full mt-1 rounded-md shadow-lg background-card">
              <ul
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-item-3"
                className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {validators.map((val, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        onValidatorChange(val);
                        setIsOpen(false);
                      }}
                      role="option"
                      className="relative py-2 pl-3 cursor-pointer select-none text-primary hover:background-app pr-9"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <img
                            src={val.img}
                            alt={val.name}
                            className="flex-shrink-0 w-6 h-6 rounded-full"
                          />
                          <span className="hidden block ml-3 font-normal truncate lg:block">
                            {truncateString(
                              val.name || val.publicKey || "",
                              30
                            )}
                          </span>
                          <span className="block ml-3 font-normal truncate lg:hidden">
                            {truncateString(
                              val.name || val.publicKey || "",
                              15
                            )}
                          </span>
                        </div>
                        <p>
                          <span className="text-xs text-secondary">Fees :</span>{" "}
                          {val.fee}%
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidatorSelector;
