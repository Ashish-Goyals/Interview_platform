import React from 'react';
import Navbar from '../components/Navbar';
import {PROBLEMS} from '../data/problems';
import {Link} from 'react-router';
import {Code2Icon, ChevronRightIcon} from 'lucide-react';
import {getDifficultyBadgeClass} from '../lib/utils';
const ProblemsPage = () => {
  const problems = Object.values (PROBLEMS);
  const easyProblems = problems.filter (
    problem => problem.difficulty === 'Easy'
  ).length;
  const mediumProblems = problems.filter (
    problem => problem.difficulty === 'Medium'
  ).length;
  const hardProblems = problems.filter (
    problem => problem.difficulty === 'Hard'
  ).length;
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      {/* Header  */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 ">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-base-content/70">
            Sharpen Your coding skils with these curated problems
          </p>
        </div>

        {/* PROBLEMS LISt  */}
        <div className="space-y-4">
          {problems.map (problem => (
            <Link
              to={`/problems/${problem.id}`}
              key={problem.id}
              className="card bg-base-100 hover:scale-[1.01] transition-transform"
            >
              <div className="card-body">
                <div className="flex items-center justify-between gap-4">
                  {/* LEFT SIDE  */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">

                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center ">
                        <Code2Icon className="size-6  text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex itmes-center gap-2 mb-1">
                          <h2 className="text-xl font-bold">
                            {problem.title}
                          </h2>
                          <span
                            className={`badge ${getDifficultyBadgeClass (problem.difficulty)}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-base-content/60">
                          {problem.category}
                        </p>
                      </div>
                    </div>
                    <p className="text-base-content/80 mb-3 ">
                      {problem.description.text}
                    </p>
                  </div>
                  {/* RIGHT SIDE  */}
                  <div className="flex items-center gap-2 text-primary ">
                    <span className="font-medium">Solve</span>
                    <ChevronRightIcon className="size-5 " />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* STATS FOOTER  */}
        <div className="mt-12 card bg-base-100 shadow-lg">

          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-primary">{problems.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Easy</div>
                <div className="stat-value text-success">{easyProblems}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Medium</div>
                <div className="stat-value text-warning">{mediumProblems}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Hard</div>
                <div className="stat-value text-error">{hardProblems}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsPage;
