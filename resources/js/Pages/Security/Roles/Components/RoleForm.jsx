import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/ui/input/TextInput";
import { useState, useMemo } from "react";
import { Search, SearchIcon } from "lucide-react";

export default function RoleForm({ form, permissions }) {
    const [search, setSearch] = useState("");

    const filteredPermissions = useMemo(() => {
        return permissions.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [permissions, search]);

    const togglePermission = (permissionId) => {
        const current = form.data.permissions;
        const updated = current.includes(permissionId)
            ? current.filter((id) => id !== permissionId)
            : [...current, permissionId];

        form.setData("permissions", updated);
    };

    const toggleAllPermissions = () => {
        const current = form.data.permissions;
        const allFilteredIds = filteredPermissions.map(p => p.id);

        const allSelected = allFilteredIds.length > 0 && allFilteredIds.every(id => current.includes(id));

        if (allSelected) {
            form.setData("permissions", current.filter(id => !allFilteredIds.includes(id)));
        } else {
            const newPermissions = [...new Set([...current, ...allFilteredIds])];
            form.setData("permissions", newPermissions);
        }
    };

    const allFilteredSelected = filteredPermissions.length > 0 && filteredPermissions.every(p => form.data.permissions.includes(p.id));

    return (
        <div className="space-y-6">
            <div>
                <InputLabel htmlFor="name">Nombre del rol</InputLabel>
                <TextInput
                    id="name"
                    className="mt-1 w-full"
                    value={form.data.name}
                    onChange={(e) => form.setData("name", e.target.value)}
                    required
                    placeholder="Ingresa el nombre del rol"
                />
                <InputError message={form.errors.name} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="permissions">Asigna uno o más permisos</InputLabel>

                <div className="relative mt-2 w-full sm:w-[400px]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <TextInput
                        id="permissions"
                        className="block w-full pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Ingresa un parámetro de búsqueda"
                    />
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden mt-2">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Nombre</th>
                                <th className="text-center px-4 py-2.5 font-medium text-gray-600 w-24">
                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <span className="text-xs">Todos</span>
                                        <input
                                            type="checkbox"
                                            checked={allFilteredSelected}
                                            onChange={toggleAllPermissions}
                                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                        />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPermissions.length > 0 ? (
                                filteredPermissions.map((permission) => (
                                    <tr
                                        key={permission.id}
                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => togglePermission(permission.id)}
                                    >
                                        <td className="px-4 py-2.5 text-gray-700">{permission.name}</td>
                                        <td className="px-4 py-2.5 text-center">
                                            <input
                                                type="checkbox"
                                                checked={form.data.permissions.includes(permission.id)}
                                                onChange={() => togglePermission(permission.id)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="rounded border-gray-300 text-indigo-600 
                                                           focus:ring-indigo-500 cursor-pointer"
                                            />
                                        </td>
                                    </tr>
                                ))) :
                                (
                                    <tr>
                                        <td colSpan="2" className="px-4 py-8 text-center text-gray-500">
                                            No se encontraron permisos.
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}