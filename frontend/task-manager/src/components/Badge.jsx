

export default function TaskCard({ task }) {
  // Mapping priority metadata strings to component color variants
  const getPriorityVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'primary';
      default: return 'default';
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{task.title}</h3>
        
        {/* Renders a specific color variant dynamically */}
        <Badge variant={getPriorityVariant(task.priority)}>
          {task.priority}
        </Badge>
      </div>
      <p className="text-sm text-gray-500 mt-2">{task.description}</p>
    </div>
  );
}

