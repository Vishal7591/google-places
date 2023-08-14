import React, { forwardRef } from "react";
import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from "./../../utils/polymorphic";
import { InputType } from "../../types/placesTypes";
import style from "./input.module.scss";

type InputProps<T extends React.ElementType> = PolymorphicComponentProps<
  T,
  {
    type?: InputType;
    name?: string;
    value: string;
    options?: any;
    defaultValue?: any;
    placeholder?: string;
    className?: string;
  }
>;

export const Input = forwardRef(
  <T extends React.ElementType = "input">(
    props: InputProps<T>,
    ref: PolymorphicRef<T>
  ) => {
    const { ...rest } = props;
    return <input ref={ref} {...rest} className={style.inputfield} />;
  }
);

Input.displayName = "Input";
