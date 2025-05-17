import { useQuery } from '@tanstack/react-query';
import { getTasks } from './queries/getTasks.jsx';
import { useState } from 'react';
import { Pagination } from './Pagination.jsx';

export function Tasks() {
    const [currentPage, setCurrentPage] = useState(1);

    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['tasks', currentPage],
            queryFn: getTasks,
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
        <ul>
            {tasks.map(task => (
            <li key={task.id}>
                <h2>{task.title}</h2>
                <p>{task.task_status.name}</p>
            </li>
            ))}
        </ul>

        <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChanged={setCurrentPage}
        />
        </>
    );
}