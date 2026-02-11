"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  searchProductSchema,
  type SearchProductValues,
} from "@/lib/validations";
import { useSearchProduct } from "@/hooks/use-search-product";
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

export function SearchProductForm() {
  const form = useForm<SearchProductValues>({
    resolver: zodResolver(searchProductSchema),
    defaultValues: {
      product_id: 0,
    },
  });

  const { mutate, isPending } = useSearchProduct();

  function onSubmit(values: SearchProductValues) {
    mutate(values.product_id);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-3"
      >
        <FormField
          control={form.control}
          name="product_id"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>ID del Producto</FormLabel>
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

        <Button type="submit" disabled={isPending}>
          {isPending ? "Buscando..." : "Buscar"}
        </Button>
      </form>
    </Form>
  );
}
