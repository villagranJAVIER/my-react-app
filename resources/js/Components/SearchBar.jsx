import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/ui/input/TextInput';
import SelectInput from '@/Components/ui/input/SelectInput';
import { PlusIcon, Search as SearchIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

const ROW_OPTIONS = [5, 10, 15];

export default function SearchBar({ search, onSearchChange, rows, onRowsChange, routeName, children }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 my-6 px-1">
            <div className='flex gap-4'>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <label htmlFor="rows-per-page">Mostrar</label>
                    <SelectInput
                        id="rows-per-page"
                        value={rows}
                        onChange={(e) => onRowsChange(Number(e.target.value))}
                        className="w-[100px]"
                    >
                        {ROW_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </SelectInput>
                    <span>filas</span>
                </div>
                <div className="relative flex-1 w-full sm:w-[400px]">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <TextInput
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar..."
                        className="pl-9 w-full"
                    />
                </div>
            </div>

            {routeName && (
                <Link href={route(`${routeName}create`)}>
                    <PrimaryButton>
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Agregar
                    </PrimaryButton>
                </Link>
            )}
            {children}
        </div>
    );
}