import Column from "./Column"

function Board({ columns, onOpenAddTask }) {
  return (
    <div className="flex gap-4 items-start p-6">
      {columns.map(col => (
        <Column
          key={col.id}
          column={col}
          onOpenAddTask={onOpenAddTask}
        />
      ))}
    </div>
  )
}

export default Board