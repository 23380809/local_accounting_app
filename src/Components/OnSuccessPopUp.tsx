import React, { useEffect } from "react";
import { Transition } from "@headlessui/react";

function OnSuccessPopUp(props: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.onClose();
    }, 1500);
    return () => clearTimeout(timer);
  }, [props.show]);
  return (
    <Transition
      show={props.show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
        <div className="fixed ml-24 top-6 left-0 right-0 z-50 flex justify-center">
            <div className="grid text-2xl justify-center shadow-lg bg-slate-200 rounded-lg p-2">
              <div className="flex justify-center">
                  {props.status === true ? (
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      >
                      <path
                          fillRule="evenodd"
                          d="M16.707 4.293a1 1 0 00-1.414 0L7 12.586 4.707 10.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l10-10a1 1 0 000-1.414z"
                          clipRule="evenodd"
                      />
                      </svg>
                  ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-8 w-8">
                      <path stroke="red" strokeWidth="2" strokeLinecap="round" d="M5 5 l10 10" />
                      <path stroke="red" strokeWidth="2" strokeLinecap="round" d="M15 5 l-10 10" />
                      </svg>
                  )}
                <div>{props.message}</div>
                </div>
              <div>
                {props.errorMessages && props.errorMessages.map((message: string, index: number) => (
                    <div key={index} className="text-sm">{message}</div>
                ))}                  
            </div>
            </div>

        </div>
        
    </Transition>
  );
}

export default OnSuccessPopUp;

