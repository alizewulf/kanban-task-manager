import { useEffect, useState } from "react";
import removeTask from "../../../assets/X-icon.svg";
import Modal from "../../common/Modal";
import LightBtn from "../../common/Button";
import BaseInput, { baseInputClass, baseLabelClass } from "../../common/Input";

function AddTask({
  setIsOpen,
  onCreateTask,
  theme,
  columns,
  activeColumnId,
  boardId,
  taskToEdit,
  setTaskToEdit,
  onUpdateTask,
}) {
  const safeColumns = columns || [];
  const isDark = theme === "dark";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedColumn, setSelectedColumn] = useState(
    activeColumnId || safeColumns[0]?.id || "",
  );

  const [subtasks, setSubtasks] = useState([
    { id: 1, value: "", isCompleted: false },
    { id: 2, value: "", isCompleted: false },
  ]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!selectedColumn && safeColumns.length > 0) {
      setSelectedColumn(safeColumns[0].id);
    }
  }, [safeColumns]);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setSelectedColumn(
        taskToEdit.columnId ||
          taskToEdit.column ||
          activeColumnId ||
          safeColumns[0]?.id ||
          "",
      );
      setSubtasks(
        (taskToEdit.subtasks || []).map((st) => ({
          id: st.id,
          value: st.value || "",
          isCompleted: !!st.isCompleted,
        })),
      );
    }
  }, [taskToEdit]);

  function addSubtask() {
    setSubtasks((prev) => [
      ...prev,
      { id: Date.now(), value: "", isCompleted: false },
    ]);
  }

  function updateSubtask(id, value) {
    setSubtasks((prev) =>
      prev.map((st) => (st.id === id ? { ...st, value } : st)),
    );
  }

  function removeSubtask(id) {
    setSubtasks((prev) => prev.filter((st) => st.id !== id));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }

  function handleCreate() {
    const err = {};

    if (!title.trim()) {
      err.title = "can't be empty";
    }

    if (!description.trim()) {
      err.description = "can't be empty";
    }

    const invalid = subtasks.filter((st) => !st.value || !st.value.trim());
    if (invalid.length) {
      invalid.forEach((s) => (err[s.id] = "can't be empty"));
    }

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    const cleanSubtasks = subtasks.map((st) => ({
      id: st.id,
      value: st.value,
      isCompleted: !!st.isCompleted,
    }));

    if (taskToEdit) {
      const updated = {
        ...taskToEdit,
        title,
        description,
        subtasks: cleanSubtasks,
      };
      if (onUpdateTask) onUpdateTask(selectedColumn, taskToEdit.id, updated);
      if (setTaskToEdit) setTaskToEdit(null);
    } else {
      const task = {
        id: crypto.randomUUID(),
        title,
        description,
        subtasks: cleanSubtasks,
      };

      onCreateTask(selectedColumn, task);
    }

    setTitle("");
    setDescription("");
    setSubtasks([
      { id: 1, value: "", isCompleted: false },
      { id: 2, value: "", isCompleted: false },
    ]);
    setErrors({});
    setIsOpen(false);
  }

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      className={`${isDark ? "bg-[#2B2C37]" : "bg-white"} px-8 sm:py-6 flex flex-col gap-4 py-2 sm:gap-6 rounded-xl w-87.5 sm:w-100`}
    >
      <h2
        className={`${isDark ? "text-white" : "text-black"} font-bold text-lg`}
      >
        {taskToEdit ? "Edit Task" : "Add New Task"}
      </h2>

      <div className="flex flex-col gap-2">
        <BaseInput
          title="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value && e.target.value.trim()) {
              setErrors((prev) => {
                const c = { ...prev };
                delete c.title;
                return c;
              });
            }
          }}
          labelClass={`${isDark ? "text-white" : ""}`}
          inputClass={`${isDark ? "text-white placeholder:text-[#828FA3]" : ""}`}
          placeholder="e.g. Take coffee break"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className={`text-[12px] font-bold ${isDark ? "text-white" : "text-[#828FA3]"} capitalize`}
        >
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (e.target.value && e.target.value.trim()) {
              setErrors((prev) => {
                const c = { ...prev };
                delete c.description;
                return c;
              });
            }
          }}
          placeholder="e.g. Short break"
          className={`${isDark ? "text-white placeholder:text-[#828FA3]" : ""} h-24 px-3 pt-2 outline-0 rounded-sm border-[#828FA3]/25 border-2 text-[13px] resize-none`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className={`${baseLabelClass} flex flex-col gap-3 ${isDark ? "text-white" : ""}`}
        >
          Subtasks
          {subtasks.map((st) => (
            <div key={st.id} className="relative flex items-center gap-2">
              <input
                value={st.value}
                onChange={(e) => {
                  updateSubtask(st.id, e.target.value);
                  if (e.target.value && e.target.value.trim()) {
                    setErrors((prev) => {
                      const c = { ...prev };
                      delete c[st.id];
                      return c;
                    });
                  }
                }}
                placeholder="e.g. Make Coffee"
                className={`${baseInputClass} ${isDark ? "text-white" : ""} ${errors[st.id] ? "border-[#EA5555]" : ""} w-[300px]`}
              />

              <button
                type="button"
                onClick={() => removeSubtask(st.id)}
                className="flex h-10 w-10 items-center justify-center rounded-xl cursor-pointer duration-300 hover:bg-[#EA5555]/20"
              >
                <img src={removeTask} alt="remove" className="w-4 h-4" />
              </button>

              {errors[st.id] && (
                <span className="absolute right-15 top-1/2 -translate-y-1/2 text-xs text-[#EA5555]">
                  {errors[st.id]}
                </span>
              )}
            </div>
          ))}
        </label>

        <LightBtn
          variant="secondary"
          onClick={addSubtask}
          customClass={`${isDark ? "bg-white" : ""}`}
        >
          + add subtask
        </LightBtn>
      </div>

      <div className="flex flex-col gap-2">
        <span
          className={`text-xs font-bold ${isDark ? "text-white" : "text-[#828FA3]"}`}
        >
          Status
        </span>

        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className={`flex text-[13px]/[23] flex-1 ${isDark ? "text-white" : "text-[#828FA3]"} border-[#828FA3]/25 border-2 py-2 px-4 rounded-sm outline-0`}
        >
          {safeColumns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </select>
      </div>

      <LightBtn variant="primary" onClick={handleCreate}>
        {taskToEdit ? "Save Changes" : "Create Task"}
      </LightBtn>
    </Modal>
  );
}

export default AddTask;
