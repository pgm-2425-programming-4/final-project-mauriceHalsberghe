import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { fetchTasks } from '../../queries/fetch-tasks-by-projectid'

export const Route = createFileRoute('/projects/$projectId')({
    loader: async ({params}) => {

      const data = await fetchTasks(params.projectId);
      
      
      if (isEmpty(data) ) {
        throw notFound();
      }
      return data;
    },
    
    component: Tasks,
    notFoundComponent: () => <div>Student not found</div>
})

function Tasks() {

  const data = Route.useLoaderData();
  
  return (
    <ul>
      {data.map((task) =>
        <li key={task.id}>
          {task.title}
        </li>
      )}
    </ul>
  )
}

function isEmpty(obj) {
  for ( const prop in obj) {
    if( Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true
}