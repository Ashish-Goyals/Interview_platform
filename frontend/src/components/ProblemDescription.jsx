import React from 'react';

const ProblemDescription = ({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) => {
  return (
    <div className="h-full overflow-y-auto bg-base-200">
      {/* Header Section  */}
      <div className="p-6 border-b border-base-300">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-3xl font-bold text-base-content">
            {problem.title}
          </h1>

          <span
            className={`badge ${problem.difficulty === 'Easy' ? 'badge-success' : problem.difficulty === 'Medium' ? 'badge-warning' : 'badge-error'}`}
          >
            {problem.difficulty}
          </span>
        </div>
        <p className="text-base-content/60">{problem.category}</p>

        {/* Problem Selector  */}

        <div className="mt-4">
          <select
            className="select select-sm w-full "
            value={currentProblemId}
            onChange={e => onProblemChange (e.target.value)}
          >
            {allProblems.map (p => (
              <option key={p.id} value={p.id}>
                {p.title} - {p.difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 space-y-6 ">
        {/* Problem Description  */}

        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold text-base-content">Description</h2>
          <div className="space-y-3 text-base leading-relaxed">
            <p className="text-base-content/90">{problem.description.text}</p>
            {problem.description.notes.map ((note, idx) => (
              <p key={idx} className="text-base-content/90">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* Example  Sections */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
          <div className="space-y-4">
            {problem.examples.map ((example, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-sm">{idx + 1}</span>
                  <p className="font-semibold text-base-content">
                    Example {idx + 1}
                  </p>
                </div>
                <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                  <div className="flex gap-2">
                    <span className="text-primary font-bold min-w-[70px]">
                      Input:
                    </span>
                    <span>{example.input}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-secondary font-bold min-w-[70px]">
                      Output:
                    </span>
                    <span>{example.output}</span>
                  </div>
                  {example.explanation &&
                    <div className="pt-2 border-t border-base-300 mt-2">
                      <span className="text-base-content/60 font-sans text-xs">
                        <span className="font-semibold">Explanation:</span>
                        {' '}
                        {example.explanation}
                      </span>
                    </div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Constraints  */}

        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">
            Constraints
          </h2>
          <ul className="space-y-2 text-base-content/90">
            {problem.constraints.map ((constraint, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-primary">•</span>
                <code className="text-sm">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
