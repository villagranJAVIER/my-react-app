import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/ui/input/TextInput";

export default function UserForm({ form, roles }) {

    const toggleRole = (roleId) => {
        const current = form.data.roles;
        const updated = current.includes(roleId)
            ? current.filter((id) => id !== roleId)
            : [...current, roleId];

        form.setData('roles', updated);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        placeholder="Ingresa el nombre completo"
                        value={form.data.name}
                        onChange={(e) => form.setData('name', e.target.value)}
                        className="mt-1 w-full"
                    />
                    <InputError message={form.errors.name} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="Ingresa el correo electrónico"
                        value={form.data.email}
                        onChange={(e) => form.setData('email', e.target.value)}
                        className="mt-1 w-full"
                    />
                    <InputError message={form.errors.email} className="mt-1" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="Ingresa una contraseña segura"
                        value={form.data.password}
                        onChange={(e) => form.setData('password', e.target.value)}
                        className="mt-1 w-full"
                    />
                    <InputError message={form.errors.password} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        placeholder="Ingresa una contraseña segura"
                        value={form.data.password_confirmation}
                        onChange={(e) => form.setData('password_confirmation', e.target.value)}
                        className="mt-1 w-full"
                    />
                    <InputError message={form.errors.password_confirmation} className="mt-1" />
                </div>
            </div>

            <div>
                <InputLabel value="Asigna uno o más roles" className="mb-2" />
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-4 py-2.5 font-medium text-gray-600">Nombre</th>
                                <th className="text-center px-4 py-2.5 font-medium text-gray-600 w-24">Asignar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {roles.map((role) => (
                                <tr
                                    key={role.id}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => toggleRole(role.id)}
                                >
                                    <td className="px-4 py-2.5 text-gray-700">{role.name}</td>
                                    <td className="px-4 py-2.5 text-center">
                                        <input
                                            type="checkbox"
                                            checked={form.data.roles.includes(role.id)}
                                            onChange={() => toggleRole(role.id)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="rounded border-gray-300 text-indigo-600 
                                                       focus:ring-indigo-500 cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <InputError message={form.errors.roles} className="mt-1" />
            </div>
        </div>
    );
}