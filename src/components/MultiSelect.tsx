import React, { useEffect, useRef } from "react";
import "../MultiSelect.css";

const optionsValues = [
    { label: "1 vai", value: "1" },
    { label: "2 vai", value: "2" },
    { label: "3 vai", value: "3" },
    { label: "4 vai111111111", value: "4" },
    { label: "5 vai", value: "5" },
    { label: "6 vaiaaaaaaaaaaaaaa", value: "6" },
    { label: "7 vai11111111111111111111", value: "7" },
    { label: "8 vai", value: "8" },
    { label: "9 vai", value: "9" },
    { label: "10 vai", value: "10" },
]

const MultiSelect: React.FC = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<Record<string, boolean>>(
        optionsValues.reduce((state, option) => ({ ...state, [option.value]: false }), {})
    );

    useEffect(() => {
      //função para fechar o dropdown quando clicar fora
      const handleClickOutside = (event: MouseEvent) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
          setDropdownOpen(false);
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
          document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    const count = Object.values(selected).filter(Boolean).length;
    const buttonLabel = count === 0 ?  '-- select --' : count + ' selected';

    return (
        <fieldset className="fieldset-state">
            <button ref={buttonRef} onClick={() => setDropdownOpen((prev) => !prev)}>
                {buttonLabel}
            </button>
            {dropdownOpen && (
                <div className="options-panel" onClick={(e) => 
                  //removendo o evento do pai
                  e.stopPropagation()
                }>
                    {optionsValues.map((object) => 
                        <fieldset key={object.value} className={selected[object.value] ? `selected`: ""} >
                            <input
                                type="checkbox"
                                checked={selected[object.value]}
                                onChange={(e) => setSelected({
                                    ...selected,
                                    [object.value]: e.target.checked
                                })}
                                id={`input-${object.value}`}
                            />

                            <label htmlFor={`input-${object.value}`} >
                                {object.label}
                            </label>
                        </fieldset>
                    )}
                </div>
            )}
        </fieldset>
        
    );
}

export default MultiSelect;