import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/ui/input/TextInput";
import Modal from "@/Components/Modal";
import usePermission from "../Composables/usePermission";
import PrimaryButton from "@/Components/PrimaryButton";
import { Check, X } from "lucide-react";

export default function PermissionModal({ isOpen, close, permission = null, routeName }) {
    const { form, storeForm, updateForm } = usePermission(routeName, permission, close);

    const handleSave = () => {
        if (permission) {
            updateForm();
        } else {
            storeForm();
        }
    };
    return (
        <Modal show={isOpen} onClose={close} maxWidth="lg">
            <div className="p-5 space-y-5">
                <div>
                    <InputLabel htmlFor="name">Nombre del permiso</InputLabel>
                    <TextInput
                        id="name"
                        className="mt-1 w-full"
                        value={form.data.name}
                        onChange={(e) => form.setData("name", e.target.value)}
                        required
                        placeholder="Ingresa el nombre del permiso"
                    />
                    <InputError message={form.errors.name} className="mt-2" />
                </div>

                <div className="flex gap-4 items-center justify-end">
                    <PrimaryButton color='white' onClick={close}>
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                    </PrimaryButton>
                    <PrimaryButton color='black' onClick={handleSave} disabled={form.processing} >
                        <Check className="w-4 h-4 mr-2" />
                        {permission ? "Actualizar" : "Guardar"}
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}