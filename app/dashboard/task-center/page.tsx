"use client";

import React, { useState } from "react";
import { Icons } from "@/components/Icons";

interface Task {
  id: number;
  title: string;
  category: string;
  status: "todo" | "in-progress" | "completed";
  priority: "High" | "Medium" | "Low";
}

export default function TaskCenterPage() {
  const [tasks, setTasks] = useState<Task[]>(
    [
      { id: 1, title: "Conduct multi-segment market validation scan", category: "Market", status: "todo", priority: "High" },
      { id: 2, title: "Establish global UI layout design tokens inside globals.css", category: "Design", status: "in-progress", priority: "High" },
      { id: 3, title: "Set up collapsible sidebar navigation menus", category: "Dev", status: "completed", priority: "Medium" },
      { id: 4, title: "Generate product launch newsletter copy block", category: "Content", status: "todo", priority: "Medium" },
    ]
  );

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("Dev");
  const [newTaskPriority, setNewTaskPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      category: newTaskCategory,
      status: "todo",
      priority: newTaskPriority,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setIsAdding(false);
  };

  const handleMoveStatus = (id: number, currentStatus: "todo" | "in-progress" | "completed") => {
    let nextStatus: "todo" | "in-progress" | "completed" = "in-progress";
    if (currentStatus === "todo") nextStatus = "in-progress";
    else if (currentStatus === "in-progress") nextStatus = "completed";
    else if (currentStatus === "completed") nextStatus = "todo";

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t))
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const inProgressCount = tasks.filter((t) => t.status === "in-progress").length;
  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-borders/40 pb-4">
        <div>
          <span className="text-[10px] font-mono text-success-green uppercase tracking-widest block font-bold">SPRINT TRACKER</span>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">{"\"Execution hi startup ki asli superpower hai.\""}</h1>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-electric-blue hover:bg-blue-600 text-xs font-semibold rounded-lg text-white shadow-lg transition-all flex items-center gap-1.5"
        >
          <Icons.Plus size={14} />
          Create Task
        </button>
      </div>

      {/* Productivity Metric header card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-4 rounded-xl border border-borders flex justify-between items-center">
          <div>
            <span className="text-[9px] font-mono text-text-secondary block">COMPLETED TASKS</span>
            <span className="text-xl font-bold text-white mt-1 block">{completedCount} / {tasks.length}</span>
          </div>
          <span className="text-xs font-mono text-success-green">{progressPercent}% Ratio</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-borders flex justify-between items-center">
          <div>
            <span className="text-[9px] font-mono text-text-secondary block">IN PROGRESS RUNS</span>
            <span className="text-xl font-bold text-white mt-1 block">{inProgressCount} Active</span>
          </div>
          <span className="text-xs font-mono text-electric-blue">Optimal velocity</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-borders flex flex-col justify-between">
          <div className="flex justify-between text-[9px] font-mono text-text-secondary mb-1">
            <span>Overall Sprints Completion</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="bg-borders h-1.5 rounded-full overflow-hidden">
            <div className="bg-success-green h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Add Task Panel Form */}
      {isAdding && (
        <div className="glass-panel p-6 rounded-xl border border-electric-blue/30 bg-electric-blue/[0.01] animate-float relative">
          <h2 className="text-xs font-bold font-mono text-white mb-4 uppercase tracking-wider">Configure New Sprints Task</h2>
          <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6">
              <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1.5">Task Description</label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="E.g., Map landing page feature vectors..."
                className="w-full bg-zinc-900 border border-borders focus:border-electric-blue rounded-lg p-2.5 text-xs text-white focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1.5">Category</label>
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="w-full bg-zinc-900 border border-borders focus:border-electric-blue rounded-lg p-2.5 text-xs text-text-secondary focus:outline-none"
              >
                <option value="Dev">Dev / Code</option>
                <option value="Design">Design / UX</option>
                <option value="Market">Market Research</option>
                <option value="Content">Content Marketing</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1.5">Priority</label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as "High" | "Medium" | "Low")}
                className="w-full bg-zinc-900 border border-borders focus:border-electric-blue rounded-lg p-2.5 text-xs text-text-secondary focus:outline-none"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="md:col-span-12 flex justify-end gap-2 pt-2 border-t border-borders/40 mt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-borders hover:bg-white/5 text-xs font-semibold rounded-lg text-text-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-electric-blue hover:bg-blue-600 text-xs font-semibold rounded-lg text-white"
              >
                Insert Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="glass-panel py-20 px-6 rounded-xl border border-borders flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-borders flex items-center justify-center text-success-green mb-4">
            <Icons.Task size={24} />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">
            {"\"Mission clear hai. Ab execution shuru karo.\""}
          </h3>
          <p className="text-xs text-text-secondary max-w-sm mt-1 leading-relaxed">
            All sprints are finalized! Create a new tasks ticket above to continue orchestrating.
          </p>
        </div>
      )}

      {/* Kanban Board Grid */}
      {tasks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* TODO COLUMN */}
          <div className="glass-panel p-4 rounded-xl border border-borders bg-zinc-950/20">
            <div className="flex justify-between items-center pb-3 border-b border-borders mb-4">
              <span className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
                Backlog Tasks
              </span>
              <span className="text-[10px] font-mono text-text-secondary bg-white/5 px-2 py-0.5 rounded border border-borders">
                {todoCount}
              </span>
            </div>

            <div className="space-y-3">
              {tasks.filter((t) => t.status === "todo").map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl border border-borders bg-zinc-900/40 hover:border-white/10 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-mono text-text-secondary bg-white/5 border border-borders px-1.5 py-0.5 rounded">
                        {t.category}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold ${
                          t.priority === "High"
                            ? "text-warning-orange"
                            : t.priority === "Medium"
                            ? "text-electric-blue"
                            : "text-text-secondary"
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>
                    <p className="text-xs text-text-primary leading-relaxed font-semibold">
                      {t.title}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-borders/40 flex justify-between items-center">
                    <button
                      onClick={() => handleMoveStatus(t.id, "todo")}
                      className="text-[10px] font-mono text-electric-blue hover:underline"
                    >
                      Start Sprint →
                    </button>
                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-text-secondary hover:text-warning-orange transition-all"
                    >
                      <Icons.Trash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IN PROGRESS COLUMN */}
          <div className="glass-panel p-4 rounded-xl border border-borders bg-zinc-950/20">
            <div className="flex justify-between items-center pb-3 border-b border-borders mb-4">
              <span className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-blue glow-dot-blue animate-pulse" />
                Active Sprints
              </span>
              <span className="text-[10px] font-mono text-electric-blue bg-electric-blue/5 px-2 py-0.5 rounded border border-electric-blue/20">
                {inProgressCount}
              </span>
            </div>

            <div className="space-y-3">
              {tasks.filter((t) => t.status === "in-progress").map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl border border-electric-blue/25 bg-electric-blue/[0.01] hover:border-white/10 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-mono text-text-secondary bg-white/5 border border-borders px-1.5 py-0.5 rounded">
                        {t.category}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold ${
                          t.priority === "High"
                            ? "text-warning-orange"
                            : t.priority === "Medium"
                            ? "text-electric-blue"
                            : "text-text-secondary"
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>
                    <p className="text-xs text-text-primary leading-relaxed font-semibold">
                      {t.title}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-borders/40 flex justify-between items-center">
                    <button
                      onClick={() => handleMoveStatus(t.id, "in-progress")}
                      className="text-[10px] font-mono text-success-green hover:underline"
                    >
                      Complete Sprint ✓
                    </button>
                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-text-secondary hover:text-warning-orange transition-all"
                    >
                      <Icons.Trash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COMPLETED COLUMN */}
          <div className="glass-panel p-4 rounded-xl border border-borders bg-zinc-950/20">
            <div className="flex justify-between items-center pb-3 border-b border-borders mb-4">
              <span className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success-green glow-dot-green" />
                Done & Shipped
              </span>
              <span className="text-[10px] font-mono text-success-green bg-success-green/5 px-2 py-0.5 rounded border border-success-green/20">
                {completedCount}
              </span>
            </div>

            <div className="space-y-3">
              {tasks.filter((t) => t.status === "completed").map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl border border-borders bg-zinc-900/10 opacity-70 hover:opacity-100 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-mono text-text-secondary bg-white/5 border border-borders px-1.5 py-0.5 rounded">
                        {t.category}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold ${
                          t.priority === "High"
                            ? "text-warning-orange"
                            : t.priority === "Medium"
                            ? "text-electric-blue"
                            : "text-text-secondary"
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>
                    <p className="text-xs text-text-primary leading-relaxed font-semibold line-through">
                      {t.title}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-borders/40 flex justify-between items-center">
                    <button
                      onClick={() => handleMoveStatus(t.id, "completed")}
                      className="text-[10px] font-mono text-text-secondary hover:underline"
                    >
                      Restore to Backlog
                    </button>
                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-text-secondary hover:text-warning-orange transition-all"
                    >
                      <Icons.Trash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
