import { ComponentProps, ReactNode } from "react";

export type SelectProps = Omit<ComponentProps<"select">, "prefix"> & {
    prefix?: ReactNode;
};

export type SelectOptionProps = ComponentProps<"option">;
