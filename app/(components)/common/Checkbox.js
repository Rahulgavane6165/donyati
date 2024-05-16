import { CheckIcon } from "@heroicons/react/solid";

const Checkbox = ({ id, checked, onChange, label }) => {
  return (
    <div className="flex justify-center items-center w-full mb-3">
      <label htmlFor={id} className="checkbox-label flex items-center w-48">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="hidden custom-checkbox"
        />

        <label
          htmlFor={id}
          className="flex items-center justify-center cursor-pointer select-none"
        >
          <div className="w-5 h-5 border-2 border-lime-500 rounded-sm flex justify-center items-center">
            {checked && <CheckIcon className="w-5 h-5 text-lime-500" />}
          </div>
        </label>

        <span className="checkbox-text flex-1 ml-3 px-3 py-1 rounded-2 text-sm font-bold bg-gradient-to-b from-violet-400 to-violet-600 text-white text-center">
          {label}
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
