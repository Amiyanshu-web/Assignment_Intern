import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentList from './DepartmentList';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'body', headerName: 'Body', width:750},
];


const Page2 = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        // console.log(departments);
        setIsLoading(true);
        setError(null);

        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
            setIsLoading(false);
            });
    }, []);

    if (error) {
        return <div>Error fetching posts: {error}</div>;
    }

    return (
        <>
        {isLoading?<h1>Loading...</h1>:(
            <>
            <h1>Posts</h1>
                    <DataGrid<Post> rows={posts} columns={columns} initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 25,
                            },
                        },
                    }} />
            </>
        )
        }
        <DepartmentList />
        </>
    );
};

export default Page2;
