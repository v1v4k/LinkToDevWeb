import PropTypes from "prop-types";
import { useState } from "react";

const MAX_SKILLS = 5;

const SkillsInput = ({ skills, onChange }) => {
  const [input, setInput] = useState("");

  const addSkill = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (skills.length >= MAX_SKILLS) return;
      if (!skills.includes(input.trim())) {
        onChange([...skills, input.trim()]);
      }
      setInput("");
    }
  };

  const removeSkill = (skill) =>
    onChange(skills.filter((s) => s !== skill));

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap gap-2 p-2 min-h-[42px]
        bg-base-300 border border-base-content/20 rounded-xl
        focus-within:border-primary transition-colors">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 bg-primary/15 text-primary
              text-xs font-semibold px-2.5 py-1 rounded-full"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="hover:text-error transition-colors font-bold"
            >
              ×
            </button>
          </span>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addSkill}
          placeholder={skills.length === 0 ? "Add skills... press Enter" : ""}
          className="bg-transparent outline-none text-sm flex-1
            min-w-[120px] text-base-content placeholder:text-base-content/30"
        />
      </div>
      <span className="text-[11px] text-base-content/40 text-right">
        {skills.length}/{MAX_SKILLS}
      </span>

    </div>
  );
};

SkillsInput.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SkillsInput;