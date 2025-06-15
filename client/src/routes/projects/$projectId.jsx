import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { fetchTasks } from '../../queries/fetch-tasks-by-projectid'
import GroupedTasks from '../../components/GroupedTask'

export const Route = createFileRoute('/projects/$projectId')({
    loader: async ({params}) => {

      const data = await fetchTasks(params.projectId);
      
      if (isEmpty(data) ) {
        throw notFound();
      }
      return data;
    },
    
    component: Tasks,
    notFoundComponent: () => <div>Tasks not found</div>
})

function Tasks() {
  const data = Route.useLoaderData();
  
  return (
    <div>
      <GroupedTasks tasks={data} />
    </div>
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