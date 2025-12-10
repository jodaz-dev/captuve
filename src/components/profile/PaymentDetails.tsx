import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const paymentDetailsSchema = z.object({
  bank: z.string().min(2, "El banco es requerido"),
  documentId: z.string().min(5, "El documento es requerido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  accountHolder: z.string().min(2, "El titular de la cuenta es requerido"),
});

type PaymentDetailsFormData = z.infer<typeof paymentDetailsSchema>;

interface PaymentDetailsData {
  bank: string;
  documentId: string;
  phone: string;
  accountHolder: string;
}

interface PaymentDetailsProps {
  data: PaymentDetailsData;
  onUpdate: (data: PaymentDetailsData) => void;
}

export function PaymentDetails({ data, onUpdate }: PaymentDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<PaymentDetailsFormData>({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues: {
      bank: data.bank,
      documentId: data.documentId,
      phone: data.phone,
      accountHolder: data.accountHolder,
    },
  });

  const onSubmit = (formData: PaymentDetailsFormData) => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    form.reset({
      bank: data.bank,
      documentId: data.documentId,
      phone: data.phone,
      accountHolder: data.accountHolder,
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle>Datos de Pago</CardTitle>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} size="sm">
            Editar
          </Button>
        )}
        {isEditing && (
          <div className="flex gap-2">
            <Button onClick={handleCancel} variant="outline" size="sm">
              Cancelar
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              size="sm"
              disabled={!form.formState.isValid}
            >
              Actualizar
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Banco</label>
              <p className="text-sm text-muted-foreground mt-2">{data.bank}</p>
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Documento de identidad (RIF/CI)</label>
              <p className="text-sm text-muted-foreground mt-2">{data.documentId}</p>
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Teléfono</label>
              <p className="text-sm text-muted-foreground mt-2">{data.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Titular de la cuenta</label>
              <p className="text-sm text-muted-foreground mt-2">{data.accountHolder}</p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-4">
              {/* Bank */}
              <FormField
                control={form.control}
                name="bank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banco</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del banco" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Document ID (RIF) */}
              <FormField
                control={form.control}
                name="documentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documento de identidad (RIF/CI)</FormLabel>
                    <FormControl>
                      <Input placeholder="V-12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="0412-1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Account Holder */}
              <FormField
                control={form.control}
                name="accountHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titular de la cuenta</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del titular" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
