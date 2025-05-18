import { useQuery } from '@tanstack/react-query';
import { getTasks } from './queries/getTasks.jsx';
import { useState } from 'react';
import { Pagination } from './Pagination.jsx';

export function Tasks() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['tasks', currentPage, pageSize],
        queryFn: () => getTasks({ page: currentPage, pageSize }),
    });

    if (isPending) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    const tasks = data.data.filter(task => task.task_status.id === 11);
    const pageCount = data.meta.pagination.pageCount;
    
  return (
    <>
      <ul className='backlog'>
        {tasks.map(task => (
          <li key={task.id}>
            <h2>{task.title}</h2>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChanged={(size) => {
          setPageSize(size);
        }}
      />
    </>
  );
}