"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updatePriceSchema,
  type UpdatePriceValues,
} from "@/lib/validations";
import { useUpdatePrice } from "@/hooks/use-update-price";
import { useProductContext } from "@/hooks/use-product-context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UpdatePriceForm() {
  const { product } = useProductContext();

  const form = useForm<UpdatePriceValues>({
    resolver: zodResolver(updatePriceSchema),
    defaultValues: {
      new_price: 0,
    },
  });

  const { mutate, isPending } = useUpdatePrice();

  if (!product) return null;

  function onSubmit(values: UpdatePriceValues) {
    if (!product) return;
    mutate({
      id: product.id,
      data: { new_price: values.new_price },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="new_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nuevo Precio</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Actualizando..." : "Actualizar Precio"}
        </Button>
      </form>
    </Form>
  );
}
