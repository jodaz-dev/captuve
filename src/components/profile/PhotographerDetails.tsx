import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const photographerDetailsSchema = z.object({
  brandName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
});

type PhotographerDetailsFormData = z.infer<typeof photographerDetailsSchema>;

interface PhotographerDetailsData {
  brandName: string;
  email: string;
  description: string;
  logo?: string;
  watermark?: string;
}

interface PhotographerDetailsProps {
  data: PhotographerDetailsData;
  onUpdate: (data: PhotographerDetailsData) => void;
}

export function PhotographerDetails({ data, onUpdate }: PhotographerDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(data.logo || null);
  const [watermarkPreview, setWatermarkPreview] = useState<string | null>(data.watermark || null);

  const form = useForm<PhotographerDetailsFormData>({
    resolver: zodResolver(photographerDetailsSchema),
    defaultValues: {
      brandName: data.brandName,
      email: data.email,
      description: data.description,
    },
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWatermarkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWatermarkPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (formData: PhotographerDetailsFormData) => {
    const updatedData: PhotographerDetailsData = {
      brandName: formData.brandName,
      email: formData.email,
      description: formData.description,
      logo: logoPreview || undefined,
      watermark: watermarkPreview || undefined,
    };
    onUpdate(updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    form.reset({
      brandName: data.brandName,
      email: data.email,
      description: data.description,
    });
    setLogoPreview(data.logo || null);
    setWatermarkPreview(data.watermark || null);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle>Información del Perfil</CardTitle>
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
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Logo</label>
                {data.logo ? (
                  <img
                    src={data.logo}
                    alt="Logo"
                    className="h-32 w-full object-contain rounded-lg border mt-2"
                  />
                ) : (
                  <div className="h-32 w-full border rounded-lg flex items-center justify-center text-muted-foreground mt-2">
                    Sin logo
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Marca de agua</label>
                {data.watermark ? (
                  <img
                    src={data.watermark}
                    alt="Watermark"
                    className="h-32 w-full object-contain rounded-lg border mt-2"
                  />
                ) : (
                  <div className="h-32 w-full border rounded-lg flex items-center justify-center text-muted-foreground mt-2">
                    Sin marca
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Marca o nombre comercial</label>
              <p className="text-sm text-muted-foreground mt-2">{data.brandName}</p>
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
              <p className="text-sm text-muted-foreground mt-2">{data.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Descripción</label>
              <p className="text-sm text-muted-foreground mt-2">{data.description}</p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-6">
              {/* Logo and Watermark uploads */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormLabel>Logo</FormLabel>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Upload className="h-8 w-8 mb-2" />
                        <span className="text-sm">Subir logo</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  <FormLabel>Marca de agua</FormLabel>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    {watermarkPreview ? (
                      <img
                        src={watermarkPreview}
                        alt="Watermark preview"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Upload className="h-8 w-8 mb-2" />
                        <span className="text-sm">Subir marca</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleWatermarkUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Brand Name */}
              <FormField
                control={form.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca o nombre comercial</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción"
                        className="resize-none"
                        {...field}
                      />
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
