import PrimaryButton from "@/Components/PrimaryButton";
import CardBox from "@/Components/ui/card-box/CardBox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Check } from "lucide-react";
import useRole from "./Composables/useRole";
import RoleForm from "./Components/RoleForm";

export default function Create({ title, routeName, permissions }) {
    const { form, storeForm } = useRole(routeName);

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
                    <div className="flex gap-6 items-center w-full">
                        <Link href={route(`${routeName}index`)}>
                            <PrimaryButton color='white'>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Regresar
                            </PrimaryButton>
                        </Link>
                        <PrimaryButton color='black' onClick={storeForm} disabled={form.processing} >
                            <Check className="w-4 h-4 mr-2" />
                            Guardar
                        </PrimaryButton>
                    </div>
                }
            >
                <RoleForm form={form} permissions={permissions} />
            </CardBox>
        </AuthenticatedLayout>
    );
}