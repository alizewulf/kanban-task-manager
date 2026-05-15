import Column from "./Column"

function Board({ columns }) {
    
  return (
    <div className="flex flex-1 gap-4 items-start p-6">
      {columns.map(col => (
        <Column key={col.id} column={col} />
      ))}
    </div>
  )
}

export default Board
