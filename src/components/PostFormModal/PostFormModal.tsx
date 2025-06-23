import { useEffect } from "react";
import { Modal, TextInput, Textarea, Select, Button } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Post } from "../../models/Post";
import { v4 as uuidv4 } from "uuid";

const schema = z.object({
  title: z.string().min(1, "Título requerido"),
  body: z.string().min(1, "Contenido requerido"),
  author: z.string().min(1, "Autor requerido"),
  status: z.enum(["draft", "published"]),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (post: Post) => void;
  initialValues?: Partial<Post>;
};

export default function PostFormModal({ opened, onClose, onSubmit, initialValues }: Props) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title ?? "",
      body: initialValues?.body ?? "",
      author: initialValues?.author ?? "",
      status: (initialValues?.status as "draft" | "published") ?? "draft",
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    const newPost: Post = {
      id: initialValues?.id || uuidv4(),
      ...data,
    };
    onSubmit(newPost);
    onClose();
    reset();
  };

  useEffect(() => {
    if (opened) {
      reset({
        title: initialValues?.title ?? "",
        body: initialValues?.body ?? "",
        author: initialValues?.author ?? "",
        status: (initialValues?.status as "draft" | "published") ?? "draft",
      });
    }
  }, [initialValues, opened, reset]);

  return (
    <Modal opened={opened} onClose={onClose} title={initialValues ? "Actualizar publicación" : "Crear nueva publicación"} centered>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Controller name="title" control={control} render={({ field }) => <TextInput label="Título" {...field} error={errors.title?.message} />} />
        <Controller name="body" control={control} render={({ field }) => <Textarea label="Contenido" {...field} error={errors.body?.message} />} />
        <Controller name="author" control={control} render={({ field }) => <TextInput label="Autor" {...field} error={errors.author?.message} />} />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              label="Estado"
              data={[
                { label: "Borrador", value: "draft" },
                { label: "Publicado", value: "published" },
              ]}
              {...field}
              value={field.value ?? ""}
              onChange={(val) => field.onChange(val as "draft" | "published")}
              error={errors.status?.message}
            />
          )}
        />
        <Button type="submit" fullWidth>
          Guardar
        </Button>
      </form>
    </Modal>
  );
}
