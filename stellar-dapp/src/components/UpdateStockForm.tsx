"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateStockSchema,
  type UpdateStockValues,
} from "@/lib/validations";
import { useUpdateStock } from "@/hooks/use-update-stock";
import { useProductContext } from "@/hooks/use-product-context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UpdateStockForm() {
  const { product } = useProductContext();

  const form = useForm<UpdateStockValues>({
    resolver: zodResolver(updateStockSchema),
    defaultValues: {
      quantity: 1,
      operation: "add",
    },
  });

  const { mutate, isPending } = useUpdateStock();

  if (!product) return null;

  function onSubmit(values: UpdateStockValues) {
    if (!product) return;
    mutate({
      id: product.id,
      data: {
        quantity: values.quantity,
        operation: values.operation,
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="operation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operación</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="add">Agregar</SelectItem>
                    <SelectItem value="sub">Restar</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Actualizando..." : "Actualizar Stock"}
        </Button>
      </form>
    </Form>
  );
}
