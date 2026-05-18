import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CardBox from '@/Components/ui/card-box/CardBox';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Pencil as PencilIcon, TrashIcon } from 'lucide-react';
import Pagination from '@/Components/Pagination';
import SearchBar from '@/Components/SearchBar';
import useSearch from '@/Hooks/useSearch';
import useRole from './Composables/useRole';

export default function Index({ roles, title, filters, routeName }) {
    const { search, setSearch, rows, setRows } = useSearch(routeName, filters);
    const { destroyRole } = useRole(routeName);

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
                        <span className="text-sm text-gray-400">Total: {roles.total} roles</span>
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

                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-2.5 font-medium text-gray-600">Nombre</th>
                            <th className="text-center px-4 py-2.5 font-medium text-gray-600 w-24">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {roles.data.map((role) => (
                            <tr
                                key={role.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-4 py-2.5 text-gray-700">{role.name}</td>

                                <td className="px-4 py-2.5 text-center">
                                    <div className='flex gap-2'>
                                        <Link href={route(`${routeName}edit`, role.id)}>
                                            <PrimaryButton color='black'>
                                                <PencilIcon className="w-4 h-4" />
                                            </PrimaryButton>
                                        </Link>
                                        <PrimaryButton color='red' onClick={() => destroyRole(role.id)}>
                                            <TrashIcon className="w-4 h-4" />
                                        </PrimaryButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={roles.links} />
            </CardBox>
        </AuthenticatedLayout>
    );
}