import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CardBox from '@/Components/ui/card-box/CardBox';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Pencil as PencilIcon, TrashIcon } from 'lucide-react';
import UserCard from './Components/UserCard';
import Pagination from '@/Components/Pagination';
import SearchBar from '@/Components/SearchBar';
import useSearch from '@/Hooks/useSearch';
import useUser from './Composables/useUser';

export default function Index({ users, title, filters, routeName }) {
    const { search, setSearch, rows, setRows } = useSearch(routeName, filters);
    const { destroyUser } = useUser(routeName);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {title}
                </h2>
            }
        >
            <Head title={title} />
            <CardBox
                footer={
                    <div className="flex justify-between items-center w-full">
                        <Link href='/dashboard'>
                            <PrimaryButton type="button" color='white'>
                                <PencilIcon className="w-4 h-4 mr-2" />
                                Volver al inicio
                            </PrimaryButton>
                        </Link>
                        <span className="text-sm text-gray-400">Total: {users.total} usuarios</span>
                    </div>
                }
            >
                <SearchBar
                    search={search}
                    onSearchChange={setSearch}
                    rows={rows}
                    onRowsChange={setRows}
                    routeName={routeName}
                />

                {users.data.map((user) => (
                    <UserCard user={user} key={user.id}>
                        <div className='flex gap-2'>
                            <Link href={route(`${routeName}edit`, user.id)}>
                                <PrimaryButton color='black'>
                                    <PencilIcon className="w-4 h-4" />
                                </PrimaryButton>
                            </Link>
                            <PrimaryButton color='red' onClick={() => destroyUser(user.id)}>
                                <TrashIcon className="w-4 h-4" />
                            </PrimaryButton>
                        </div>
                    </UserCard>
                ))}

                <Pagination links={users.links} />
            </CardBox>
        </AuthenticatedLayout>
    );
}